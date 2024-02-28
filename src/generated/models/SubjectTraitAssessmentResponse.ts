/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { StudentLiteDto } from "./StudentLiteDto";
import type { SubjectTraitSkillRatingDefinitionDto } from "./SubjectTraitSkillRatingDefinitionDto";

export type SubjectTraitAssessmentResponse = {
  comments?: string;
  scores?: Array<SubjectTraitSkillRatingDefinitionDto>;
  student_dto?: StudentLiteDto;
  student_id?: string;
};
