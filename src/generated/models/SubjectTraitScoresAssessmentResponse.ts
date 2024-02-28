/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { SubjectDto } from "./SubjectDto";
import type { SubjectTraitScoreResponse } from "./SubjectTraitScoreResponse";

export type SubjectTraitScoresAssessmentResponse = {
  comments?: string;
  scores?: Array<SubjectTraitScoreResponse>;
  subject?: SubjectDto;
};
