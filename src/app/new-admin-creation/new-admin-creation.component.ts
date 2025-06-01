import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DbAccessServiceService } from '../Infra/db-access-service.service';
import { ShowDialogService } from '../Infra/show-dialog.service';
import { UserInfoDTO } from '../models/user-Info-dto';

@Component({
  selector: 'app-new-admin-creation',
  templateUrl: './new-admin-creation.component.html',
  styleUrls: ['./new-admin-creation.component.css']
})
export class NewAdminCreationComponent {
frm:FormGroup;
OrganizationId:any;
 constructor(private frmBuilder:FormBuilder, private router:Router,private srv:DbAccessServiceService,private dlgSrv:ShowDialogService)
  {
   this.frm= this.frmBuilder.group(
      {
        Email:new FormControl('',[Validators.required]),
        DisplayName:new FormControl('',[Validators.required]),        
      }
    )
  }
  ngOnInit(): void {
    
  }

  ChangeOrganization(evt:any)
  {
    this.OrganizationId=evt;
  }
  AddNewAdmin()
  {
    let email=this.frm.get('Email')?.value;
    let displayName=this.frm.get('DisplayName')?.value;
    let userInfo:UserInfoDTO={
      OrgId:this.OrganizationId,
      UserEmail:email,
      Password:'MyPassword',
      IsOrgAdmin:1,
      DisplayName:displayName,
      FeatureRoleList:[],
      UserDetailsJson:''
    }
    console.log(userInfo)
    this.srv.AddOrganizationAdmin(userInfo).subscribe({
      next: (data)=>{
        this.dlgSrv.ShowSnackWithDismissal("Admin Created Successfully...");
        this.frm.reset();
      }
    })
  }
  
}
