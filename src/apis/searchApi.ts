// import axios from "axios";
// import { SPOTIFY_BASE_URL } from "../configs/commonConfig";

// export const searchItemsByKeyword = async(token, params) =>{
//     try{
//         const response = await axios.get(`${SPOTIFY_BASE_URL}/search?${}`,{
//             headers:{
//                 Authorization:`Bearer ${token}`,
//                 'Content-Type' : 'application/json',
//             }
//         })
//         return response.data
//     }catch(error){
//         throw new Error("Failed to search by keyword");
//     }
// }

