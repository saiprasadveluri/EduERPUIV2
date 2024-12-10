import { Component, NgModule } from '@angular/core';
import { BrowserModule, platformBrowser } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideRouter, RouterModule, Routes, withComponentInputBinding } from '@angular/router';
import { AppLoginComponent } from './app-login/app-login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule, provideHttpClient, withInterceptors } from '@angular/common/http';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { OrgSelectionComponent } from './org-selection/org-selection.component';
import {AddCourseComponent} from './CourseManagement/add-course/add-course.component';
import { HomeComponent } from './home/home.component';
import { authInterceptor } from './Infra/auth.interceptor';
import { ManageFeeHeadComponent } from './fee-management/manage-fee-head/manage-fee-head.component';
import { AddFeeHeadComponent } from './fee-management/add-fee-head/add-fee-head.component';
import { AddFeeComponent } from './fee-management/add-fee/add-fee.component';
import { SelectCourseDetailDialogComponent } from './Dialogs/select-course-detail-dialog/select-course-detail-dialog.component';
import { SelectStudentsDialogComponent } from './Dialogs/select-students-dialog/select-students-dialog.component';
import { AddNewStudentComponent } from './student-management/add-new-student/add-new-student.component';
import { ChalanDetailsComponent } from './fee-management/chalan-details/chalan-details.component';
import { ManageCourseComponent } from './CourseManagement/manage-course/manage-course.component';
import { ManageSpecializationsComponent } from './CourseManagement/manage-specializations/manage-specializations.component';
import { ManageSubjectComponent } from './SubjectManagement/manage-subject/manage-subject.component';
import { MapSubjectsComponent } from './SubjectManagement/map-subjects/map-subjects.component';
import {NgxPrintModule} from 'ngx-print';
import {MatIconModule} from '@angular/material/icon';
import {MatGridListModule} from '@angular/material/grid-list';
import {DataTablesModule} from 'angular-datatables';
import { QuestionUploadComponent } from './question-bank/question-upload.component';
import { ManageExamTypeComponent } from './exam-management/manage-exam-type/manage-exam-type.component';
import { ManageExamComponent } from './exam-management/manage-exam/manage-exam.component';
import { ManageExamScheduleComponent } from './exam-management/manage-exam-schedule/manage-exam-schedule.component';
import { AddExamComponent } from './exam-management/add-exam/add-exam.component';
import { ScheduleExamComponent } from './exam-management/schedule-exam/schedule-exam.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';
@NgModule({
  declarations: [
    AppComponent,
    AppLoginComponent,
    OrgSelectionComponent,
    AddCourseComponent,
    HomeComponent,
    ManageFeeHeadComponent,
    AddFeeHeadComponent,
    AddFeeComponent,
    SelectCourseDetailDialogComponent,
    SelectStudentsDialogComponent,
    AddNewStudentComponent,
    ChalanDetailsComponent,
    ManageCourseComponent,
    ManageSpecializationsComponent,
    ManageSubjectComponent,
    MapSubjectsComponent,
    QuestionUploadComponent,
    ManageExamTypeComponent,
    ManageExamComponent,
    ManageExamScheduleComponent,
    AddExamComponent,
    ScheduleExamComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatSnackBarModule,
    BrowserModule,
    BrowserAnimationsModule, 
    NoopAnimationsModule,
    MatDialogModule,
    NgxPrintModule,
    MatIconModule,
    MatGridListModule,
    DataTablesModule,
    PdfViewerModule
  ],
  providers: [
    { provide: MAT_DIALOG_DATA, useValue: {} },
    { provide: MatDialogRef, useValue: {} },
    provideHttpClient(withInterceptors([authInterceptor]))
  ],
  bootstrap: [AppComponent],  
})
export class AppModule { }
