import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { DbAccessServiceService } from 'src/app/Infra/db-access-service.service';
import { ShowDialogService } from 'src/app/Infra/show-dialog.service';
import { AcdYearDTO } from 'src/app/models/acd-year-dto';
import { ChalanDTO } from 'src/app/models/chalan-dto';

@Component({
  selector: 'app-chalan-details',
  templateUrl: './chalan-details.component.html',
  styleUrls: ['./chalan-details.component.css']
})
export class ChalanDetailsComponent implements OnInit {
  AcdYearList:AcdYearDTO[]=[];
  chalanDetails:ChalanDTO|any;
   ctrlAcdYear:FormControl=new FormControl('');
   fg:FormGroup;
   selStudentmapId:any;
   selAcdYearId:any;
  constructor(private router:Router,private srv:DbAccessServiceService,private dlgSrv:ShowDialogService)
  {
    this.fg=new FormGroup({
      AcdYear:this.ctrlAcdYear
        });
  }
  ngOnInit(): void {
    this.PopulateAcdYears();
  }
  PopulateAcdYears()
  {
    this.srv.GetAllAcdYears().subscribe({
      next:(data)=>{
        this.AcdYearList=data.Data;
        console.log(this.AcdYearList)
      }
  });
  }

  AcdYearChanged()
  {
    this.selAcdYearId=this.fg.controls['AcdYear'].value;
  }
  GetChalanData()
  {
    this.chalanDetails=[];
    console.log(this.ctrlAcdYear.value)
    this.dlgSrv.ShowSelectStudentsDialog(this.ctrlAcdYear.value,2,
      (res:any)=>{
        this.selStudentmapId=res.selStudent;
        console.log( this.selStudentmapId);
        this.srv.GetStudentChllans(this.selStudentmapId).subscribe({
            next:(data)=>{
              var chlnArr=data.Data;
              console.log(chlnArr)
              if(chlnArr.length>0)
              {
                let chlnId:any=chlnArr[0].ChlnId;
                this.srv.GetChallanDetails(chlnId).subscribe(
                  {
                    next:(data)=>{
                        this.chalanDetails=data.Data;
                        let ChlnId=this.chalanDetails.ChlnId;
                        console.log(this.chalanDetails)
                    }
                  }
                )
              }
            }
        });
      }
    );
  }
}
