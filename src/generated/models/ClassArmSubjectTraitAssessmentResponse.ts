/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ClassInformationDto } from "./ClassInformationDto";
import type { StudentSubjectTraitAssessmentResponse } from "./StudentSubjectTraitAssessmentResponse";

export type ClassArmSubjectTraitAssessmentResponse = {
  assessments?: Array<StudentSubjectTraitAssessmentResponse>;
  class_information?: ClassInformationDto;
};
