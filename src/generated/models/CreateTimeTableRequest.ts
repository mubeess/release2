import type { TimeTablePeriodRequest } from "./TimeTablePeriodRequest";

export type CreateTimeTableRequest = {
  schedule: Record<string, Array<TimeTablePeriodRequest>>;
  term_id: string;
};
