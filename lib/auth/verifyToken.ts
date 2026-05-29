import url from "url";
import axios from "axios";
import jwt from "jsonwebtoken";

// import jwkToPem from "jwk-to-pem";

enum issuerType {
  noIssuer = "",
  piLabs = "pi-labs",
  local = "local"
}

enum userType {
  piLabsUser = "pi-labs",
  serviceAccount = "serviceAccount",
  local = "local"
}

interface AuthenticateResponse {
  isAuthenticated: boolean;
  issuer: issuerType;
}

interface AuthenticatedUser {
  id: string;
  userName: string;
  emailVerified: boolean;
  email: string;
  name: string;
  enterpriseId: string;
  designation: string | null;
  given_name: string | null;
  roles: any; // Adjust the type according to the actual type of roles
  clientID?: string;
  type?: userType;
  orgs_grps?: any;
}

// Authenticates the url if pi-labs.io is token provider
const authenticateUrl = (issuerUrl: string): AuthenticateResponse => {
  const parsedUrl = url.parse(issuerUrl);
  const hostName = parsedUrl.hostname;
  const domain = hostName?.split(".").splice(-2).join(".");
  if (domain?.includes(".local")) {
    return {
      isAuthenticated: true,
      issuer: issuerType.local
    };
  }
  switch (domain) {
    case "pi-labs.ai":
      return { isAuthenticated: true, issuer: issuerType.piLabs };
    default:
      return { isAuthenticated: false, issuer: issuerType.noIssuer };
  }
};

// Maps fields to camel case
const makeUser = ({
  sub,
  preferred_username,
  email_verified,
  resource_access,
  email,
  name,
  enterprise_id,
  ...others
}: any) => ({
  id: sub,
  userName: preferred_username,
  emailVerified: email_verified,
  resourceAccess: resource_access,
  email,
  name,
  guid: enterprise_id,
  ...others
});

// Add key:value here to expose more data to response
const filterUserResponse = (user: any, issuer: string): AuthenticatedUser => {
  // Parse designation if it's a JSON string
  let designation = user.designation || null;
  if (designation && typeof designation === 'string') {
    try {
      const parsed = JSON.parse(designation);
      // If it's an object, extract the name or other relevant property
      designation = typeof parsed === 'object' ? (parsed.name || parsed.value || parsed) : parsed;
    } catch {
      // If parsing fails, keep the original string
    }
  }

  const authenticatedUser: AuthenticatedUser = {
    id: user.id,
    userName: user.userName,
    emailVerified: user.emailVerified,
    email: user.email,
    name: user.name,
    enterpriseId: user.guid || null,
    roles: user.roles,
    designation,
    given_name: user.given_name || null,
    orgs_grps: JSON.parse(user.orgs_grps || "null") || null
  };

  switch (issuer) {
    case issuerType.piLabs:
      authenticatedUser.type = userType.piLabsUser;
      break;
    case issuerType.local:
      authenticatedUser.type = userType.local;
      break;
  }
  return authenticatedUser;
};

// Verify online function to authenticate user from userinfo endpoint
export const verifyOnline = async (accessToken: string) => {
  const data: any = jwt.decode(accessToken);

  if (data?.iss) {
    let user: AuthenticatedUser;
    const authenticate: AuthenticateResponse = authenticateUrl(data.iss);
    if (authenticate.isAuthenticated) {
      try {
        const config = { headers: { Authorization: `Bearer ${accessToken}` } };
        const response = await axios.get(`${data.iss}/protocol/openid-connect/userinfo`, config);
        let userData = response.data;

        userData = Object.assign({}, userData, { roles: data.realm_access.roles });
        user = filterUserResponse(makeUser(userData), authenticate.issuer);
        // Check if token represents a service account user (client credential flow)
        return user;
      } catch (err) {
        throw err;
      }
    } else {
      throw new Error("Invalid domain for the access token.");
    }
  } else {
    throw new Error("No endpoint found OR Unable to decode JWT.");
  }
};

// Verify offline function to authenticate
// and fetch user from the JWT token & public key
export const verifyOffline = async (accessToken: string) => {
  const token = jwt.decode(accessToken, { complete: true });
  const data: any = token?.payload;
  const kid = token?.header?.kid;

  if (data?.iss) {
    const authenticate: AuthenticateResponse = authenticateUrl(data.iss);
    if (authenticate.isAuthenticated) {
      try {
        const config = { headers: { Authorization: `Bearer ${accessToken}` } };
        const response = await axios.get(`${data.iss}/protocol/openid-connect/certs`, config);
        const keys = response?.data?.keys;
        const matchingKey = keys.filter((key: any) => key.kid === kid);

        if (matchingKey.length > 0) {
          // const pem = jwkToPem(matchingKey[0]);
          // try {
          //   let userInfo = await jwt.verify(accessToken, pem);
          //   userInfo = Object.assign({}, userInfo, { roles: data.realm_access.roles });
          //   user = filterUserResponse(makeUser(userInfo), authenticate.issuer);
          //   return user;
          // } catch (err) {
          //   throw err;
          // }
        }
      } catch (err) {
        throw err;
      }
    } else {
      throw new Error("Invalid domain for the access token.");
    }
  } else {
    throw new Error("No endpoint found OR Unable to decode JWT.");
  }
};

export const isServiceAccountUser = (user: AuthenticatedUser): boolean => {
  return user.type === userType.serviceAccount;
};

export const isPiLabsUser = (user: AuthenticatedUser): boolean => {
  return user.type === userType.piLabsUser;
};
