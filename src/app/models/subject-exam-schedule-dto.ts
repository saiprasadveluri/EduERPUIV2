import { Time } from "@angular/common"

export interface SubjectExamScheduleDTO {
                ExamDate:Date,
        
                ExamTime:Time,
        
                ExamOrderNo:number,

                ExamPaperFile?:any,
       
                StreamSubjectMapId:any,

                Notes:any
}
