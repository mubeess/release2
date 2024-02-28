/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { SkillRatingDto } from "./SkillRatingDto";
import type { SubjectTraitResponse } from "./SubjectTraitResponse";

export type SubjectTraitScoreResponse = {
  color?: string;
  rating?: string;
  rating_order?: number;
  remark?: string;
  skill_rating?: SkillRatingDto;
  subject_trait?: SubjectTraitResponse;
};
