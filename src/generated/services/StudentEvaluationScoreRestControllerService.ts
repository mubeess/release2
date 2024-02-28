/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { EvaluationScoreRequest } from "../models/EvaluationScoreRequest";
import type { StudentEvaluationScoreResponse } from "../models/StudentEvaluationScoreResponse";

import type { CancelablePromise } from "../core/CancelablePromise";
import { OpenAPI } from "../core/OpenAPI";
import { request as __request } from "../core/request";

export class StudentEvaluationScoreRestControllerService {
  /**
   * getEvaluationScores
   * @returns StudentEvaluationScoreResponse OK
   * @throws ApiError
   */
  public static getEvaluationScoresUsingGet({
    armId,
    classLevelId,
    subjectId,
    termId,
  }: {
    /**
     * arm-id
     */
    armId: string;
    /**
     * class-level-id
     */
    classLevelId: string;
    /**
     * subject-id
     */
    subjectId: string;
    /**
     * term-id
     */
    termId: string;
  }): CancelablePromise<Array<StudentEvaluationScoreResponse>> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/student/evaluation",
      query: {
        "arm-id": armId,
        "class-level-id": classLevelId,
        "subject-id": subjectId,
        "term-id": termId,
      },
      errors: {
        401: `Unauthorized`,
        403: `Forbidden`,
        404: `Not Found`,
      },
    });
  }

  /**
   * createEvaluationScores
   * @returns StudentEvaluationScoreResponse OK
   * @returns any Created
   * @throws ApiError
   */
  public static createEvaluationScoresUsingPost({
    requests,
  }: {
    /**
     * requests
     */
    requests: Array<EvaluationScoreRequest>;
  }): CancelablePromise<Array<StudentEvaluationScoreResponse> | any> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/student/evaluation",
      body: requests,
      errors: {
        401: `Unauthorized`,
        403: `Forbidden`,
        404: `Not Found`,
      },
    });
  }
}
