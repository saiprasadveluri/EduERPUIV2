import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { DbAccessServiceService } from '../Infra/db-access-service.service';
import { ShowDialogService } from '../Infra/show-dialog.service';
import { ModuleFeatureDTO } from '../models/ModuleFeatureDTO';
import { MatSelectionListChange,MatSelectionList,MatListOption } from '@angular/material/list';
import { OrganizationDTO } from '../models/OrganizationDTO';
@Component({
  selector: 'app-orgnization-feature-subscription',
  templateUrl: './orgnization-feature-subscription.component.html',
  styleUrls: ['./orgnization-feature-subscription.component.css']
})
export class OrgnizationFeatureSubscriptionComponent implements OnInit {
  ModuleFeaturesArray:ModuleFeatureDTO[]=[];
  selectedValues: any[] = [];
  organizationsArray:OrganizationDTO[]=[];
  constructor(private router:Router,private fb:FormBuilder,private srv:DbAccessServiceService,private dlgSrv:ShowDialogService)
  {

  }
  ngOnInit(): void 
  {
       
  }

    ChangeOrgnanization(evt:any)
    {
       console.log(evt)
      let OrgId:any=evt;
      console.log(OrgId)
      this.srv.GetAllFeaturesByModule(OrgId).subscribe(
        {
          next:(data)=>{
            this.ModuleFeaturesArray=data.Data;   
            console.log(this.ModuleFeaturesArray)         
          }
        }
      )   
    }

    onFeaturesSelectionChange(evt:any)
      {
        
        this.selectedValues = evt.source.selectedOptions.selected.map((option:any) => option.value);
      }
  }
