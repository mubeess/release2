/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type InitiatePaymentRequest = {
  amount: number;
  client_secret?: string;
  currency?: "EUR" | "GBP" | "GHC" | "KES" | "NGN" | "USD";
  email: string;
  parent_id?: string;
  payment_method:
    | "BANK_DEPOSIT"
    | "BANK_TRANSFER"
    | "CASH"
    | "FLUTTERWAVE"
    | "PAYSTACK"
    | "PESAPAL"
    | "POS"
    | "STRIPE";
  redirect_url: string;
  student_id: string;
  term_id: string;
};
