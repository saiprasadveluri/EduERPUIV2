import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DbAccessServiceService } from 'src/app/Infra/db-access-service.service';
import { ShowDialogService } from 'src/app/Infra/show-dialog.service';
import { ExamTypeDTO } from 'src/app/models/exam-type-dto';
import { MainCourseDTO } from 'src/app/models/main-course-dto';

@Component({
  selector: 'app-manage-exam-type',
  templateUrl: './manage-exam-type.component.html',
  styleUrls: ['./manage-exam-type.component.css']
})
export class ManageExamTypeComponent implements OnInit{
  examTypeArray:ExamTypeDTO[]=[];
  selMainCourseId:any|undefined;
  selMainCourseName:string="";
  mainCoursesArray:MainCourseDTO[]=[];
  fgMainCourse:FormGroup;

  fgAddExamType:FormGroup;
  ctrlExamTypeName:FormControl=new FormControl('',[Validators.requiredTrue]);

  ctrlMainCourse:FormControl=new FormControl('');

constructor(private router:Router,private srv:DbAccessServiceService,private dlgSrv:ShowDialogService)
{
  this.fgMainCourse=new FormGroup({
    MainCourse:this.ctrlMainCourse    
  }        
  );
  this.fgAddExamType=new FormGroup({
    newExamTypeName:this.ctrlExamTypeName
  })
}
  ngOnInit(): void {
    this.PopulateMainCourses();
  }

  PopulateGrid()
  {
    if(this.selMainCourseId!=undefined)
    {
    this.srv.GetExamTypes(this.selMainCourseId).subscribe({
      next:(data)=>{
        this.examTypeArray=data.Data;
      }
    }      
    );
    }
  }

  PopulateMainCourses()
  {
    var OrgId=localStorage.getItem("SelOrgId");
    this.srv.GetMainCourses().subscribe({
      next:(data)=>{
        this.mainCoursesArray=data.Data;        
      }
    })
  }

  OnMainCourseChange()
  {
    this.selMainCourseName="Select Main Course";
    if(this.ctrlMainCourse.value=="0")
      this.selMainCourseId=undefined;
    else{
      this.selMainCourseId=this.ctrlMainCourse.value;
      var filterdeArr=this.mainCoursesArray.filter((itm)=>itm.MainCourseId==this.selMainCourseId);  
          if(filterdeArr.length>0)
          {
            this.selMainCourseName=filterdeArr[0].CourseName;
            console.log(filterdeArr[0].CourseName);
          }
    }    
  }

  SelectMainCourse()
  {
    this.PopulateGrid();
  }

  AddNewExamType()
  {
    var NewExamTypeName=this.ctrlExamTypeName.value;
    if(NewExamTypeName.trim().length>0)
    {
      var dto:ExamTypeDTO={
        ExamTypeName:NewExamTypeName,
        MainCourseId:this.selMainCourseId
      }
      this.srv.AddExamType(dto).subscribe({
        next:(data)=>{
          this.PopulateGrid();
        }
      })
    }
  }
}
