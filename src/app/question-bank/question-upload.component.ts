import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { DbAccessServiceService } from 'src/app/Infra/db-access-service.service';
import { ShowDialogService } from 'src/app/Infra/show-dialog.service';

@Component({
  selector: 'app-question-upload',
  templateUrl: './question-upload.component.html',
  styleUrls: ['./question-upload.component.css']
})
export class QuestionUploadComponent implements OnInit{
  selTopicId:any;
  fg:FormGroup;
  ctrlInputFile:FormControl=new FormControl('');
  
  constructor(private router:Router,private fb:FormBuilder,private srv:DbAccessServiceService,private dlgSrv:ShowDialogService)
  {
    this.fg=fb.group({
         InputFile:this.ctrlInputFile
    });    
  }
  ngOnInit(): void {
   
  }
  

}
