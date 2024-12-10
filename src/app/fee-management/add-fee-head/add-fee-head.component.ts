import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DbAccessServiceService } from 'src/app/Infra/db-access-service.service';
import { FeeTypeDef } from 'src/app/Infra/fee-type-def';
import { ShowDialogService } from 'src/app/Infra/show-dialog.service';
import { FeeHeadMasterDTO } from 'src/app/models/fee-head-master-dto';

@Component({
  selector: 'app-add-fee-head',
  templateUrl: './add-fee-head.component.html',
  styleUrls: ['./add-fee-head.component.css']
})
export class AddFeeHeadComponent {
  fg:FormGroup;
  ctrlFeeHeadName:FormControl=new FormControl('',[Validators.required]);
  ctrlFeeType:FormControl=new FormControl('');
  ctrlTerms:FormControl=new FormControl('',[Validators.required]);
  FeeTypeArray:any[]=[];
  
  selFeeType:number=0;
  selNoOfTerms:number=0;

  constructor(private router:Router,private srv:DbAccessServiceService,private dlgSrv:ShowDialogService)
  {
      this.fg=new FormGroup({
        FeeHeadName:this.ctrlFeeHeadName,
        FeeType:this.ctrlFeeType,
        Terms:this.ctrlTerms,        
      });
      this.FeeTypeArray=FeeTypeDef.FeeTypeArray;
  }

  OnChangeFeeType(event:any)
  {
    this.selFeeType=this.fg.controls["FeeType"].value;
    console.log(this.selFeeType);
  }

  AddNewFeeHead()
  {
    const HeadName=this.ctrlFeeHeadName.value;
    const NoOfTerms=this.ctrlTerms.value;
    const FeeTypeValue=this.ctrlFeeType.value;
    var feeHeadMasterDTO:FeeHeadMasterDTO={
      OrgId:localStorage.getItem("SelOrgId"),
      FeeHeadName:HeadName,
      Terms:NoOfTerms,
      FeeType:FeeTypeValue
    }
    this.srv.AddFeeHead(feeHeadMasterDTO).subscribe(
      {
        next: (data)=>{
          this.router.navigate(['home/manageFeeHead']);
        },
        error:(err)=>{
          this.dlgSrv.ShowSnackAutoClose("Error In Adding Fee Head"+err.Message,4000)
        }
      }
    );
  }
}
