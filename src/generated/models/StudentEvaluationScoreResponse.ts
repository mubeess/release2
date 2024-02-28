/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ArmDto } from "./ArmDto";
import type { ClassLevelLiteDto } from "./ClassLevelLiteDto";
import type { EvaluationItemDto } from "./EvaluationItemDto";
import type { StaffLiteDto } from "./StaffLiteDto";
import type { StudentLiteDto } from "./StudentLiteDto";
import type { SubjectDto } from "./SubjectDto";
import type { TermLiteDto } from "./TermLiteDto";

export type StudentEvaluationScoreResponse = {
  arm?: ArmDto;
  class_level?: ClassLevelLiteDto;
  evaluation_scores?: Array<EvaluationItemDto>;
  evaluator?: StaffLiteDto;
  student?: StudentLiteDto;
  subject?: SubjectDto;
  term?: TermLiteDto;
};
