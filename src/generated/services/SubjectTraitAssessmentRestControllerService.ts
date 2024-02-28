/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ClassArmSubjectTraitAssessmentResponse } from "../models/ClassArmSubjectTraitAssessmentResponse";
import type { ClassLevelSubjectTraitsResponse } from "../models/ClassLevelSubjectTraitsResponse";
import type { SubjectTraitAssessmentCommentsRequest } from "../models/SubjectTraitAssessmentCommentsRequest";
import type { SubjectTraitAssessmentRequest } from "../models/SubjectTraitAssessmentRequest";
import type { SubjectTraitAssessmentResponse } from "../models/SubjectTraitAssessmentResponse";

import type { CancelablePromise } from "../core/CancelablePromise";
import { OpenAPI } from "../core/OpenAPI";
import { request as __request } from "../core/request";

export class SubjectTraitAssessmentRestControllerService {
  /**
   * saveSubjectTraitAssessments
   * @returns any OK
   * @throws ApiError
   */
  public static saveSubjectTraitAssessmentsUsingPost({
    request,
    termId,
  }: {
    /**
     * request
     */
    request: SubjectTraitAssessmentRequest;
    /**
     * termId
     */
    termId: string;
  }): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/subject-trait-assessments",
      query: {
        termId: termId,
      },
      body: request,
      errors: {
        401: `Unauthorized`,
        403: `Forbidden`,
        404: `Not Found`,
      },
    });
  }

  /**
   * getClassLevelSubjectTraits
   * @returns ClassLevelSubjectTraitsResponse OK
   * @throws ApiError
   */
  public static getClassLevelSubjectTraitsUsingGet({
    classLevelId,
    termId,
    subjectId,
  }: {
    /**
     * classLevelId
     */
    classLevelId: string;
    /**
     * termId
     */
    termId: string;
    /**
     * subjectId
     */
    subjectId?: string;
  }): CancelablePromise<ClassLevelSubjectTraitsResponse> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/subject-trait-assessments/class/{classLevelId}",
      path: {
        classLevelId: classLevelId,
      },
      query: {
        subjectId: subjectId,
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
   * getAllSavedClassLevelSubjectTraits
   * @returns ClassArmSubjectTraitAssessmentResponse OK
   * @throws ApiError
   */
  public static getAllSavedClassLevelSubjectTraitsUsingGet({
    armId,
    classLevelId,
    termId,
  }: {
    /**
     * armId
     */
    armId: string;
    /**
     * classLevelId
     */
    classLevelId: string;
    /**
     * termId
     */
    termId: string;
  }): CancelablePromise<ClassArmSubjectTraitAssessmentResponse> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/subject-trait-assessments/class/{classLevelId}/arm/{armId}",
      path: {
        armId: armId,
        classLevelId: classLevelId,
      },
      query: {
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
   * getSavedClassLevelSubjectTraits
   * @returns SubjectTraitAssessmentResponse OK
   * @throws ApiError
   */
  public static getSavedClassLevelSubjectTraitsUsingGet({
    armId,
    classLevelId,
    subjectId,
    termId,
  }: {
    /**
     * armId
     */
    armId: string;
    /**
     * classLevelId
     */
    classLevelId: string;
    /**
     * subjectId
     */
    subjectId: string;
    /**
     * termId
     */
    termId: string;
  }): CancelablePromise<Array<SubjectTraitAssessmentResponse>> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/subject-trait-assessments/class/{classLevelId}/arm/{armId}/subject/{subjectId}",
      path: {
        armId: armId,
        classLevelId: classLevelId,
        subjectId: subjectId,
      },
      query: {
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
   * saveSubjectTraitAssessmentComments
   * @returns any OK
   * @throws ApiError
   */
  public static saveSubjectTraitAssessmentCommentsUsingPost({
    request,
  }: {
    /**
     * request
     */
    request: SubjectTraitAssessmentCommentsRequest;
  }): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/subject-trait-assessments/comments",
      body: request,
      errors: {
        401: `Unauthorized`,
        403: `Forbidden`,
        404: `Not Found`,
      },
    });
  }

  /**
   * getSavedStudentSubjectTraits
   * @returns SubjectTraitAssessmentResponse OK
   * @throws ApiError
   */
  public static getSavedStudentSubjectTraitsUsingGet({
    studentId,
    subjectId,
    termId,
  }: {
    /**
     * studentId
     */
    studentId: string;
    /**
     * subjectId
     */
    subjectId: string;
    /**
     * termId
     */
    termId: string;
  }): CancelablePromise<Array<SubjectTraitAssessmentResponse>> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/subject-trait-assessments/subject/{subjectId}",
      path: {
        subjectId: subjectId,
      },
      query: {
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
}
