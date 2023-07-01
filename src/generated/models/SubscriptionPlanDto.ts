/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type SubscriptionPlanDto = {
  amount: number;
  features?: Array<
    | "ATTENDANCE_REPORT_AND_ANALYSIS"
    | "BEHAVIOUR_ASSESSMENT"
    | "CBT_EXAMS"
    | "CLASS_ATTENDANCE"
    | "COMMUNICATION_BOOK"
    | "CONFIGURATION_REMINDERS"
    | "EVENT_REMINDERS"
    | "FEES_INVOICE_CONFIGURATION"
    | "INSTANT_MESSAGING"
    | "LESSONS_TRACKING"
    | "LESSON_ASSISTED_DELIVERY"
    | "LESSON_PLANING"
    | "PARENT_INVOICE_CONFIGURATION"
    | "PARENT_PORTAL_ACCESS"
    | "QUESTION_BANK"
    | "QUIZZES_AND_ASSIGNMENTS"
    | "SCHEDULED_MESSAGING"
    | "SCHOOL_FEES_PAYMENT"
    | "SCHOOL_FEES_PAYMENT_ANALYSIS"
    | "STUDENT_ENROLLMENT"
    | "STUDENT_PERFORMANCE_ANALYSIS"
    | "STUDENT_PROGRESS_REPORT"
    | "SUBJECT_ATTENDANCE"
    | "TEACHERS_ENROLLMENT"
  >;
  id?: string;
  max_student_count: number;
  name: string;
};
