import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { DbAccessServiceService } from '../Infra/db-access-service.service';
import { ShowDialogService } from '../Infra/show-dialog.service';
import { UserOrgMapDTO } from '../models/user-org-map-dto';
import { TokenRequestDTO } from '../models/token-request-dto';
import LoadRoute from '../Infra/ViewLoader';

@Component({
  selector: 'app-org-selection',
  templateUrl: './org-selection.component.html',
  styleUrls: ['./org-selection.component.css']
})
export class OrgSelectionComponent {
  fg:FormGroup;
  selOrgId:any='';
  ctrlOrgSel:FormControl=new FormControl('');
  usrOrgMapList:UserOrgMapDTO[]=[];
  constructor(private router:Router,private fb:FormBuilder,private srv:DbAccessServiceService,private dlgSrv:ShowDialogService)
  {    
    if(localStorage.getItem("UserOrgMap")!=null)  
      this.usrOrgMapList=JSON.parse(localStorage.getItem("UserOrgMap")??'');
      this.fg=fb.group(
        {
          ctrlOrgSel:this.ctrlOrgSel               
        }
      );
  }
  GetAccessToken()
  {
    const tokenRequestDTO:TokenRequestDTO={
      "SelOrgId":this.ctrlOrgSel.value
    }
    console.log(this.ctrlOrgSel.value);
    
    this.srv.GetAccessToken(tokenRequestDTO).subscribe(
      {
        next:(data)=>{
          if(data.Status==1)
          {
            const accessToken=data.Data;
            console.log(accessToken);
            localStorage.setItem("AccessToken",accessToken);
            localStorage.setItem("SelOrgId",tokenRequestDTO.SelOrgId);
              LoadRoute(this.router);
            //this.router.navigate(['home']);
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
  changeOrg(evt:any)
  {
    this.selOrgId=evt.target.value;
    this.ctrlOrgSel.setValue(this.selOrgId, {
      //onlySelf: true
    });
    console.log(this.selOrgId);
   }

  
}
