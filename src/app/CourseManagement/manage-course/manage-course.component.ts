import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DbAccessServiceService } from 'src/app/Infra/db-access-service.service';
import { ShowDialogService } from 'src/app/Infra/show-dialog.service';
import { MainCourseDTO } from 'src/app/models/main-course-dto';

@Component({
  selector: 'app-manage-course',
  templateUrl: './manage-course.component.html',
  styleUrls: ['./manage-course.component.css']
})
export class ManageCourseComponent implements OnInit{
  mainCoursesArray: MainCourseDTO[]=[];
  constructor(private router:Router,private srv:DbAccessServiceService,private dlgSrv:ShowDialogService)
  {
    
  }
  ngOnInit(): void 
  {
    this.PopulateGrid();
  }
 
  PopulateGrid()
  {
    this.srv.GetMainCourses().subscribe(
      {
        next:(data)=>
        {
          this.mainCoursesArray=data.Data;
        }
      }
    )
  }

  ManageSpl(MainCourseId:any)
  {
    this.router.navigate(['home/manageSpecializations',MainCourseId]);
  }

  Delete(MainCourseId:any)
  {

  }
}
