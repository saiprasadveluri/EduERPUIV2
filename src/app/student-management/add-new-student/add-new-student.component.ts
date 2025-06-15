import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DbAccessServiceService } from 'src/app/Infra/db-access-service.service';
import { ShowDialogService } from 'src/app/Infra/show-dialog.service';
import { AcdYearDTO } from 'src/app/models/acd-year-dto';
import { BulkStudentInfoDTO } from 'src/app/models/bulk-student-info-dto';
import { CourseDetailDTO } from 'src/app/models/course-detail-dto';

@Component({
  selector: 'app-add-new-student',
  templateUrl: './add-new-student.component.html',
  styleUrls: ['./add-new-student.component.css']
})
export class AddNewStudentComponent implements OnInit {
  curOrgId:string="";
  fg:FormGroup;
  ctrlInputFile:FormControl=new FormControl('');
  ctrlAcdYear:FormControl=new FormControl('',Validators.required);
  selCourseDetailsId:any;
  AcdYearList:AcdYearDTO[]=[];
  currentFile:any;
  fileName:string='';
  progress:number = 0;
  message:string = "";
  constructor(private router:Router,private fb:FormBuilder,private srv:DbAccessServiceService,private dlgSrv:ShowDialogService)
  {
    this.fg=fb.group({
      AcdYear:this.ctrlAcdYear,
      InputFile:this.ctrlInputFile
    });
    this.curOrgId=localStorage.getItem("SelOrgId")!;
  }

  PopulateAcdYears()
  {
    this.srv.GetAllAcdYears().subscribe({
        next:(data)=>{
          this.AcdYearList=data.Data;
        }
    });
  }

  GetCourse()
  {
    this.dlgSrv.ShowSelectCourseDialog((res:any)=>{      
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

  selectFile(event: any): void 
  {
    this.progress = 0;
    this.message = "";

    if (event.target.files && event.target.files[0]) {
      const file: File = event.target.files[0];
      this.currentFile = file;
      this.fileName = this.currentFile.name;
    } else {
      this.fileName = 'Select File';
    }
  }

  UploadData()
  {
    const bulkDTO:BulkStudentInfoDTO={
      StreamId:this.selCourseDetailsId,
      AcdYearId:this.ctrlAcdYear.value,
      inpFile:this.currentFile
    };
    this.srv.UploadBulkStudentData(bulkDTO).subscribe({
        next:(data)=>{
          if(data instanceof HttpResponse)
          {
            console.log("Upload complete...");
            console.log(data);
            this.dlgSrv.ShowSnackAutoClose("Success in uploading",4000);
          }    
        },
        error:(err)=>{
          console.log(err);
          //this.dlgSrv.ShowSnackAutoClose("Error: "+err.error.Message,4000);
        },
        complete:()=>{
          this.ctrlInputFile.reset();
          console.log('complete')
        }
    });
  }
  ngOnInit(): void {
    this.PopulateAcdYears();
  }

}
