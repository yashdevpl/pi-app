"use client";

import { usePathname, useRouter } from "next/navigation";
import { createContext, ReactNode, useContext, useEffect, useMemo, useRef, useState } from "react";


import { KeycloakAuth } from "../auth";
import { ACCOUNT_KEY } from "../auth/config/constants";
import { verifyOnline } from "../auth/verifyToken";

export interface UserType {
  id: string;
  userName: string;
  emailVerified: boolean;
  email: string;
  name: string;
  avatar?: string;
  enterpriseId: string | null;
  roles: string[];
  type: string;
  designation: string | null;
  given_name: string | null;
}

export interface PreferencesType {
  userId: string;
  data: string;
  createdAt: string;
  updatedAt: string;
}

type SessionType = {
  isInitialized: boolean;
  tokens: { [key: string]: string };
  user: UserType | null;
};

type AuthContextType = {
  auth?: KeycloakAuth;
  session?: SessionType;

};

const authContextDefaultValues: AuthContextType = {
  auth: undefined,
  session: { isInitialized: false, tokens: {}, user: null },
};

type Permission = string;

const VALID_PATH_PREFIXES = ["/", "/create", "/record", "/history"];

function isValidAppPath(path: string): boolean {
  return VALID_PATH_PREFIXES.some((p) => path === p || path.startsWith(p + "/")) ||
    // match /<caseid>/document or /<caseid>/insights
    /^\/[^/]+\/(document|insights)/.test(path);
}

export const AuthContext = createContext<AuthContextType>(authContextDefaultValues);

export function AuthProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathName = usePathname();
  const avoidRef = useRef<boolean>(false);

  const [auth, setAuth] = useState<KeycloakAuth>();
  const [authState, setAuthState] = useState<any>({ isInitialized: false, isRead: false });
  const [session, setSession] = useState<SessionType>(authContextDefaultValues.session!);




  useEffect(() => {
    // Initialize a new session for user
    if (document && !avoidRef.current) {
      avoidRef.current = true;

      // Check if user wants to go to a specific page (only save known valid paths)
      if (!sessionStorage.getItem("return-url") && pathName !== "/" && isValidAppPath(pathName))
        sessionStorage.setItem("return-url", pathName);

      const authClient = new KeycloakAuth({
        url: `${process.env.NEXT_PUBLIC_AUTH_URL}/auth`,
        realm: process.env.NEXT_PUBLIC_KC_REALM || "",
        clientId: process.env.NEXT_PUBLIC_KC_CLIENT_ID || "",
        redirectUri: (process.env.NEXT_PUBLIC_KC_REDIRECT_URL || ""),
        baseUrl: process.env.NEXT_PUBLIC_BASE_URL || ""
      });
      authClient.initSession().then(() => {
        setAuth(authClient);
        setAuthState({ ...authState, isInitialized: true });
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!authState.isInitialized) return;

    const parseSession = (account: string) => {
      if (account) {
        const parsed = JSON.parse(account);
        if (parsed.token) {
          setSession((prev) => ({ ...prev, tokens: parsed }));

          // Check if return-url exists in sessionStorage
          const shouldRedirect = sessionStorage.getItem("return-url");
          sessionStorage.removeItem("return-url");
          if (shouldRedirect && isValidAppPath(shouldRedirect)) {
            router.push(shouldRedirect);
          }
        }
      }
    };

    const readSession = setTimeout(() => {
      const account = sessionStorage.getItem("account");
      if (account) {
        parseSession(account);
        setAuthState((prev: any) => ({ ...prev, isRead: true }));
      }
    }, 3000);

    const handleStorageChange = (event: any) => {
      if (event.detail.key === ACCOUNT_KEY && event.detail.newValue)
        parseSession(event.detail.newValue);
    };

    window.addEventListener("session-storage", handleStorageChange);
    return () => {
      window.removeEventListener("session-storage", handleStorageChange);
      clearTimeout(readSession);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authState.isInitialized]);

  useEffect(() => {
    if (authState.isRead && session.tokens && session.tokens.token) {
      verifyOnline(session.tokens.token).then(() => {
        setSession((prev) => ({ ...prev, isInitialized: true }));
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authState.isRead, session.tokens]);

  return <AuthContext.Provider value={{
    auth,
    session,
  }}>{children}</AuthContext.Provider>;
}

export function useAuthContext() {
  return useContext(AuthContext);
}
