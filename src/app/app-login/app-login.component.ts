import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DbAccessServiceService } from '../Infra/db-access-service.service';
import { ShowDialogService } from '../Infra/show-dialog.service';
import { UserOrgMapDTO } from '../models/user-org-map-dto';
import { MatDialogModule } from '@angular/material/dialog';
import { LoginDataDTO } from '../models/login-data-dto';
import { TokenRequestDTO } from '../models/token-request-dto';
import { AuthService } from '../Infra/auth.service';
import { FeatureRoleDTO } from '../models/featureRoleDTO';

@Component({
  selector: 'app-app-login',
  templateUrl: './app-login.component.html',
  styleUrls: ['./app-login.component.css']
})
export class AppLoginComponent implements OnInit {
  fg:FormGroup;
  ctrlUserName:FormControl= new FormControl('',[Validators.required,Validators.email])
  ctrlUserPwd:FormControl=new FormControl('',Validators.required);
  
  userOrgMapInfoList:UserOrgMapDTO[]=[];
  constructor(private router:Router,private fb:FormBuilder,private srv:DbAccessServiceService,private dlgSrv:ShowDialogService,private authSrv:AuthService)
  {
      this.fg=fb.group(
        {
          ctrlEmail:this.ctrlUserName,
          ctrlPassword:this.ctrlUserPwd,          
        }
      );
  }

  ngOnInit(): void {
  }
  LoginUser(){
    const loginData:LoginDataDTO={"Email":this.ctrlUserName.value,'Password':this.ctrlUserPwd.value};
   localStorage.clear();
    this.srv.VerifyLogin(loginData)
    .subscribe({next:(data)=>{
      console.log(data);
      if(data.Data.IsSysAdmin==1)
      {
        localStorage.setItem("AccessToken",data.Data.JwtToken);
        this.router.navigate(['sysadminhome']);
        return;
      }
      this.userOrgMapInfoList=data.Data.UserOrgMapInfos;
      console.log(this.userOrgMapInfoList);
      
      localStorage.setItem("UserOrgMap",JSON.stringify(this.userOrgMapInfoList));      
      localStorage.setItem("AuthToken",data.Data.JwtToken);
      /*if(this.userOrgMapInfoList.length==1)
      {
        localStorage.setItem("SelOrgId",this.userOrgMapInfoList[0].OrgId);
        this.GetAccessToken(this.userOrgMapInfoList[0].OrgId);        
        
      }
      else
      {
      this.router.navigate(['orgSel']);  
      }  */
       //localStorage.setItem("SelOrgId",this.userOrgMapInfoList[0].OrgId);
       this.router.navigate(['orgSel']); 
    },
    error:(err)=>{
          this.dlgSrv.ShowSnackAutoClose("Error In Authentication",5000);
    }});

}

GetAccessToken(OrgId:any)
  {
    const tokenRequestDTO:TokenRequestDTO={
      "SelOrgId":OrgId
    }
    
    //console.log(localStorage.getItem('AccessToken'))
    this.srv.GetAccessToken(tokenRequestDTO).subscribe(
      {
        next:(data)=>{
          if(data.Status==1)
          {
            const accessToken=data.Data;
            console.log(accessToken);
            localStorage.setItem("AccessToken",accessToken);
            localStorage.setItem("SelOrgId",tokenRequestDTO.SelOrgId);
            //let featureRoleMapString=this.authSrv.GetUserFeatureRoleMaps();
            //console.log(featureRoleMapString);
            let userRolempas=this.authSrv.GetUserFeatureRoleMaps();             
             let FeatureRoleMapdata=userRolempas.FeatureRoleData;
            let FeatureRoleMapdatArray=JSON.parse(FeatureRoleMapdata);
            console.log(FeatureRoleMapdatArray[0])
            if(FeatureRoleMapdatArray.length>0)
            {
              let FeatureRoleMapObj=FeatureRoleMapdatArray[0];
              
              let RoleName=FeatureRoleMapObj.RoleName;
              let Status=FeatureRoleMapObj.Status;
              console.log(RoleName)
              if(Status==1)
              {
                if(RoleName=="Student")
                {
                  this.router.navigate(['studentHome']);  
                }
                else{
                  this.router.navigate(['home']);  
                }
              }
            }            
          }
          else
          {
            this.dlgSrv.ShowSnackAutoClose("Error In Getting Access Token: "+data.Message,4000)
          }
        },
        error:(_)=>{
          this.dlgSrv.ShowSnackAutoClose("Error In Getting Access Token",4000)
        }
      }
    )
  }

IsControlNotValid(ctrlName:string):boolean
  {
    
      return !this.fg.controls[ctrlName].valid && this.fg.controls[ctrlName].touched;   
  }

  NavigateToRegister()
  {

  }
}
