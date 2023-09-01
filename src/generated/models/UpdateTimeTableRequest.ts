import type { TimeTablePeriodRequest } from "./TimeTablePeriodRequest";
import { UpdateTimeTablePeriodRequest } from "./UpdateTimeTablePeriodRequest";

export type UpdateTimeTableRequest = {
  periods_to_add: Record<string, Array<TimeTablePeriodRequest>>;
  periods_to_delete: Array<string>;
  periods_to_update: Array<UpdateTimeTablePeriodRequest>;
  term_id: string;
};
