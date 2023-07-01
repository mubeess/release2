/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ExamDto } from "./ExamDto";
import type { Pageable } from "./Pageable";
import type { Sort } from "./Sort";

export type Page_ExamDto_ = {
  content?: Array<ExamDto>;
  empty?: boolean;
  first?: boolean;
  last?: boolean;
  number?: number;
  number_of_elements?: number;
  pageable?: Pageable;
  size?: number;
  sort?: Sort;
  total_elements?: number;
  total_pages?: number;
};
