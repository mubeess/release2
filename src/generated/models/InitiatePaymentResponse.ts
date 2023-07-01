/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { JsonData } from "./JsonData";

export type InitiatePaymentResponse = {
  data?: JsonData;
  message?: string;
  redirect_url?: string;
  status?: string;
};
