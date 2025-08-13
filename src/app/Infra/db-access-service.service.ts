import { HttpClient, HttpEvent, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpHelper } from './http-helper';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {jwtDecode} from 'jwt-decode';
import { LoginResultDTO } from '../models/login-result-dto';
import { TokenRequestDTO } from '../models/token-request-dto';
import { LoginDataDTO } from '../models/login-data-dto';
import { FeeHeadMasterDTO } from '../models/fee-head-master-dto';
import { CourseDetailDTO } from '../models/course-detail-dto';
import { FeeMasterDTO } from '../models/fee-master-dto';
import { StudentYearStreamMapDTO } from '../models/student-year-stream-map-dto';
import { BulkStudentInfoDTO } from '../models/bulk-student-info-dto';
import { MainCourseDTO } from '../models/main-course-dto';
import { CourseSpecializationDTO } from '../models/course-specialization-dto';
import { NewStreamSubjectMapsDTO } from '../models/NewStreamSubjectMapsDTO';
import { SubjectDTO } from '../models/subject-dto';
import { ExamTypeDTO } from '../models/exam-type-dto';
import { BulkQuestionUploadDTO } from '../models/bulk-question-upload-dto';
import { ExamDTO } from '../models/exam-dto';
import { NewExamScheduleRequestDTO } from '../models/new-exam-schedule-request-dto';
import { serialize } from 'object-to-formdata';
import { NewStudentExamScheduleMapRequestDTO } from '../models/new-student-exam-schedule-map-request-dto';
import { ModuleFeatureDTO } from '../models/ModuleFeatureDTO';
import { OrganizationDTO } from '../models/OrganizationDTO';
import { OrgnizationFeatureSubscriptionDTO } from '../models/OrgnizationFeatureSubscriptionDTO';
import { UserOrgMapDTO } from '../models/user-org-map-dto';
import { UserInfoDTO } from '../models/user-Info-dto';
import { GenerateClassChalansDTO } from '../models/GenerateClassChalansDTO';
import { ApplicationModuleDTO } from '../models/application-module-dto';
@Injectable({
  providedIn: 'root'
})
export class DbAccessServiceService {
 // httpHelper:HttpHelper;
  //accessToken:string|null;
  private JWT_ROLE_KEY:string='http://schemas.microsoft.com/ws/2008/06/identity/claims/role';
  constructor(private http:HttpClient,private httpHelper:HttpHelper) { 
    
    //this.accessToken=localStorage.getItem("AuthToken");
    //this.httpHelper=new HttpHelper(http);
  }


  VerifyLogin(loginData:LoginDataDTO):Observable<any>
  {
    //let prms:HttpParams=new HttpParams().append("Email",Un).append("Password",pwd);
    
    return this.httpHelper.HttpPost<LoginResultDTO>("Account",loginData);
  }

  GetAccessToken(inp:TokenRequestDTO):Observable<any>
  {
    
    return this.httpHelper.HttpPost<any>("Account/token",inp);
  }

  AddFeeHead(inp:FeeHeadMasterDTO):Observable<any>{
    return this.httpHelper.HttpPost<any>('FeeHead',inp);
  }

  GetAllFeeHeads(id:any):Observable<any>
  {
    return this.httpHelper.HttpGet(`FeeHead/Org/${id}`);
  }

  GetAllAcdYears():Observable<any>
  {
    return this.httpHelper.HttpGet(`AcdYear`);
  }

  GetMainCourses():Observable<any>
  {
    return this.httpHelper.HttpGet(`MainCourse/Org/`);
  }

  AddMainCourse(dto:MainCourseDTO):Observable<any>
  {
    return this.httpHelper.HttpPost<any>('MainCourse',dto);
  }

GetSpecializations(MainCourseId:any):Observable<any>
{
  return this.httpHelper.HttpGet(`CourseSpecialization/MainCourse/${MainCourseId}`);
}

AddSpecializations(inp:CourseSpecializationDTO)
{
  return this.httpHelper.HttpPost('CourseSpecialization',inp);
}
GetCourseDetailsIdOnOtherColumns(inp:CourseDetailDTO ):Observable<any>
{
  console.log(inp);
  return this.httpHelper.HttpPost('CourseDetail/Extract',inp);
  
}

GetStudentYearStreamMapsOnCourseId(CourseStreamId:any):Observable<any>
{
  return this.httpHelper.HttpGet(`StudentYearStreamMap/ByCouseId/${CourseStreamId}`)
}

AddNewFee(inp:FeeMasterDTO):Observable<any>
{
return this.httpHelper.HttpPost('FeeMaster',inp);
}

UploadBulkStudentData(inpData:BulkStudentInfoDTO):Observable<HttpEvent<any>>
  {
    let hdr:HttpHeaders= new HttpHeaders().append("contentType","file");
    var frmData:FormData=new FormData();
    frmData.append('StreamId',inpData.StreamId);
    frmData.append('AcdYearId',inpData.AcdYearId);
    if(inpData.inpFile!=null)
    {      
      frmData.append('inpFile',inpData.inpFile);      
    }
    return this.httpHelper.HttpRequest(frmData,'POST','Student/Bulk',hdr);
 }

 GetStudentChllans(MapId:any):Observable<any>
 {
  return this.httpHelper.HttpGet(`Chelan/list/${MapId}`);

 }

 GetChallanDetails(ChlnId:any):Observable<any>
 {
  return this.httpHelper.HttpGet(`Chelan/Details/${ChlnId}`);
 }

 GetAllSubjects():Observable<any>
 {
  return this.httpHelper.HttpGet('Subject');
 }
AddSubject(inp:SubjectDTO):Observable<any>
{
  return this.httpHelper.HttpPost('Subject',inp);
}
 
 AddStreamSubjectMaps(dto:NewStreamSubjectMapsDTO):Observable<any>
 {
  return this.httpHelper.HttpPost('StreamSubjectMap',dto);
 }

GetExistingStreamSubjectMaps(streamId:any):Observable<any>
{
  return this.httpHelper.HttpGet(`StreamSubjectMap/ByStream/${streamId}`);
}

UploadBulkQuestionData(inpData:BulkQuestionUploadDTO):Observable<HttpEvent<any>>
  {
    let hdr:HttpHeaders= new HttpHeaders().append("contentType","file");
    var frmData:FormData=new FormData();
    frmData.append('TopicId',inpData.TopicId);    
    if(inpData.inpFile!=null)
    {      
      frmData.append('inpFile',inpData.inpFile);      
    }
    return this.httpHelper.HttpRequest(frmData,'POST','Question/BulkUpload',hdr);
 }
GetExamTypes(MainCourseId:any):Observable<any>
{
  return this.httpHelper.HttpGet(`ExamType/ByCourseId/${MainCourseId}`);
}

AddExamType(inp:ExamTypeDTO):Observable<any>
{
  return this.httpHelper.HttpPost('ExamType',inp);
}

GetExams(CourseDetId:any):Observable<any>
{
  return this.httpHelper.HttpGet(`Exam/ByCourse/${CourseDetId}`);
}
AddExam(inp:ExamDTO):Observable<any>
{
  return this.httpHelper.HttpPost('Exam',inp);
}
GetExam(examId:any):Observable<any>
{
  return this.httpHelper.HttpGet(`Exam/${examId}`);
}

ScheduleExams(inpData:NewExamScheduleRequestDTO):Observable<any>
{
  console.log(inpData);

  const options = {
    /**
     * include array indices in FormData keys
     * defaults to false
     */
    indices: false,
  
    /**
     * treat null values like undefined values and ignore them
     * defaults to false
     */
    nullsAsUndefineds: false,
  
    /**
     * convert true or false to 1 or 0 respectively
     * defaults to false
     */
    booleansAsIntegers: false,
  };
  let hdr:HttpHeaders= new HttpHeaders().append("contentType","file");
    //var frmData:FormData=serialize(inpData,options);
    var frmData:FormData=new FormData();
    frmData.append('ExamId',inpData.ExamId); 
    var indx=0;
    for(var rec of inpData.SubjectExamSchedules)
    {
      console.log("Adding sub item");
      frmData.append(`SubjectExamSchedules[${indx}].ExamDate`, rec.ExamDate.toString());
      frmData.append(`SubjectExamSchedules[${indx}].ExamTime`, rec.ExamTime.toString());
      frmData.append(`SubjectExamSchedules[${indx}].ExamOrderNo`, rec.ExamOrderNo.toString());
      frmData.append(`SubjectExamSchedules[${indx}].StreamSubjectMapId`, rec.StreamSubjectMapId.toString());
      frmData.append(`SubjectExamSchedules[${indx}].Notes`, rec.Notes.toString());
      frmData.append(`SubjectExamSchedules[${indx}].ExamPaperFile`, rec.ExamPaperFile);
      ++indx;
    }
      
     return this.httpHelper.HttpRequest(frmData,"POST",'ExamSchedule',hdr)
    //return this.httpHelper.HttpRequest(frmData,'POST','ExamSchedule',hdr);
}

GetExamSchedule(examId:any):Observable<any>
{
  return this.httpHelper.HttpGet(`ExamSchedule/ByExamId/${examId}`);
}

GetExamQuestionPaper(schId:any):Observable<any>
{
  return this.httpHelper.HttpGet(`ExamSchedule/File/${schId}`);
}

DeleteExamScheduleEntry(schId:any):Observable<any>
{
  return this.httpHelper.HttpDelete(`ExamSchedule/${schId}`);
}

MapExamToStudents(inp:NewStudentExamScheduleMapRequestDTO):Observable<any>
{
  return this.httpHelper.HttpPost('StudentExamSchedule',inp);
}
GetAllFeaturesByModule(ModuleID:any):Observable<any>
{
  return this.httpHelper.HttpGet(`ModuleFeature/Module/${ModuleID}`);
}

GetOrganizationById(OrgId:any):Observable<any>
{
   return this.httpHelper.HttpGet(`Organization/${OrgId}`);
}

GetAllOrganizations():Observable<any>
{
   return this.httpHelper.HttpGet(`Organization`);
}

GetAllFeaturesByOrganization(OrgId:any):Observable<any>
{
  return this.httpHelper.HttpGet(`OrgnizationFeatureSubscription/${OrgId}`);
}

AddFeaturesToOrganization(featureDtoArray:OrgnizationFeatureSubscriptionDTO[]):Observable<any>
{
  return this.httpHelper.HttpPost(`OrgnizationFeatureSubscription`,featureDtoArray);
}

RemoveFeatureFromOrganization(strDta:string):Observable<any>
{
  return this.httpHelper.HttpDelete("OrgnizationFeatureSubscription/"+strDta);
}

AddOrganizationAdmin(dto:UserInfoDTO):Observable<any>
{
  return this.httpHelper.HttpPost("UserInfo",dto);
}

GenerateClassChalans(dto:GenerateClassChalansDTO):Observable<any>
{
return this.httpHelper.HttpPost("Chelan",dto);
}

GetAllApplicationModules():Observable<any>
{
  return this.httpHelper.HttpGet("ApplicationModule");
}
AddNewOrganization(dto:OrganizationDTO):Observable<any>
{
  return this.httpHelper.HttpPost("Organization",dto);
}

  /*GetCertificateById(id:any):Observable<CertificateDTO>
  {
    return this.httpHelper.HttpGet<CertificateDTO>(`Certificate/${id}`,undefined,undefined);
  }
  GetTopCerificateList(num:number)
  {
    return this.httpHelper.HttpGet<CertificateDTO[]>(`Certificate/TOPRECS/${num}`,undefined,undefined);
  }
  
  GetCertList():Observable<CertificateDTO[]>
  {
    //let hdr:HttpHeaders= new HttpHeaders().append("Authorization","Bearer "+this.accessToken);
   return this.httpHelper.HttpGet<CertificateDTO[]>("Certificate",undefined,undefined);
  }

  GetCertListByCategory(catgId:string):Observable<CertificateDTO[]>
  {
    //let hdr:HttpHeaders= new HttpHeaders().append("Authorization","Bearer "+this.accessToken);
   return this.httpHelper.HttpGet<CertificateDTO[]>(`Certificate/CATGR/${catgId}`,undefined,undefined);
  }

  DeleteCert(certId:string):Observable<any>
  {
    return this.httpHelper.HttpDelete(`Certificate/${certId}`);
  }

  AddCertficate(inpCert:CertificateDTO):Observable<HttpEvent<any>>
  {
    //this.accessToken=localStorage.getItem("AuthToken");
    //let body:any={name:inpCat.name,description:inpCat.description,ordinalNumber:inpCat.ordinalNumber};
    let hdr:HttpHeaders= new HttpHeaders().append("contentType","file");
    //console.log(this.accessToken);
    //return this.httpHelper.HttpPost<string>("Category",body,hdr);
    var frmData:FormData=new FormData();
    frmData.append('certTitle',inpCert.certTitle);
    frmData.append('certOrg',inpCert.certOrg);
    frmData.append('certDetails',inpCert.certDetails);
    frmData.append('certCatId',inpCert.certCatId);
    frmData.append('certDate',inpCert.certDate);


    if(inpCert.certPic!=null)
    {
      console.log(inpCert.certPic)
      frmData.append('certPic',inpCert.certPic);      
    }
    return this.httpHelper.HttpRequest(frmData,'POST','Certificate',hdr);
 }

  GetCertCategoryList():Observable<CertCategory[]>
  {
    //let hdr:HttpHeaders= new HttpHeaders().append("Authorization","Bearer "+this.accessToken);
   return this.httpHelper.HttpGet<CertCategory[]>("CertCategory",undefined,undefined);
  }

  DeleteCertCategory(certCatgId:string):Observable<any>
  {
    return this.httpHelper.HttpDelete(`CertCategory/${certCatgId}`);
  }



  AddCertCategory(inpCat:CertCategory):Observable<HttpEvent<any>>
  {    
    var frmData:FormData=new FormData();
    frmData.append('certCatName',inpCat.certCatName);    
    frmData.append('ordinalNumber',inpCat.ordinalNumber.toString());    
    return this.httpHelper.HttpRequest(frmData,'POST','CertCategory',undefined);
  }

  GetBlogCategoryList():Observable<BlogCategoryItem[]>
  {
    //let hdr:HttpHeaders= new HttpHeaders().append("Authorization","Bearer "+this.accessToken);
   return this.httpHelper.HttpGet<BlogCategoryItem[]>("Category",undefined,undefined);
  }

  DeleteBlogCategory(catgId:string):Observable<any>
  {
    return this.httpHelper.HttpDelete(`Category/${catgId}`);
  }
  GetPostList(catgId:string):Observable<PostDTO[]>
  {
    
    return this.httpHelper.HttpGet<PostDTO[]>(`Post/CATGR/${catgId}`);
  }
  GetLatestPostList(numRec:number):Observable<PostDTO[]>
  {    
    return this.httpHelper.HttpGet<PostDTO[]>(`Post/TOPRECS/${numRec}`);
  }
  AddBlogCategory(inpCat:CategoryDTO):Observable<HttpEvent<any>>
  {
    //this.accessToken=localStorage.getItem("AuthToken");
    //let body:any={name:inpCat.name,description:inpCat.description,ordinalNumber:inpCat.ordinalNumber};
    let hdr:HttpHeaders= new HttpHeaders().append("contentType","file");
    //console.log(this.accessToken);
    //return this.httpHelper.HttpPost<string>("Category",body,hdr);
    var frmData:FormData=new FormData();
    frmData.append('name',inpCat.name);
    frmData.append('description',inpCat.description);
    frmData.append('ordinalNumber',inpCat.ordinalNumber.toString());
    if(inpCat.catgIconPicFile!=null)
    {
      console.log(inpCat.catgIconPicFile)
      frmData.append('catgIconPicFile',inpCat.catgIconPicFile);      
    }
    return this.httpHelper.HttpRequest(frmData,'POST','Category',hdr);
  }

  AddBlogPost(inpPost:PostDTO)
  {
    let hdr:HttpHeaders= new HttpHeaders().append("contentType","file");
    var frmData:FormData=new FormData();
    frmData.append('title',inpPost.title);
    frmData.append('postText',inpPost.postText);
    frmData.append('catgId',inpPost.catgId);
    frmData.append('postedDate',inpPost.postedDate);
    frmData.append('postedBy',inpPost.postedBy);
    //frmData.append('postStatus',"1");
    
    if(inpPost.postPicFile!=null)
    {      
      frmData.append('postPicFile',inpPost.postPicFile);      
    }
    return this.httpHelper.HttpRequest(frmData,'POST','Post',hdr);
  }

  GetBlogPost(postId:string):Observable<PostDTO>{
    //let prms:HttpParams=new HttpParams().append("id",postId);
    return this.httpHelper.HttpGet<PostDTO>(`Post\\${postId}`);
  }

  GetImage(identifier:string,ctrlName:string):Observable<any>
  {
    return this.httpHelper.HttpGet<any>(`${ctrlName}/Image/${identifier}`);
  }
  AddUser(userDto:UserInfoDTO):Observable<any>
  {
    return this.httpHelper.HttpPost("Account",userDto);
  }

  GetUsersList():Observable<UserInfoDTO[]>
  {    
    return this.httpHelper.HttpGet<UserInfoDTO[]>(`UserInfo`);
  }

  
  UpdateUser(inp:UserInfoDTO):Observable<any>{
    return this.httpHelper.HttpPut('UserInfo',inp);
  }

  GetUserInfo(userId:string):Observable<UserInfoDTO>
  {    
    return this.httpHelper.HttpGet<UserInfoDTO>(`UserInfo/${userId}`);
  }

  AddPostComment(cmtObj:PostCommentItemDTO):Observable<any>
  {
    return this.httpHelper.HttpPost<PostCommentItemDTO>("PostComment",cmtObj);
  }

  GetAllComments(postId:string):Observable<PostCommentItemDTO[]>
  {
    return this.httpHelper.HttpGet<PostCommentItemDTO[]>(`PostComment\\${postId}`);
  }
  

  //Photo Gallery API Calls
  AddGalleryImage(inpGalItem:GalleryItemDTO)
  {
    let hdr:HttpHeaders= new HttpHeaders().append("contentType","file");
    var frmData:FormData=new FormData();
    frmData.append('addedDateTime',inpGalItem.addedDateTime);
    frmData.append('itemDescriptionText',inpGalItem.itemDescriptionText);
    frmData.append('postedBy',inpGalItem.postedBy);
   
    
    if(inpGalItem.itemPicFile!=null)
    {      
      frmData.append('itemPicFile',inpGalItem.itemPicFile);      
    }
    return this.httpHelper.HttpRequest(frmData,'POST','PhotoGallery',hdr);
  }

  GetGalleryItemList(StartNum:number,RecCount:number,Dir:number):Observable<GalleryItemDTO[]>
  {    
    return this.httpHelper.HttpGet<GalleryItemDTO[]>(`PhotoGallery/${StartNum}/${RecCount}/${Dir}`);
  }
  //End Of Photo Gallery API Calls

  IsInRole(reqRole:string):boolean{
     var Auth=localStorage.getItem('Auth');
     var token=localStorage.getItem("AuthToken");
     if(Auth!=undefined && token!=undefined)
     {
      var obj=this.DecodeJWT(token);
      return reqRole==obj[this.JWT_ROLE_KEY];
     }
     else
     return false;      
  }

  IsAuthenticated():boolean{
    var Auth=localStorage.getItem('Auth');
    return Auth!=undefined;
  }

  LogOffUser()
  {
    localStorage.removeItem('Auth');
    localStorage.removeItem('AuthToken');
  }

  private DecodeJWT(inp:string):any
  {
    var JwtPayload=jwtDecode(inp);
    //console.log(JwtPayload);
    return JwtPayload;
  }

  GetLoggedInUserId():string|null
  {
    return localStorage.getItem("UserId");
  }

  GetTodayString():string
  {
    var today  = new Date();

      var todayString=`${today.getDate()}/${today.getMonth()+1}/${today.getFullYear()}`;//`${today.getMonth()+1}/${today.getDate()}/${today.getFullYear()}`;//today.toLocaleDateString("en-US");
      return todayString;
    }
*/

}
