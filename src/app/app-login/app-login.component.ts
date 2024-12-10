import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DbAccessServiceService } from '../Infra/db-access-service.service';
import { ShowDialogService } from '../Infra/show-dialog.service';
import { UserOrgMapDTO } from '../models/user-org-map-dto';
import { MatDialogModule } from '@angular/material/dialog';
import { LoginDataDTO } from '../models/login-data-dto';

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
  constructor(private router:Router,private fb:FormBuilder,private srv:DbAccessServiceService,private dlgSrv:ShowDialogService)
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
      this.userOrgMapInfoList=data.Data.UserOrgMapInfos;
      console.log(this.userOrgMapInfoList);
      localStorage.setItem("UserOrgMap",JSON.stringify(this.userOrgMapInfoList));
      localStorage.setItem("AuthToken",data.Data.JwtToken);
      this.router.navigate(['orgSel']);      
    },
    error:(err)=>{
          this.dlgSrv.ShowSnackAutoClose("Error In Authentication",5000);
    }});

}
IsControlNotValid(ctrlName:string):boolean
  {
    
      return !this.fg.controls[ctrlName].valid && this.fg.controls[ctrlName].touched;   
  }

  NavigateToRegister()
  {

  }
}
