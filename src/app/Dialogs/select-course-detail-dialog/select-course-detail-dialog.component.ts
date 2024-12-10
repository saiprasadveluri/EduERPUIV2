import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DbAccessServiceService } from 'src/app/Infra/db-access-service.service';
import { CourseSpecializationDTO } from 'src/app/models/course-specialization-dto';
import { MainCourseDTO } from 'src/app/models/main-course-dto';

@Component({
  selector: 'app-select-course-detail-dialog',
  templateUrl: './select-course-detail-dialog.component.html',
  styleUrls: ['./select-course-detail-dialog.component.css']
})
export class  SelectCourseDetailDialogComponent implements OnInit{
  fg:FormGroup;
   ctrlMainCourse:FormControl=new FormControl('');
   ctrlSpecialization:FormControl=new FormControl('');
   ctrlYear:FormControl=new FormControl('');
   ctrlTerm:FormControl=new FormControl('');
   mainCoursesArray:MainCourseDTO[]=[];
   courseSpecializationArray:CourseSpecializationDTO[]=[];
   numberOfYearsArray:number[]=[];
   numberOfTermsArray:number[]=[];
  constructor(public dialogRef: MatDialogRef<SelectCourseDetailDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,public srv:DbAccessServiceService)
    {
      this.fg=new FormGroup({
        MainCourse:this.ctrlMainCourse,
        Specialization:this.ctrlSpecialization,
        Year:this.ctrlYear,
        Term:this.ctrlTerm
      }        
      );
    }
  ngOnInit(): void {
    this.PopulateMainCourses();
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

  populateYearsAndTerms()
  {
    var SelMainCourseId=this.ctrlMainCourse.value;
    var SelCourse=this.mainCoursesArray.find(elm=>elm.MainCourseId==SelMainCourseId);
    if(SelCourse!=undefined)
    {
      console.log(SelCourse)
      this.numberOfYearsArray=Array.from(Array(SelCourse.DurationInYears).keys())
      this.numberOfTermsArray=Array.from(Array(SelCourse.NumOfTermsInYear).keys())
    }
  }
  OnMainCourseChange()
  {
    var SelMainCourseId=this.ctrlMainCourse.value;
    this.populateYearsAndTerms();
    this.srv.GetSpecializations(SelMainCourseId).subscribe({
      next:data=>{
            this.courseSpecializationArray=data.Data;
      }
    })
  }

OnClose()
{
  var SplName;
  var SpecializationId=this.ctrlSpecialization.value;
  var SelSplObj=this.courseSpecializationArray.find(spl=>spl.CourseSpecializationId==SpecializationId)
  if(SelSplObj!=undefined)
  {
    SplName=SpecializationId;
  }


  this.dialogRef.close({
    Status:1,
    SelMainCourseId:this.ctrlMainCourse.value,
    SelSplId:SpecializationId,
    SelSplName:SplName,
    Year:this.ctrlYear.value,
    Term:this.ctrlTerm.value
  });
}

OnCancel()
{
  this.dialogRef.close({
    Status:0
  });
}

}
