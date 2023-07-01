/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { GradeGroup } from "./GradeGroup";

export type GradeEntity = {
  colour?: string;
  deleted: boolean;
  end_range: number;
  grade_group?: GradeGroup;
  id: string;
  letter_grade?: string;
  points?: number;
  principal_auto_comments?: string;
  remark?: string;
  start_range: number;
  teacher_auto_comments?: string;
};
