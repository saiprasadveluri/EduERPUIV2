import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DbAccessServiceService } from 'src/app/Infra/db-access-service.service';
import { ShowDialogService } from 'src/app/Infra/show-dialog.service';
import { AcdYearDTO } from 'src/app/models/acd-year-dto';
import { CourseDetailDTO } from 'src/app/models/course-detail-dto';
import { GenerateClassChalansDTO } from 'src/app/models/GenerateClassChalansDTO';

@Component({
  selector: 'app-generate-bulk-chalans',
  templateUrl: './generate-bulk-chalans.component.html',
  styleUrls: ['./generate-bulk-chalans.component.css']
})
export class GenerateBulkChalansComponent implements OnInit {
  fg:FormGroup;
  selCourseDetailsId:any;
  AcdYearList:AcdYearDTO[]=[];
  ctrlAcdYear:FormControl=new FormControl('',Validators.required);
constructor(private router:Router,private fb:FormBuilder,private srv:DbAccessServiceService,private dlgSrv:ShowDialogService)
  {
    this.fg=fb.group({
      AcdYear:this.ctrlAcdYear,      
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

    GenerateClassChalans()
    {
      var selAcdyear:any=this.fg.get('AcdYear')?.value;
      var dto:GenerateClassChalansDTO={
        CDetId:this.selCourseDetailsId,
        AcdId:selAcdyear,
        TermNumber:3
      }
      this.srv.GenerateClassChalans(dto).subscribe({
        next:()=>{
          
        }
      })
    }
}

