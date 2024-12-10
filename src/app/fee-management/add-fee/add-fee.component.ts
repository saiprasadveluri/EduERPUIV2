import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DbAccessServiceService } from 'src/app/Infra/db-access-service.service';
import { FeeTypeDef } from 'src/app/Infra/fee-type-def';
import { ShowDialogService } from 'src/app/Infra/show-dialog.service';
import { AcdYearDTO } from 'src/app/models/acd-year-dto';
import { CourseDetailDTO } from 'src/app/models/course-detail-dto';
import { FeeHeadMasterDTO } from 'src/app/models/fee-head-master-dto';
import { FeeMasterDTO } from 'src/app/models/fee-master-dto';

@Component({
  selector: 'app-add-fee',
  templateUrl: './add-fee.component.html',
  styleUrls: ['./add-fee.component.css']
})
export class AddFeeComponent implements OnInit{
  fg:FormGroup;
  AcdYearList:AcdYearDTO[]=[];
  FeeHeadMasterDTOList:FeeHeadMasterDTO[]=[];
  selectedCourseDetails:string='';
  selFeeHeadId:any;
  selAcdYearId:any;
  selCourseDetailsId:any;
  selStudentsArray:any;
  FeeHeadObj:FeeHeadMasterDTO|undefined;
  NumberOfTermsArr:number[]=[];
  ctrlAcdYear:FormControl=new FormControl('',[Validators.required]);
  ctrlFeeHead:FormControl=new FormControl('',[Validators.required]);
  ctrlAmount:FormControl=new FormControl('',[Validators.required]);
  ctrlTerm:FormControl=new FormControl('',[Validators.required]);
  ctrlCourse:FormControl=new FormControl('');
  ctrlStudentMap:FormControl=new FormControl('');

  constructor(private router:Router,private srv:DbAccessServiceService,private dlgSrv:ShowDialogService)
  {
    this.fg=new FormGroup({
      AcdYear:this.ctrlAcdYear,
      FeeHead:this.ctrlFeeHead,
      Amount:this.ctrlAmount,     
      Term:this.ctrlTerm,
      Course:this.ctrlCourse,
      StudentMap:this.ctrlStudentMap
    });
  }
  ngOnInit(): void {
    this.PopulateAcdYears();
    this.PopulateFeeHeads();
  }
  PopulateAcdYears()
  {
    this.srv.GetAllAcdYears().subscribe({
        next:(data)=>{
          this.AcdYearList=data.Data;
        }
    });
  }

  OnChangeFeeHead()
  {
    console.log('OnChangeFeeHead');
     this.selFeeHeadId=this.fg.controls['FeeHead'].value;
    this.FeeHeadObj=this.FeeHeadMasterDTOList.find(fh=>{return fh.FeeHeadId==this.selFeeHeadId});
    var NumberOfTerms=this.FeeHeadObj?.Terms!;
    this.NumberOfTermsArr= Array.from(Array(NumberOfTerms).keys());
    console.log(this.FeeHeadObj);
  }

  AcdYearChanged()
  {
    this.selAcdYearId=this.fg.controls['AcdYear'].value;
  }

  PopulateFeeHeads()
  {
    var OrgId=localStorage.getItem("SelOrgId")
    this.srv.GetAllAcdYears().subscribe({
        next:(data)=>{
          this.AcdYearList=data.Data;
        }
    });
    this.srv.GetAllFeeHeads(OrgId).subscribe(
      {
        next:(data)=>{
          this.FeeHeadMasterDTOList=data.Data;
        },
        error:(err)=>{
          this.dlgSrv.ShowSnackAutoClose("Error In Loading Fee Heads"+err.Message,4000)
        }
      }
    )
  }
  ShowCourseDialog()
  {
    this.dlgSrv.ShowSelectCourseDialog((res:any)=>{
      this.selectedCourseDetails=`${res.SelSplName}-${res.Year}-${res.Term}`;
      
      const crDetails:CourseDetailDTO={
        
        SpecializationId:res.SelSplId,
        Year:res.Year,
        Term:res.Term
      };
      this.srv.GetCourseDetailsIdOnOtherColumns(crDetails).subscribe(
        {
          next:data=>{
              this.selCourseDetailsId=data.Data;
              console.log('selCourseDetailsId:'+this.selCourseDetailsId)
          },
          error: err=>{
            this.dlgSrv.ShowSnackAutoClose("Unable to Fetch the Course Id",4000)
          }
        }
      )
    })
  }

  ShowSelectStudentDialog()
  {
    this.dlgSrv.ShowSelectStudentsDialog(this.ctrlAcdYear.value,1,
      (res:any)=>{
        this.selStudentsArray=res.selStudents;
      }
    );
  }
  AddNewFee()
  {
    var newFee:FeeMasterDTO;
    console.log(this.ctrlAcdYear.value)
    if(this.FeeHeadObj?.FeeType==1)
    {
      newFee={
        FHeadId:this.selFeeHeadId,
        AcdyearId:this.ctrlAcdYear.value,
        
        TermNo:this.ctrlTerm.value,
        DueDayNo:5,
        DueMonthNo:10,
        Amount:this.ctrlAmount.value,
        AddMode:0,
        
      };
    }else if(this.FeeHeadObj?.FeeType==2)
    {
      newFee={
        FHeadId:this.selFeeHeadId,
        AcdyearId:this.ctrlAcdYear.value,
        CourseDetailId:this.selCourseDetailsId,
        TermNo:this.ctrlTerm.value,
        DueDayNo:5,
        DueMonthNo:10,
        Amount:this.ctrlAmount.value,
        AddMode:0,
        
      };
    }else 
    {
      newFee={
        FHeadId:this.selFeeHeadId,
        AcdyearId:this.ctrlAcdYear.value,
        
        TermNo:this.ctrlTerm.value,
        DueDayNo:5,
        DueMonthNo:10,
        Amount:this.ctrlAmount.value,
        AddMode:0,
        MapId:this.selStudentsArray
        
      };
    }    
    console.log(newFee);
    this.srv.AddNewFee(newFee).subscribe({
      next:data=>{
        this.dlgSrv.ShowSnackAutoClose("New Fee Added",4000);
      },
      error: err=>{
        this.dlgSrv.ShowSnackAutoClose("Error In Adding Fee",4000);
      }
    })
  }

  
}
