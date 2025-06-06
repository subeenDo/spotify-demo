import { CLIENT_ID } from "../configs/authConfig";
import { REDIRECT_URI } from "../configs/commonConfig";
import { AuthUrlparams } from "../models/auth";
import { base64encode, generateRandomString, sha256 } from "./crypto";

export const getSportifyAuthUrl = async () => {
  const codeVerifier = generateRandomString(64);
  const hashed = await sha256(codeVerifier);
  const codeChallenge = base64encode(hashed);

  const clientId = CLIENT_ID;
  const redirectUri = REDIRECT_URI;
  const scope = "user-read-private user-read-email";

  const authUrl = new URL("https://accounts.spotify.com/authorize");

  // Save the verifier for token exchange
  window.localStorage.setItem("code_verifier", codeVerifier);

  if (clientId && redirectUri) {
    const params: AuthUrlparams = {
      response_type: "code",
      client_id: clientId,
      scope,
      code_challenge_method: "S256",
      code_challenge: codeChallenge,
      redirect_uri: redirectUri,
    };

    authUrl.search = new URLSearchParams(Object.entries(params)).toString();
    window.location.href = authUrl.toString(); // Redirect to Spotify login
  }
};
