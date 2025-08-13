import { Router } from "@angular/router";

import {RoleConsts} from './role-consts';

import { DbAccessServiceService } from "./db-access-service.service";
import { JwtDecoder } from "./jwt-decoder";

export default  function LoadRoute(router:Router)
{
    let accessToken=localStorage.getItem("AccessToken");
   let accessObj= JwtDecoder.DecodeToken(accessToken);
   if(accessObj.IsOrgAdmin==1)
   {
    router.navigate(['home']);
    return;
   }
   if(accessObj.FeatureRoleData!=undefined)
   {
    let fdata=JSON.parse(accessObj.FeatureRoleData)[0];//Take first entry as default
    let FeatureName=fdata.FeatureName;
    let RoleName= fdata.RoleName;
    if(FeatureName==RoleConsts.STUDENT_MANAGEMENT_FEATURE && RoleConsts.ROLE_STUDENT)
    {
        router.navigate(['studenthome']);
        return;
    }
   }

}