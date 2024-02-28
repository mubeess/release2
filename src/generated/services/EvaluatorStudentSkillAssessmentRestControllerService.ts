/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { EvaluatorStudentSkillAssessmentDto } from "../models/EvaluatorStudentSkillAssessmentDto";
import type { EvaluatorStudentSkillAssessmentRequest } from "../models/EvaluatorStudentSkillAssessmentRequest";

import type { CancelablePromise } from "../core/CancelablePromise";
import { OpenAPI } from "../core/OpenAPI";
import { request as __request } from "../core/request";

export class EvaluatorStudentSkillAssessmentRestControllerService {
  /**
   * getSkillAssessments
   * @returns EvaluatorStudentSkillAssessmentDto OK
   * @throws ApiError
   */
  public static getSkillAssessmentsUsingGet({
    evaluatorRoleId,
    studentId,
    termId,
    skillGroupId,
  }: {
    evaluatorRoleId: string;
    studentId: string;
    termId: string;
    skillGroupId?: string;
  }): CancelablePromise<Array<EvaluatorStudentSkillAssessmentDto>> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/evaluator-skill-assessment",
      query: {
        evaluatorRoleId: evaluatorRoleId,
        skillGroupId: skillGroupId,
        studentId: studentId,
        termId: termId,
      },
      errors: {
        401: `Unauthorized`,
        403: `Forbidden`,
        404: `Not Found`,
      },
    });
  }

  /**
   * saveSkillAssessments
   * @returns EvaluatorStudentSkillAssessmentDto OK
   * @returns any Created
   * @throws ApiError
   */
  public static saveSkillAssessmentsUsingPost({
    request,
  }: {
    /**
     * request
     */
    request: EvaluatorStudentSkillAssessmentRequest;
  }): CancelablePromise<Array<EvaluatorStudentSkillAssessmentDto> | any> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/evaluator-skill-assessment",
      body: request,
      errors: {
        401: `Unauthorized`,
        403: `Forbidden`,
        404: `Not Found`,
      },
    });
  }
}
