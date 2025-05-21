import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { DbAccessServiceService } from 'src/app/Infra/db-access-service.service';
import { ShowDialogService } from 'src/app/Infra/show-dialog.service';
import { ExamDTO } from 'src/app/models/exam-dto';
import { ExamScheduleDTO } from 'src/app/models/exam-schedule-dto';
import { NewExamScheduleRequestDTO } from 'src/app/models/new-exam-schedule-request-dto';
import { StreamSubjectMapDTO } from 'src/app/models/StreamSubjectMapDTO';
import { SubjectExamScheduleDTO } from 'src/app/models/subject-exam-schedule-dto';


@Component({
  selector: 'app-schedule-exam',
  templateUrl: './schedule-exam.component.html',
  styleUrls: ['./schedule-exam.component.css']
})
export class ScheduleExamComponent implements OnInit{
  selExamId:any;
  selExamObj:ExamDTO|undefined=undefined;
  streamSubjectsArray:StreamSubjectMapDTO[]=[];
  scheduleForm: FormGroup;
  items: FormArray|undefined;
  inpFileArray:any[]=[];
  displayPaper:boolean=false;
  examScheduleData:ExamScheduleDTO[]=[];
  QuestionPaperUrl:any="";
constructor(private formBuilder: FormBuilder,private router:Router,private srv:DbAccessServiceService,private dlgSrv:ShowDialogService,private activeRoute:ActivatedRoute)
 {
    this.activeRoute.params.subscribe((prms)=>{
      this.selExamId=prms['examId']
    });
    this.scheduleForm = new FormGroup({
      items: new FormArray([])
    });
 }
get getFromArray():FormArray|undefined
{
  return this.items;
}
  ngOnInit(): void {
    
    this.PoulateForm();
    this.PopulateScheduleData();
    }

  CreateInputRows(){
    this.items = this.scheduleForm.get('items') as FormArray;
    for(var rec of this.streamSubjectsArray)
    { 
      var curFrmormGroup:FormGroup=this.formBuilder.group({
        choose:new FormControl(''),
        subject:new FormControl(rec.SubjectName),
        date:new FormControl(''),
        time:new FormControl(''),
        notes:new FormControl(''),
        subId:new FormControl(rec.StreamSubjectMapId),
        inpFile:  new FormControl(''),      
      });
      
      this.items.push(curFrmormGroup);     
    }
  }

  selectFile(event: any,index:number): void 
  {
    var EntryIndex=this.inpFileArray.findIndex(fl=>fl.Index==index);
    if(EntryIndex!=-1)
    {
      this.inpFileArray.splice(EntryIndex,1);
    }
    if (event.target.files && event.target.files[0]) 
      {
      const file: File = event.target.files[0];
      this.inpFileArray.push({Index:index,inpFile:file});      
    } else {
      
    }
  }

  AddSchedule()
  {
    console.log(this.scheduleForm.value['items'])
      var inpArr=this.scheduleForm.value['items'];    
      if(inpArr.length>0)
        {
        var recArray:SubjectExamScheduleDTO[]=[];
        for(let idx in inpArr)
          { 
            var itm=inpArr[idx];            
            if(itm.choose===true)
            {
              var curInpFile=this.inpFileArray.find(fl=>fl.Index==idx);
              
              if(curInpFile!=undefined)
              {
                let rec:SubjectExamScheduleDTO={
                  ExamOrderNo:1,
                  ExamDate:itm.date,
                  ExamTime:itm.time,
                  Notes:itm.notes,
                  StreamSubjectMapId:itm.subId,  
                  ExamPaperFile: curInpFile.inpFile             
                }
                recArray.push(rec);
              }
              else
              {
                this.dlgSrv.ShowSnackAutoClose("Select question papaer file",4000);
                return;
              }
              
            }
          }
          if(recArray.length>0)
          {
            let requestDTO:NewExamScheduleRequestDTO={
              ExamId:this.selExamId,
              SubjectExamSchedules:recArray
            }
            console.log(requestDTO);
            this.srv.ScheduleExams(requestDTO).subscribe({
              next:(data)=>{
                //if(data.Status==1)
                {
                  this.PopulateScheduleData();
                  //this.scheduleForm.reset();
                  //this.PoulateForm();
                  this.dlgSrv.ShowSnackAutoClose("Success in Creating Exam Schedule",4000);
                }                
              },
              error:(err)=>{
                this.dlgSrv.ShowSnackAutoClose("Error in Creating Exam Schedule",4000);
              }
            })
          }
          else{
            this.dlgSrv.ShowSnackAutoClose("Select subjects to schedule",4000);
          }
        
        
      }          
  }
  PoulateForm()
  {
    this.srv.GetExam(this.selExamId).subscribe({
      next:(data)=>
        {
          this.selExamObj=data.Data;
          var CourseDetId=this.selExamObj?.CourseDetialId;
          this.srv.GetExistingStreamSubjectMaps(CourseDetId).subscribe({
              next:(data)=>{
                this.streamSubjectsArray=data.Data;
                this.CreateInputRows();
              }

          });
        },
        error:(err)=>{
          this.dlgSrv.ShowSnackAutoClose("Error In fetching Exam Data..",4000);
        }
    });
  }
PopulateScheduleData()
{
  this.srv.GetExamSchedule(this.selExamId).subscribe({
    next:(data)=>{
      this.examScheduleData=data.Data;
    }
  })
}
GetTimeFragment(inp:Date):string{
  //console.log(inp);
return new Date(inp).toLocaleTimeString('en-US');
}

GetDateFragment(inp:Date):string{
  //console.log(inp);
return new Date(inp).toDateString();
}

ShowQuestionPapaer(schId:any)
{
  this.displayPaper=false;
  this.QuestionPaperUrl="";
  this.srv.GetExamQuestionPaper(schId).subscribe({
    next:(data)=>{
      this.displayPaper=true;
      //console.log(data.Data)
      var streamValue=Base64Binary.decodeArrayBuffer(data.Data); 
      console.log(streamValue)
      this.QuestionPaperUrl = window.URL.createObjectURL(new Blob([streamValue],{ type: "application/pdf" }));
      console.log(this.QuestionPaperUrl);
      sessionStorage.setItem("QPAPER",this.QuestionPaperUrl);
      this.dlgSrv.ShowPDFViewerDialog();
  }});

    
}

DeleteScheduleEntry(schId:any)
{
  
  this.srv.DeleteExamScheduleEntry(schId).subscribe({
    next:(data)=>{
      this.dlgSrv.ShowSnackAutoClose("Success In deleting schedule entry",4000);
      this.PopulateScheduleData();
    }
  });
}
}
