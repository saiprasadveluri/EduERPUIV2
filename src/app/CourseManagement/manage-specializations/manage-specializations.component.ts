import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DbAccessServiceService } from 'src/app/Infra/db-access-service.service';
import { ShowDialogService } from 'src/app/Infra/show-dialog.service';
import { CourseSpecializationDTO } from 'src/app/models/course-specialization-dto';

@Component({
  selector: 'app-manage-specializations',
  templateUrl: './manage-specializations.component.html',
  styleUrls: ['./manage-specializations.component.css']
})
export class ManageSpecializationsComponent  implements OnInit{
  SelMainCourseId:any;
  courseSpecializationArray:CourseSpecializationDTO[]=[];
  fg:FormGroup;
  ctrlSplName:FormControl=new FormControl('',Validators.required);
  constructor(private actvRoute:ActivatedRoute, private router:Router,private srv:DbAccessServiceService,private dlgSrv:ShowDialogService)
  {
    this.fg=new FormGroup({
      SplName:this.ctrlSplName
    })
    this.actvRoute.params.subscribe(prms=>{
     this.SelMainCourseId=prms["id"];
    })
  }
  ngOnInit(): void {
    this.PopulateGrid();
  }
  PopulateGrid()
  {
    this.srv.GetSpecializations(this.SelMainCourseId).subscribe({
      next:data=>{
            this.courseSpecializationArray=data.Data;
      }
    })
  }

  AddNewSpecialization()
  {
    var dto:CourseSpecializationDTO={
      SpecializationName:this.ctrlSplName.value,
      Status:1,
      MainCourseId:this.SelMainCourseId
    }
    this.srv.AddSpecializations(dto).subscribe({
        next:(data)=>{
            this.dlgSrv.ShowSnackAutoClose("Success in Adding record",4000);
            this.PopulateGrid();
        }
    });
  }
  Delete(splId:any)
  {

  }
}
