import type { ArmDto } from "./ArmDto";
import type { ClassLevelDto } from "./ClassLevelDto";
import type { LocalTimeRes } from "./LocalTimeRes";
import type { SubjectDto } from "./SubjectDto";

export type TimeTablePeriodDto = {
  arm?: ArmDto;
  break_period?: boolean;
  class_level?: ClassLevelDto;
  day_of_week?:
    | "FRIDAY"
    | "MONDAY"
    | "SATURDAY"
    | "SUNDAY"
    | "THURSDAY"
    | "TUESDAY"
    | "WEDNESDAY";
  end_time?: LocalTimeRes;
  id?: string;
  start_time?: LocalTimeRes;
  subject?: SubjectDto;
  time_table_id?: string;
};