import {jwtDecode} from 'jwt-decode';
export class JwtDecoder {
    static DecodeToken(token:string|null):any{
        if(token!=null)
        return jwtDecode(token)
    else
        return null;
    }
}
export default JwtDecoder;