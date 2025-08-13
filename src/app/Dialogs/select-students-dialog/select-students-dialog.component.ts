import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DbAccessServiceService } from 'src/app/Infra/db-access-service.service';
import { ShowDialogService } from 'src/app/Infra/show-dialog.service';
import { CourseDetailDTO } from 'src/app/models/course-detail-dto';
import { CourseSpecializationDTO } from 'src/app/models/course-specialization-dto';
import { MainCourseDTO } from 'src/app/models/main-course-dto';
import { StudentYearStreamMapDTO } from 'src/app/models/student-year-stream-map-dto';

@Component({
  selector: 'app-select-students-dialog',
  templateUrl: './select-students-dialog.component.html',
  styleUrls: ['./select-students-dialog.component.css']
})
export class SelectStudentsDialogComponent implements OnInit {
  fg:FormGroup;
  ctrlMainCourse:FormControl=new FormControl('');
   ctrlSpecialization:FormControl=new FormControl('');
   ctrlYear:FormControl=new FormControl('');
   ctrlTerm:FormControl=new FormControl('');
   mainCoursesArray:MainCourseDTO[]=[];
   courseSpecializationArray:CourseSpecializationDTO[]=[];
   numberOfYearsArray:number[]=[];
   numberOfTermsArray:number[]=[];
   courseStudentArray:StudentYearStreamMapDTO[]=[];
   selCourseDetailsId:any;
   selAcdYearId:any;
   selStudentArray:any[]=[];
   showMode:number=1;
   selStudent:any;
  constructor(public dialogRef: MatDialogRef<SelectStudentsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public srv:DbAccessServiceService,
    private dlgSrv:ShowDialogService)
    {
      this.selAcdYearId=data.selAcdYearId;
      this.showMode=data.ShowMode;

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
  PopulateStudentList()
  {
    this.selStudentArray=[];
    const crDetails:CourseDetailDTO={
        
      SpecializationId:this.ctrlSpecialization.value,
      Year:this.ctrlYear.value,
      Term:this.ctrlTerm.value
    };

    this.srv.GetCourseDetailsIdOnOtherColumns(crDetails).subscribe(
      {
        next:data=>{
            this.selCourseDetailsId=data.Data;
            console.log('selCourseDetailsId:'+this.selCourseDetailsId)
            
            this.srv.GetStudentYearStreamMapsOnCourseId(this.selCourseDetailsId).subscribe(
              {
                  next:(data)=>{
                        this.courseStudentArray=data.Data;
                        console.log(this.courseStudentArray);
                  },
                  error:err=>{
                    this.dlgSrv.ShowSnackAutoClose("Unable to Fetch the Student List",4000)
                  }
              }
            );
        },
        error: err=>{
          this.dlgSrv.ShowSnackAutoClose("Unable to Fetch the Course Id",4000)
        }
      }
    )

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

  SelectionChange(id:string)
  {
    if (this.selStudentArray.includes(id)) {
      this.selStudentArray = this.selStudentArray.filter((item) => item !== id);
    } 
    else {
      this.selStudentArray.push(id);
    }
  }
  OnSelStudentChange(evt:any)
  {
    this.selStudent=evt.target.value;
  }
OnClose()
{  
  this.dialogRef.close({
    selStudents:this.selStudentArray,
    selStudent:this.selStudent
  });
}
}
