/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type StudentAttendanceRequest = {
  absence_reason?: string;
  afternoon_status?: "ABSENT" | "PRESENT";
  late?: boolean;
  morning_status?: "ABSENT" | "PRESENT";
  student_id?: string;
};
