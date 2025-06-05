import { Artist } from "./artist";
import { ExternalUrls, Image, Restriction } from "./commonType";

export interface getNewReleaseResponse {
    albums : {
        href : string;
        limit : number;
        next: string;
        offset : number;
        previous : string | null ;
        total : number ;
        items : SimplifiedAlbumObject[];
    }
}

export interface SimplifiedAlbumObject {
    album_type : string ;
    total_tracks: number;
    available_markets: string[];
    external_urls : ExternalUrls
    href : string;
    id : string;
    images : Image[];
    name : string ;
    release_date : string;
    release_date_precision : string;
    restrictions?: Restriction;
    type : string;
    uri : string;
    artists : Artist[]; 
}