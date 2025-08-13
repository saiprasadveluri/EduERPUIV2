import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, RequiredValidator, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DbAccessServiceService } from '../../Infra/db-access-service.service';
import { ShowDialogService } from '../../Infra/show-dialog.service';
import { MainCourseDTO } from 'src/app/models/main-course-dto';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.css']
})
export class AddCourseComponent {
  fg:FormGroup;
  ctrlCourseName:FormControl=new FormControl('',[Validators.required]);
  ctrlDescription:FormControl=new FormControl('');
  ctrlDuration:FormControl=new FormControl('',[Validators.required]);
  ctrlTerms:FormControl=new FormControl('',[Validators.required]);
  ctrlIsSplAvailable:FormControl=new FormControl(false);
  constructor(private router:Router,private fb:FormBuilder,private srv:DbAccessServiceService,private dlgSrv:ShowDialogService)
  {
      this.fg=new FormGroup({
        CourseName:this.ctrlCourseName,
        Description:this.ctrlDescription,
        Duration:this.ctrlDuration,
        Terms:this.ctrlTerms,
        IsSplAvailable:this.ctrlIsSplAvailable
      });
  }

  
  AddNewCourse()
  {
    let orgId=localStorage.getItem("SelOrgId");
    var dto:MainCourseDTO={
      OrgId:orgId,
     CourseName:this.ctrlCourseName.value,
     DurationInYears:this.ctrlDuration.value,
     IsSpecializationsAvailable:this.ctrlIsSplAvailable.value==true?1:0,
     NumOfTermsInYear:this.ctrlTerms.value,
     Description:this.ctrlDescription.value,
     Status:1
    };
    console.log(dto);
      this.srv.AddMainCourse(dto).subscribe(
        {
          next:(data)=>{
            this.dlgSrv.ShowSnackAutoClose("Succes in Adding new Course",4000);
          },
          error:(err)=>{
            this.dlgSrv.ShowSnackAutoClose("Error in Adding new Course",4000);
          }
        }
      );
  }
}
