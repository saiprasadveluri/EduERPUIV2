import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppLoginComponent } from './app-login/app-login.component';
import { OrgSelectionComponent } from './org-selection/org-selection.component';
import { AddCourseComponent } from './CourseManagement/add-course/add-course.component';
import { HomeComponent } from './home/home.component';
import { accessGuard, featureGuard, loginGuard } from './Infra/access.guard';
import { RoleConsts } from './Infra/role-consts';
import { ManageFeeHeadComponent } from './fee-management/manage-fee-head/manage-fee-head.component';
import { AddFeeHeadComponent } from './fee-management/add-fee-head/add-fee-head.component';
import { AddFeeComponent } from './fee-management/add-fee/add-fee.component';
import { AddNewStudentComponent } from './student-management/add-new-student/add-new-student.component';
import { ChalanDetailsComponent } from './fee-management/chalan-details/chalan-details.component';
import { ManageCourseComponent } from './CourseManagement/manage-course/manage-course.component';
import { ManageSpecializationsComponent } from './CourseManagement/manage-specializations/manage-specializations.component';
import { ManageSubjectComponent } from './SubjectManagement/manage-subject/manage-subject.component';
import { MapSubjectsComponent } from './SubjectManagement/map-subjects/map-subjects.component';
import { QuestionUploadComponent } from './question-bank/question-upload.component';
import { ManageExamTypeComponent } from './exam-management/manage-exam-type/manage-exam-type.component';
import { AddExamComponent } from './exam-management/add-exam/add-exam.component';
import { ManageExamComponent } from './exam-management/manage-exam/manage-exam.component';
import { ScheduleExamComponent } from './exam-management/schedule-exam/schedule-exam.component';
import { StudentHomeComponent } from './student-management/student-home/student-home.component';
import { OrgnizationFeatureSubscriptionComponent } from './orgnization-feature-subscription/orgnization-feature-subscription.component';
import { SysAdminHomeComponent } from './sys-admin-home/sys-admin-home.component';
import { NewAdminCreationComponent } from './new-admin-creation/new-admin-creation.component';
import { GenerateBulkChalansComponent } from './fee-management/generate-bulk-chalans/generate-bulk-chalans.component';

const routes: Routes = [
  {path:'',redirectTo:'login',pathMatch:'full'} ,
  {path:'login',component:AppLoginComponent},
  {path:'orgSel',component:OrgSelectionComponent,canActivate:[loginGuard]},
  {path:'studentHome',component:StudentHomeComponent},
  {path:'sysadminhome',component:SysAdminHomeComponent,
    children:[
      {path:'orgnizationFeatureSubscription',component:OrgnizationFeatureSubscriptionComponent},
      {path:'addNewAdmin',component:NewAdminCreationComponent} 
    
    ]},
  {path:'home',component:HomeComponent,

    children:[     
      {path:'generateBulkCahalan',component:GenerateBulkChalansComponent},  
      {path:'manageFeeHead',component:ManageFeeHeadComponent,canActivate:[featureGuard],
      data:{roledata:[{feature:RoleConsts.FEE_MANAGEMENT_FEATURE,role:RoleConsts.ROLE_ADMIN}]}
      },
      {path:'addFeeHead',component:AddFeeHeadComponent,canActivate:[featureGuard],
        data:{roledata:[{feature:RoleConsts.FEE_MANAGEMENT_FEATURE,role:RoleConsts.ROLE_ADMIN}]}
      },
      {path:'addFee',component:AddFeeComponent,canActivate:[featureGuard],
        data:{roledata:[{feature:RoleConsts.FEE_MANAGEMENT_FEATURE,role:RoleConsts.ROLE_ADMIN}]}
      },
      {path:'addBulkStudent',component:AddNewStudentComponent},
      {path:'getStudentChalan',component:ChalanDetailsComponent},
      {path:'addCourse',component:AddCourseComponent},
      {path:'manageCourses',component:ManageCourseComponent},
      {path:'manageSpecializations/:id',component:ManageSpecializationsComponent},
      {path:'manageSubjects',component:ManageSubjectComponent},
      {path:'manageSubjectMaps',component:MapSubjectsComponent},
      {path:'questionUpload',component:QuestionUploadComponent},
      {path:'manageExamType',component:ManageExamTypeComponent},
      {path:'addExam',component:AddExamComponent},
      {path:'manageExam',component:ManageExamComponent},
      {path:'scheduleExam/:examId',component:ScheduleExamComponent},  
         
    ]
    }  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
