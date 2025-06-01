export interface UserInfoDTO{
    UserId?:any;
    OrgId:any;
    UserEmail:string;
    Password:string;
    DisplayName:string;
    IsOrgAdmin:number;
    FeatureRoleList?:any[],
    UserDetailsJson:string,
    
}