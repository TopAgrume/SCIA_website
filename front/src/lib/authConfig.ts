import { PublicClientApplication } from "@azure/msal-browser";

export const msalConfig = {
    auth: {
        clientId: "a600fb91-362d-4bd7-a99b-fb7ef38a4814",
        authority: "https://login.microsoftonline.com/3534b3d7-316c-4bc9-9ede-605c860f49d2",
        redirectUri: "http://localhost:3000/home", // Update this for production
        postLogoutRedirectUri: "http://localhost:3000/home", // Update this for production
    },
    cache: {
        cacheLocation: "sessionStorage",
        storeAuthStateInCookie: false,
    },
};

export const msalInstance = new PublicClientApplication(msalConfig);