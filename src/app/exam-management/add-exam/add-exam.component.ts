import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DbAccessServiceService } from 'src/app/Infra/db-access-service.service';
import { ShowDialogService } from 'src/app/Infra/show-dialog.service';
import { AcdYearDTO } from 'src/app/models/acd-year-dto';
import { CourseDetailDTO } from 'src/app/models/course-detail-dto';
import { CourseSpecializationDTO } from 'src/app/models/course-specialization-dto';
import { ExamDTO } from 'src/app/models/exam-dto';
import { ExamTypeDTO } from 'src/app/models/exam-type-dto';

@Component({
  selector: 'app-add-exam',
  templateUrl: './add-exam.component.html',
  styleUrls: ['./add-exam.component.css']
})
export class AddExamComponent implements OnInit{
  SelMainCourseId:any;
  selCourseDetId:any;
  selExamTypeId:any;
  selAcdYearId:any;
  examTypeArray:ExamTypeDTO[]=[];
  acdYearArray:AcdYearDTO[]=[];
  fgExam:FormGroup;
  ExamTypeCtrl:FormControl=new FormControl('',[Validators.required]);
  ExamTitleCtrl:FormControl=new FormControl('',[Validators.required]);
  ExamStartDateCtrl:FormControl=new FormControl('',[Validators.required]);
  ExamEndDateCtrl:FormControl=new FormControl('',[Validators.required]);
  AcdYearCtrl:FormControl=new FormControl('',[Validators.required]);
  constructor(private router:Router,private srv:DbAccessServiceService,private dlgSrv:ShowDialogService)
  {
    this.fgExam=new FormGroup({
      ExamType:this.ExamTypeCtrl,
      ExamTitle:this.ExamTitleCtrl,
      ExamStartDate:this.ExamStartDateCtrl,
      ExamEndDate:this.ExamEndDateCtrl,
      acdYear:this.AcdYearCtrl
    });
  }
  ngOnInit(): void {
    this.PopulateAcdYears();
  }

  OnExamTypeChange()
  {
    if(this.ExamTypeCtrl.value!="0")
    {
      this.selExamTypeId=this.ExamTypeCtrl.value;
    }
  }

  PopulateExamType()
  {
      this.srv.GetExamTypes(this.SelMainCourseId).subscribe({
          next:(data)=>{
                this.examTypeArray=data.Data;
          }
      });
  }

  PopulateAcdYears()
  {
    this.srv.GetAllAcdYears().subscribe({
      next:(data)=>{
        this.acdYearArray=data.Data;
      }
    })
  }

  AcdYearChanged()
  {
      this.selAcdYearId=this.AcdYearCtrl.value;
  }
  
  SelectCourseDetail()
  {
    this.dlgSrv.ShowSelectCourseDialog((obj:any)=>{
      this.SelMainCourseId=obj.SelMainCourseId;
      var SelSplId=obj.SelSplId;
      var SelYear=obj.Year;
      var SelTerm=obj.Term;
      var CrsDetDTO:CourseDetailDTO={
        SpecializationId:SelSplId,
        Year:SelYear,
        Term:SelTerm
      }
      this.srv.GetCourseDetailsIdOnOtherColumns(CrsDetDTO).subscribe(
        {
          next:(data)=>{
            this.selCourseDetId=data.Data;
            this.PopulateExamType();
          }
        }
      )
    });
  }

  AddNewExam(){

  var dto:ExamDTO={
    CourseDetialId:this.selCourseDetId,
    ExamTitle:this.ExamTitleCtrl.value,
    StartDate:this.ExamStartDateCtrl.value,
    EndDate:this.ExamEndDateCtrl.value,
    ExamTypeId:this.ExamTypeCtrl.value,
    AcdYearId:this.AcdYearCtrl.value
  };
  console.log(dto);
  this.srv.AddExam(dto).subscribe({
    next:(data)=>{
      this.dlgSrv.ShowSnackAutoClose("Success in Adding Exam",4000);
    },
    error:(err)=>{
      this.dlgSrv.ShowSnackAutoClose("Error in Adding Exam",4000);
    }
  })
  }

  IsFormvalid():boolean{
    console.log('Title: '+this.ExamTitleCtrl.valid)//&&this.ExamStartDateCtrl.valid&&this.ExamEndDateCtrl.valid&&this.ExamTypeCtrl.valid && this.SelMainCourseId!=undefined)
    if(this.ExamTitleCtrl.valid&&this.ExamStartDateCtrl.valid&&this.ExamEndDateCtrl.valid&&this.ExamTypeCtrl.valid && this.SelMainCourseId!=undefined)
    return true;
  else
  return false;
  }
}
