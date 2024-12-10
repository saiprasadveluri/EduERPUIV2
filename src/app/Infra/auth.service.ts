import { Injectable } from '@angular/core';
import JwtDecoder from './jwt-decoder';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  IsVerifiedUser():boolean
  {
    if(localStorage.getItem("AuthToken")!=null)
    {
      return true;
    }
    else
    {
      return false;
    }
  }

  IsLoggedInUser():boolean
  {
    if(localStorage.getItem("AccessToken")!=null)
      {
        return true;
      }
      else
      {
        return false;
      }
  }

  GetUserFeatureRoleMaps():any
  {
    if(localStorage.getItem("AccessToken")!=null)
    {
      const token:string|null=localStorage.getItem("AccessToken");
      var ParsedJson=JwtDecoder.DecodeToken(token);
      return ParsedJson;      
    }
    else
    return null;
  }

  VerifyAccess(reqFeatureRoleArr:any[]):boolean
  {
    var accessData=this.GetUserFeatureRoleMaps();
    if(accessData!=null)
    {
      var featureRoleMapArray=JSON.parse(accessData.FeatureRoleData);      
      var resArray=featureRoleMapArray.filter((fr:any)=>{return reqFeatureRoleArr.some((req:any)=>{
           return req.feature==fr.FeatureName && req.role==fr.RoleName})});
      
      if(resArray.length>0)
        return true;
      else
      return false;
    }
    else
    return false;
    
  }
}
