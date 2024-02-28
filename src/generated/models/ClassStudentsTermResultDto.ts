/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ClassInformation_ } from "./ClassInformation_";
import type { ReportTemplateDto } from "./ReportTemplateDto";
import type { StudentTermResultDto } from "./StudentTermResultDto";
import type { SubjectDto0 } from "./SubjectDto0";
import type { SubjectTraitAssessmentResponse } from "./SubjectTraitAssessmentResponse";
import type { Term_ } from "./Term_";

export type ClassStudentsTermResultDto = {
  class_information?: ClassInformation_;
  report_templates?: Array<ReportTemplateDto>;
  student_results?: Array<StudentTermResultDto>;
  student_subject_traits?: Array<SubjectTraitAssessmentResponse>;
  subjects_offered?: Array<SubjectDto0>;
  term?: Term_;
};
