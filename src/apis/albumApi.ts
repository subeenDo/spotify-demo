import axios from 'axios';
import { SPOTIFY_BASE_URL } from '../configs/commonConfig';
import { getNewReleaseResponse } from '../models/album';

export const getNewRelease = async (clientCredentialToken:string):Promise<getNewReleaseResponse> => {
    try {
        const response = await axios.get(`${SPOTIFY_BASE_URL}/browse/new-releases`,{
            headers:{
                Authorization : `Bearer ${clientCredentialToken}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching new releases:", error);
        throw error; 
    }
};
