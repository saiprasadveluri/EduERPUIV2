import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { DbAccessServiceService } from '../Infra/db-access-service.service';
import { ShowDialogService } from '../Infra/show-dialog.service';
import { ModuleFeatureDTO } from '../models/ModuleFeatureDTO';
import { MatSelectionListChange,MatSelectionList,MatListOption } from '@angular/material/list';
import { OrganizationDTO } from '../models/OrganizationDTO';
import { OrgnizationFeatureSubscriptionDTO } from '../models/OrgnizationFeatureSubscriptionDTO';
@Component({
  selector: 'app-orgnization-feature-subscription',
  templateUrl: './orgnization-feature-subscription.component.html',
  styleUrls: ['./orgnization-feature-subscription.component.css']
})
export class OrgnizationFeatureSubscriptionComponent implements OnInit {
  ModuleFeaturesArray:ModuleFeatureDTO[]=[];
  selectedValues: any[] = [];
  UnselectedValues:any[]=[];
  FeatureInfoArray:any[]=[];
  SubscribedFeatures:any[]=[];
  NonSubscribedFeatures:any[]=[];
  OrgId:any;
  constructor(private router:Router,private fb:FormBuilder,private srv:DbAccessServiceService,private dlgSrv:ShowDialogService)
  {

  }
  ngOnInit(): void 
  {
       
  }

    ChangeOrgnanization(evt:any)
    {
      this.OrgId=evt;
      this.RefreshView();
    }
    RefreshView()
    {       
      let AvailableFeatureIDArray:any[]=[];
      this.NonSubscribedFeatures=[];
      this.SubscribedFeatures=[];
      this.NonSubscribedFeatures=[];
      console.log(this.OrgId)
      this.srv.GetOrganizationById(this.OrgId).subscribe({
        next:(data)=>{
            let OrgnanizationData:OrganizationDTO=data.Data;
            this.srv.GetAllFeaturesByModule(OrgnanizationData.OrgModuleType).subscribe(
            {
              next:(data)=>{
                this.ModuleFeaturesArray=data.Data;   
                console.log(this.ModuleFeaturesArray)
                this.srv.GetAllFeaturesByOrganization(this.OrgId).subscribe({
                  next: data=>{
                    var OrgSubscriptions:OrgnizationFeatureSubscriptionDTO[]=[];
                    OrgSubscriptions=data.Data;
                    console.log(OrgSubscriptions)
                    if(OrgSubscriptions.length==0)
                    {
                    this.NonSubscribedFeatures= this.ModuleFeaturesArray.map(mf=>{
                        return {featureId:mf.FeatureId,featureName:mf.FeatureName,Status:0};
                      })
                    }
                    else
                    {
                      AvailableFeatureIDArray=OrgSubscriptions.map(os=>{
                      return os.FeatureId;
                    });
                    console.log(AvailableFeatureIDArray)
                    console.log(this.ModuleFeaturesArray)
                    this.ModuleFeaturesArray.map(f=>{                        
                      if(AvailableFeatureIDArray.findIndex(afid=>{
                          return afid  == f.FeatureId                         
                      })>=0)
                      {
                        this.SubscribedFeatures.push({featureId:f.FeatureId,featureName:f.FeatureName,Status:1});
                        console.log('Subscribed')
                        console.log(this.SubscribedFeatures)
                      }
                      else{
                        this.NonSubscribedFeatures.push({featureId:f.FeatureId,featureName:f.FeatureName,Status:0});
                          console.log('UNSubscribed')
                        console.log(this.NonSubscribedFeatures)
                      }                  
                    })                    
                    }
                  }
                })
              }
            }
      )  
        }
        }
      )
       
    }

    onFeaturesSelectionChange(evt:any)
      {
        
        this.selectedValues = evt.source.selectedOptions.selected.map((option:any) => option.value);
        console.log(this.selectedValues)
      }
      
      onFeaturesUnSelectionChange(evt:any)
      {
        this.UnselectedValues = evt.source.selectedOptions.selected.map((option:any) => option.value);
        console.log(this.selectedValues)
      }
      OnSubscribeFeatures()
      {
       let inpArray:OrgnizationFeatureSubscriptionDTO[];
        if(this.selectedValues.length>0)
        {
          inpArray=this.selectedValues.map(f=>{
            return {OrgId:this.OrgId,FeatureId:f,Status:1};
            }
          );
          this.selectedValues=[];
          this.srv.AddFeaturesToOrganization(inpArray).subscribe({
            next:res=>{
                  this.RefreshView();
            }
          })
        }
        
      }

      OnUnsubscribeFeatures()
      {
         // this.UnselectedValues
         let UnselectedObjArray:any[];
         UnselectedObjArray=this.UnselectedValues.map(fid=>{
            return {OrgId:this.OrgId,FeatureId:fid}
         });
         let UnsubscribeData=JSON.stringify(UnselectedObjArray);
         this.srv.RemoveFeatureFromOrganization(UnsubscribeData).subscribe({
            next:(data)=>{
              this.RefreshView();
            }
         });
      }
  }
