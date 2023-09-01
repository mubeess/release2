import type { LocalTimeReq } from "./LocalTimeReq";

export type TimeTablePeriodRequest = {
  arm_id?: string;
  class_level_id?: string;
  end_time: LocalTimeReq;
  is_break_period: boolean;
  start_time: LocalTimeReq;
  subject_id?: string;
};
