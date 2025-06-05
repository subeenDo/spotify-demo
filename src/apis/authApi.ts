import axios from "axios"
import { clientId, clientSecret } from "../configs/authConfig"
import { ClientCredentialtokenResponse } from "../models/auth"

const encodedBase64 = (data: string): string => {
    if (typeof window !== "undefined") {
      // 브라우저 환경
      return btoa(data);
    } else {
      // Node.js 환경
      return Buffer.from(data).toString("base64");
    }
  };

export const getClientCredentialToken = async():Promise<ClientCredentialtokenResponse> =>{
    try{
        const body = new URLSearchParams({
            grant_type : "client_credentials"
        })
        const response = await axios.post("https://accounts.spotify.com/api/token", body, {
            headers: {
                Authorization: `Basic ${encodedBase64(
                    clientId+":"+clientSecret
                )} `,
                'Content-Type' : 'application/x-www-form-urlencoded'
            },
        });
        return response.data;
    }catch(error){
        throw new Error("Fail to fetch token") ;
    }
}