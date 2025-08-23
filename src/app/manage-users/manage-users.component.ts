import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DbAccessServiceService } from '../Infra/db-access-service.service';
import { ShowDialogService } from '../Infra/show-dialog.service';
import { UserInfoDTO } from '../models/user-Info-dto';

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.css']
})
export class ManageUsersComponent implements OnInit {
  UserList:UserInfoDTO[]=[];
  constructor(private router:Router,private srv:DbAccessServiceService,private dlgSrv:ShowDialogService)
  {

  }

  ngOnInit(): void 
  {
   this.UpdateUserInfoGrid()
  }

  UpdateUserInfoGrid()
  {
     this.srv.GetAllOrgUsers().subscribe(
     {
       next:(res)=>{
        this.UserList=res.Data;
            }
     }
    )
  }
  ManageUserRoles(UserId:any)
  {
    
  }
}
