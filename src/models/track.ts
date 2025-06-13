import { SimplifiedAlbumObject } from "./album";
import { Artist } from "./artist";
import { ExternalIds, ExternalUrls, Image } from "./commonType";
import { CopyrightObject } from "./playlist";

export interface Track {
    album?:SimplifiedAlbumObject;
    artists?:Artist[];
    available_markets?:string[];
    disc_number?:number;
    duration_ms?:number;
    explicit?:boolean;
    external_ids?:ExternalIds;
    external_urls?:ExternalUrls;
    href?:string;
    id?:string;
    is_playable?:boolean;
    linked_from?:{};
    restrictions?:{
        reason?:string;
    };
    name?:string;
    popularity?:number;

    preview_url?:string|null;
    track_number?:number;
    type?:string;
    uri?:string;
    is_local?:boolean;
}

export interface SimplifiedAudioBook {
    authors:{
        name?:string
    }[];
    available_markets:string[];
    copyrights:CopyrightObject[];
    description:string;
    html_description:string;
    edition?:string;
    explicit:boolean;
    external_urls:ExternalUrls;
    href:string;
    id:string;
    images:Image[];
    languages:string[];
    media_type:string;
    name:string;
    narrators:{
        name?:string;
    }[];
    publisher:string;
    type:"audiobook";
    uri:string;
    total_chapters:number;
}
