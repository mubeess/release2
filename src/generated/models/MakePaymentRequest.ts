/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type MakePaymentRequest = {
  email?: string;
  payment_method:
    | "BANK_DEPOSIT"
    | "BANK_TRANSFER"
    | "CASH"
    | "FLUTTERWAVE"
    | "PAYSTACK"
    | "PESAPAL"
    | "POS"
    | "STRIPE";
  redirect_url?: string;
  subscription_plan_id: string;
  term_id: string;
};
