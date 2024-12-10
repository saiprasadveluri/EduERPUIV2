import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DbAccessServiceService } from 'src/app/Infra/db-access-service.service';
import { FeeTypeDef } from 'src/app/Infra/fee-type-def';
import { ShowDialogService } from 'src/app/Infra/show-dialog.service';
import { FeeHeadMasterDTO } from 'src/app/models/fee-head-master-dto';

@Component({
  selector: 'app-manage-fee-head',
  templateUrl: './manage-fee-head.component.html',
  styleUrls: ['./manage-fee-head.component.css']
})
export class ManageFeeHeadComponent implements OnInit {
  FeeHeadDTOList:FeeHeadMasterDTO[]=[];
  GetFeeTypeText:any=FeeTypeDef.GetFeeTypeText;
ngOnInit(): void {
  this.PopulateGrid();
}
constructor(private router:Router,private srv:DbAccessServiceService,private dlgSrv:ShowDialogService)
{
  
}
PopulateGrid()
{
  var OrgId=localStorage.getItem("SelOrgId");
  this.srv.GetAllFeeHeads(OrgId).subscribe(
    {
      next: (data)=>{
        this.FeeHeadDTOList=data.Data;
      },
      error:(err)=>{
        this.dlgSrv.ShowSnackAutoClose("Error In Fetching Fee Heads"+err.Message,4000)

      }
    }
  )
}
}
