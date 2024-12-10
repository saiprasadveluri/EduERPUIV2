import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { DbAccessServiceService } from 'src/app/Infra/db-access-service.service';
import { ShowDialogService } from 'src/app/Infra/show-dialog.service';
import { StreamSubjectMapDTO } from 'src/app/models/StreamSubjectMapDTO';
import { SubjectDTO } from 'src/app/models/subject-dto';
import { SubjectCheckBoxData } from '../subject-check-box-data';

@Component({
  selector: 'app-map-subjects',
  templateUrl: './map-subjects.component.html',
  styleUrls: ['./map-subjects.component.css']
})
export class MapSubjectsComponent implements OnInit{
  existingMaps:StreamSubjectMapDTO[]=[];
  crsSubjects:SubjectDTO[]=[];
  chkBoxData:SubjectCheckBoxData[]=[];
  selStreamId:any;
  fg:FormGroup;

  constructor(private formBuilder: FormBuilder,private router:Router,private fb:FormBuilder,private srv:DbAccessServiceService,private dlgSrv:ShowDialogService)
  {
    this.fg=formBuilder.group(
      {
        submaps: new FormArray([])
      }
    )
  }
  get subMapFormArray() {
    return this.fg.controls['submaps'] as FormArray;
  }
 
  ngOnInit(): void {
    this.FetchData();
}

FetchData()
{
  this.crsSubjects=[];
  this.existingMaps=[];
  this.chkBoxData=[];

  this.srv.GetAllSubjects().subscribe({
    next:(data)=>{
      this.crsSubjects=data.Data;
         this.srv.GetExistingStreamSubjectMaps(this.selStreamId).subscribe({
            next:(res)=>{
                    this.existingMaps=res.Data;                    
            },
            complete:()=>{
              console.log('from complete');
              console.log(this.existingMaps);
             for(var SubRec of this.crsSubjects)
             {              
              var found=this.existingMaps.findIndex((temp)=>{
                  return temp.SubjectId==SubRec.SubjectId
              });
              console.log(SubRec);
              console.log(found);
              if(found!=-1)
                {
                    this.chkBoxData.push({
                      subjId:SubRec.SubjectId,
                      subjectName:SubRec.SubjectName,
                      IsChecked:true                      
                    });
                }
                else
                {
                  this.chkBoxData.push({
                    subjId:SubRec.SubjectId,
                    subjectName:SubRec.SubjectName,
                    IsChecked:false                      
                  });
                }
              }
              console.log(this.chkBoxData);
             this.addCheckboxes();
            }
           
         });
    },
    error:(err)=>{
      this.dlgSrv.ShowSnackAutoClose("Error in fetching subjects",4000);
    }
  })
}

private addCheckboxes() {
  this.subMapFormArray.clear();
   this.chkBoxData.forEach((rec) => {
   
        this.subMapFormArray.push(new FormControl(rec.IsChecked))});
        console.log(this.subMapFormArray);
}

submit() {
  const selectedSubs = this.fg.value.submaps
    .map((checked:boolean, i:number) => checked ? this.chkBoxData[i].subjId: null)
    .filter((v:any) => v !== null);
    var newMap={
      CourseDetId:this.selStreamId,
      SubjectIdList:selectedSubs
    };
    
    this.srv.AddStreamSubjectMaps(newMap).subscribe({
      next:(data)=>
      {
        this.FetchData();
        this.dlgSrv.ShowSnackAutoClose("Success in updating map",4000);
      },
      error:(err)=>{
        this.dlgSrv.ShowSnackAutoClose("Error in updating map",4000);
      }
    })

}

SelectCourse()
{
  this.dlgSrv.ShowSelectCourseDialog((res:any)=>{
    this.srv.GetCourseDetailsIdOnOtherColumns({
      SpecializationId:res.SelSplId,
      Year:res.Year,
      Term:res.Term
    }).subscribe({
      next:(data)=>{
        this.selStreamId=data.Data;
        this.FetchData();
      }
    })      
  });
}
}
