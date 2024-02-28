/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { StudentLiteDto } from "./StudentLiteDto";
import type { SubjectTraitScoresAssessmentResponse } from "./SubjectTraitScoresAssessmentResponse";

export type StudentSubjectTraitAssessmentResponse = {
  form_teacher_comments?: string;
  principal_comments?: string;
  student?: StudentLiteDto;
  subject_scores?: Array<SubjectTraitScoresAssessmentResponse>;
};
