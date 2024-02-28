/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { EvaluatorRoleDto } from "./EvaluatorRoleDto";
import type { SkillDto } from "./SkillDto";
import type { SkillRatingDefinitionDto } from "./SkillRatingDefinitionDto";
import type { StudentLiteDto } from "./StudentLiteDto";
import type { TermLiteDto } from "./TermLiteDto";

export type EvaluatorStudentSkillAssessmentDto = {
  assessment_date?: string;
  assessor_id?: string;
  evaluator_role_dto?: EvaluatorRoleDto;
  skill?: SkillDto;
  skill_rating_definition?: SkillRatingDefinitionDto;
  student?: StudentLiteDto;
  term?: TermLiteDto;
};
