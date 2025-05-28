import { AfterViewInit, Component, EventEmitter, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { DbAccessServiceService } from '../Infra/db-access-service.service';
import { ShowDialogService } from '../Infra/show-dialog.service';
import { OrganizationDTO } from '../models/OrganizationDTO';

@Component({
  selector: 'app-list-organizations',
  templateUrl: './list-organizations.component.html',
  styleUrls: ['./list-organizations.component.css']
})
export class ListOrganizationsComponent implements OnInit {
  OrgList:OrganizationDTO[]=[];
  @Output()OrganizationSelectionChanged:EventEmitter<string>;
constructor(private router:Router,private srv:DbAccessServiceService,private dlgSrv:ShowDialogService)
{
this.OrganizationSelectionChanged=new EventEmitter<string>();
}
  
  
ngOnInit(): void {
  this.srv.GetAllOrganizations().subscribe({
    next:(data)=>{
      this.OrgList=data.Data;
      console.log("Init:"+this.OrgList)
      if(this.OrgList.length>0)
      {
        console.log(this.OrgList[0])
        this.OrganizationSelectionChanged.emit(this.OrgList[0].OrgModuleType);
        console.log('evt emitted')
      }
    }
  })
}

OnChangeOrganization(evt:any)
{
  this.OrganizationSelectionChanged.emit(evt.target.value);
}
}