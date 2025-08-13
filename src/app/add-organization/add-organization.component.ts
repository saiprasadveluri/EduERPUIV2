import { Component, OnInit } from '@angular/core';
import { ApplicationModuleDTO } from '../models/application-module-dto';
import { Router } from '@angular/router';
import { DbAccessServiceService } from '../Infra/db-access-service.service';
import { ShowDialogService } from '../Infra/show-dialog.service';
import { NgForm } from '@angular/forms';
import { OrganizationDTO } from '../models/OrganizationDTO';

@Component({
  selector: 'app-add-organization',
  templateUrl: './add-organization.component.html',
  styleUrls: ['./add-organization.component.css']
})
export class AddOrganizationComponent implements OnInit {
  appModules:ApplicationModuleDTO[]=[];
  selAppModule:any;
  orgName:string='';
  orgEmail:string='';
  orgMobile:string='';
  orgAddress:string='';
  constructor(private router:Router,private srv:DbAccessServiceService,private dlgSrv:ShowDialogService)
    {
      
    }
  ngOnInit(): void {
    this.srv.GetAllApplicationModules().subscribe(
      {
        next:(res)=>{
          this.appModules=res.Data;
        }
      }
    )
  }
  
  AddNewOrganization()
  {
    console.log(this.selAppModule)
    console.log(this.orgName)
    let orgNew:OrganizationDTO={      
      OrgModuleType: this.selAppModule, 
      ModuleTypeText:undefined,     
      OrgName: this.orgName,
      OrgAddress: this.orgAddress,
      PrimaryEmail: this.orgEmail,
      MobileNumber: this.orgMobile,
      Status: 1
    };
    this.srv.AddNewOrganization(orgNew).subscribe({
        next: (res)=>{
          this.dlgSrv.ShowSnackAutoClose("Success In Adding new Organization",4000);
        },
        error:(err)=>{
          this.dlgSrv.ShowSnackAutoClose("Error In Adding new Organization",4000)
        }
    });
  }

  

  IsFormValid(frm:NgForm):boolean
  {
    return  frm.controls['orgName'].value?.trim()!='' &&
frm.controls['orgEmail'].value?.trim()!='' &&
frm.controls['orgMobile'].value?.trim()!='' &&
frm.controls['orgAddress'].value?.trim()!='';
  }

}
