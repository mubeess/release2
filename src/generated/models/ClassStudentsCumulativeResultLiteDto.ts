/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ClassInformation_ } from "./ClassInformation_";
import type { StudentCumulativeResultLiteDto } from "./StudentCumulativeResultLiteDto";
import type { SubjectDto0 } from "./SubjectDto0";
import type { Term_ } from "./Term_";

export type ClassStudentsCumulativeResultLiteDto = {
  class_information?: ClassInformation_;
  student_results?: Array<StudentCumulativeResultLiteDto>;
  subjects_offered?: Array<SubjectDto0>;
  term?: Term_;
};
