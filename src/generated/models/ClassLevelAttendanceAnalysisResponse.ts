/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ArmBreakdown } from "./ArmBreakdown";
import type { AttendanceAnalysis } from "./AttendanceAnalysis";

export type ClassLevelAttendanceAnalysisResponse = {
  arm_breakdowns?: Array<ArmBreakdown>;
  attendance_analysis?: AttendanceAnalysis;
  months_in_term?: Array<string>;
};
