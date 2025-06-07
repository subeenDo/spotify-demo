import { ExternalUrls,Image, Followers , ExplicitContent} from "./commonType";

export interface User {
    country?: string;
    display_name?: string;
    email?: string;
    explicit_content?: ExplicitContent
    external_urls ?: ExternalUrls
    followers?: Followers
    href?: string;
    id?: string;
    images?: Image[];
    product?: string;
    type?: string;
    uri?: string;
}
