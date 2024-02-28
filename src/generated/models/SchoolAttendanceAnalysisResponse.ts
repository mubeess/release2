/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { AttendanceAnalysis } from "./AttendanceAnalysis";
import type { ClassLevelBreakdown } from "./ClassLevelBreakdown";

export type SchoolAttendanceAnalysisResponse = {
  attendance_analysis?: AttendanceAnalysis;
  class_level_breakdowns?: Array<ClassLevelBreakdown>;
  months_in_term?: Array<string>;
};
