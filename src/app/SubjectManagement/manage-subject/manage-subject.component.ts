import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { DbAccessServiceService } from 'src/app/Infra/db-access-service.service';
import { ShowDialogService } from 'src/app/Infra/show-dialog.service';
import { SubjectDTO } from 'src/app/models/subject-dto';

@Component({
  selector: 'app-manage-subject',
  templateUrl: './manage-subject.component.html',
  styleUrls: ['./manage-subject.component.css']
})
export class ManageSubjectComponent implements OnInit,OnDestroy {
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  subjecList:SubjectDTO[]=[];
  fg:FormGroup;
  ctrlSubName:FormControl=new FormControl('',Validators.required);
  ctrlSubCode:FormControl=new FormControl('',Validators.required);  
  ctrlIsLang:FormControl=new FormControl('',Validators.required);
  ctrlLangNumber:FormControl=new FormControl('',Validators.required);  
  constructor(private router:Router,private fb:FormBuilder,private srv:DbAccessServiceService,private dlgSrv:ShowDialogService)
  { 
    this.fg=new FormGroup({
      SubName:this.ctrlSubName,
      SubCode:this.ctrlSubCode,
      IsLang:this.ctrlIsLang,
      LangNumber:this.ctrlLangNumber
    });
  }
  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  ngOnInit(): void 
  {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      processing: true
    };
    this.PopulateGrid();
  }

  PopulateGrid()
  {
    this.srv.GetAllSubjects().subscribe({
        next:(data)=>{
          this.subjecList=data.Data
          this.dtTrigger.next(this.dtOptions);
        },
        error:(err)=>{
           // this.dlgSrv.ShowSnackAutoClose("Error In Fetching Data",4000);
        }
    });
  }

  AddNewSubject()
  {
    var isLanguage:number=0;
    var LanguageSeqNumber:number|undefined=0;
    if(this.ctrlIsLang.value==true)
      {
        isLanguage=1;
        LanguageSeqNumber=this.ctrlLangNumber.value;
      }
    var subDTO:SubjectDTO={
      SubjectName:this.ctrlSubName.value,
      SubjectCode:this.ctrlSubCode.value,
      Status:1,
      IsLanguageSubject:isLanguage,
      LanguageNumber:LanguageSeqNumber
    };
    this.srv.AddSubject(subDTO).subscribe(
      {
        next:(data)=>{
          this.dlgSrv.ShowSnackAutoClose("Success in Adding new Subject",4000);
          this.PopulateGrid();
        },
        error:(err)=>{
          this.dlgSrv.ShowSnackAutoClose("Error in Adding new Subject",4000);
         
        }
      }
    )
  }

  Delete(subId:any)
  {

  }

}
