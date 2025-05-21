import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DbAccessServiceService } from 'src/app/Infra/db-access-service.service';
import { ShowDialogService } from 'src/app/Infra/show-dialog.service';
import { CourseDetailDTO } from 'src/app/models/course-detail-dto';
import { ExamDTO } from 'src/app/models/exam-dto';
import { NewStudentExamScheduleMapRequestDTO } from 'src/app/models/new-student-exam-schedule-map-request-dto';

@Component({
  selector: 'app-manage-exam',
  templateUrl: './manage-exam.component.html',
  styleUrls: ['./manage-exam.component.css']
})
export class ManageExamComponent implements OnInit{
  selCourseDetId:any;
  examDTOArray:ExamDTO[]=[];
  constructor(private router:Router,private srv:DbAccessServiceService,private dlgSrv:ShowDialogService)
  {

  }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  
  PopulateGrid()
  {
    if(this.selCourseDetId!=undefined)
    {
        this.srv.GetExams(this.selCourseDetId).subscribe({

          next:(data)=>{
            this.examDTOArray=data.Data;
            this.dlgSrv.ShowSnackAutoClose("Success in Fetching data....",4000);
          },
          error:(err)=>{
            this.dlgSrv.ShowSnackAutoClose("Error in Fetching data....",4000);
          }
        });
    }
  }
  SelectCourse()
  {
    this.dlgSrv.ShowSelectCourseDialog((obj:any)=>{
      if(obj.Status==1)
      {
        var CrsDetDTO:CourseDetailDTO={
          SpecializationId:obj.SelSplId,
          Year:obj.SelYear,
          Term:obj.SelTerm
        }
        this.srv.GetCourseDetailsIdOnOtherColumns(CrsDetDTO).subscribe(
          {
            next:(data)=>{
              this.selCourseDetId=data.Data;
              this.PopulateGrid();
            }
          }
        )
      }
    })
  }

  ExtractDate(inpDate:string)
  {
    var CurDate:Date=new Date(inpDate);
    return CurDate.toDateString();
  }

  ScheduleExam(ExamId:any)
  {
    this.router.navigate(['home/scheduleExam',ExamId]);
  }

  ActivateExam(InpexamId:any)
  {
    var dto:NewStudentExamScheduleMapRequestDTO={
      ExamId:InpexamId
    }
    this.srv.MapExamToStudents(dto).subscribe({
      next:()=>{
        this.dlgSrv.ShowSnackAutoClose("Successing in Activating Exam",4000)
      }
    });
  }
}
