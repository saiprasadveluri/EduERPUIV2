import { UserOrgMapDTO } from "./user-org-map-dto";

export interface LoginResultDTO {
    UserId:any;
    UserEmail:string;
    UserOrgMapInfos:UserOrgMapDTO[]
    JwtToken:string; 
    IsSysAdmin:boolean;
}
