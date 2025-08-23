export interface AppUserFeatureRoleMapDTO {
    AppUserRoleMapId:any,
    OrgUserMapId:any,
    FeatureRoleId:any,
    FeatureId:any,
    FeatureName:string,
    RoleName:string
}
export interface AppUserFeatureRoleMapGroupDTO
{
    FeatureName:string,
    GroupItems:AppUserFeatureRoleMapDTO[]=[]
}
