import Keycloak from "keycloak-js";

import { ACCOUNT_KEY } from "./config/constants";
import { AuthProps } from "./types";
import { addSessionStorageEvent } from "./utils/storage";

export class KeycloakAuth {
  private kc: any;
  private baseUrl: string;
  private redirectUri: string;
  private logoutUrl: string;
  username: string;

  constructor(initOpts: AuthProps) {
    const { clientId, url, realm, redirectUri, baseUrl } = initOpts;

    // Add custom event for session storage
    addSessionStorageEvent();

    // See this link for more information on the keycloak object
    // https://www.this.kc.org/docs/latest/securing_apps/#_javascript_adapter
    this.kc = new Keycloak({ url, clientId, realm });
    this.redirectUri = redirectUri ? redirectUri : "";
    this.baseUrl = baseUrl ? baseUrl : "";
    this.logoutUrl = `${url}/realms/${realm}/protocol/openid-connect/logout?redirect_uri=${baseUrl}`;
    this.username = "";

    //keycloak listeners to listen auth events
    this.kc.onAuthSuccess = () => {
      console.log("Authentication successful");
      this.setLocalstorage(true);
    };

    this.kc.onAuthError = (error: any) => {
      console.log("Authentication error", error);
    };

    this.kc.onTokenExpired = () => {
      console.log("Token expired");
      this.refreshData();
    };

    this.kc.onAuthRefreshSuccess = () => {
      console.log("token refreshed");
    };

    this.kc.onAuthLogout = () => {
      console.log("Logged Out");
    };
  }

  // Add account to localstorage
  private setLocalstorage = (save: boolean) => {
    if (save) {
      sessionStorage.setItem(
        ACCOUNT_KEY,
        JSON.stringify({
          token: this.kc.token,
          refreshToken: this.kc.refreshToken,
          email: this.kc.idTokenParsed?.email,
          name: this.kc.idTokenParsed?.name,
          userId: this.kc.idTokenParsed?.sub,
        }),
      );
    } else sessionStorage.removeItem(ACCOUNT_KEY);
  };

  // Updates the users keycloak token
  private refreshData = async () => {
    try {
      await this.kc.updateToken(40);

      // Loads user data from keycloak
      // This is called from keycloak updateToken callback
      if (this.kc.idToken) {
        this.setLocalstorage(true);
        this.username = this.kc.idTokenParsed?.name;
      } else {
        try {
          await this.kc.loadUserProfile();
          this.setLocalstorage(true);
          this.username =
            this.kc.profile?.firstName + " " + this.kc.profile?.lastName;
        } catch (error) {
          console.error(error);
        }
      }
    } catch (error) {
      console.error(error);
      this.kc.clearToken();
      this.kc.logout();
    }
  };

  // Login user and create a session
  initSession = async (loadType = "login-required") => {
    try {
      let res;
      if (loadType === "login-required") {
        this.kc.init({
          onLoad: loadType,
          redirectUri: this.redirectUri,
          checkLoginIframe: false,
        });
      } else {
        res = await this.kc.init({
          onLoad: "check-sso",
          promiseType: "native",
          checkLoginFrame: false,
        });
      }
      return res;
    } catch (error) {
      console.log("Initialize error", error);
      console.error(error);
    }
  };

  // Logout a user and remove session
  logoutSession = async () => {
    try {
      sessionStorage.removeItem(ACCOUNT_KEY);
      this.kc.logout({ redirectUri: this.baseUrl });
    } catch (error) {
      console.error("Logout error", error);
    }
  };

  // Refresh the token and update session storage.
  // Returns the new JWT string on success, or null on failure.
  refreshSession = async (): Promise<string | null> => {
    try {
      const refreshed = await this.kc.updateToken(-1); // force refresh
      if (refreshed) {
        this.setLocalstorage(true);
      }
      return this.kc.token ?? null;
    } catch (error) {
      console.error("Token refresh error", error);
      return null;
    }
  };

  // Returns the token expiry timestamp in milliseconds (or null if unavailable)
  getTokenExpiry = (): number | null => {
    const exp = this.kc.tokenParsed?.exp;
    return typeof exp === "number" ? exp * 1000 : null;
  };

  // Login with idp hints
  loginUsingIdp = (idp: string, redirect_uri: string = this.redirectUri) => {
    this.kc.login({ idpHint: idp, redirectUri: redirect_uri });
  };

  // Login with user credentials
  login = (username: string, password: string) => {
    this.kc.login({
      username: username,
      password: password,
      grantType: "password",
    });
  };
}
