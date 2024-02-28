/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AssignClassEvaluatorRequest } from "../models/AssignClassEvaluatorRequest";
import type { ClassArmEvaluatorDto } from "../models/ClassArmEvaluatorDto";
import type { CreateEvaluatorRoleRequest } from "../models/CreateEvaluatorRoleRequest";
import type { EvaluatorRoleDto } from "../models/EvaluatorRoleDto";
import type { UpdateRoleEvaluatorRequest } from "../models/UpdateRoleEvaluatorRequest";

import type { CancelablePromise } from "../core/CancelablePromise";
import { OpenAPI } from "../core/OpenAPI";
import { request as __request } from "../core/request";

export class EvaluatorRoleRestControllerService {
  /**
   * createEvaluatorRole
   * @returns EvaluatorRoleDto OK
   * @returns any Created
   * @throws ApiError
   */
  public static createEvaluatorRoleUsingPost({
    roleRequest,
  }: {
    /**
     * roleRequest
     */
    roleRequest: CreateEvaluatorRoleRequest;
  }): CancelablePromise<EvaluatorRoleDto | any> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/evaluator-role",
      body: roleRequest,
      errors: {
        401: `Unauthorized`,
        403: `Forbidden`,
        404: `Not Found`,
      },
    });
  }

  /**
   * updateEvaluatorRole
   * @returns EvaluatorRoleDto OK
   * @returns any Created
   * @throws ApiError
   */
  public static updateEvaluatorRoleUsingPut({
    evaluatorRoleDto,
  }: {
    /**
     * evaluatorRoleDto
     */
    evaluatorRoleDto: EvaluatorRoleDto;
  }): CancelablePromise<EvaluatorRoleDto | any> {
    return __request(OpenAPI, {
      method: "PUT",
      url: "/evaluator-role",
      body: evaluatorRoleDto,
      errors: {
        401: `Unauthorized`,
        403: `Forbidden`,
        404: `Not Found`,
      },
    });
  }

  /**
   * getAllEvaluatorRoles
   * @returns EvaluatorRoleDto OK
   * @throws ApiError
   */
  public static getAllEvaluatorRolesUsingGet(): CancelablePromise<
    Array<EvaluatorRoleDto>
  > {
    return __request(OpenAPI, {
      method: "GET",
      url: "/evaluator-role/all",
      errors: {
        401: `Unauthorized`,
        403: `Forbidden`,
        404: `Not Found`,
      },
    });
  }

  /**
   * assignEvaluatorRolesToClassArm
   * @returns ClassArmEvaluatorDto OK
   * @returns any Created
   * @throws ApiError
   */
  public static assignEvaluatorRolesToClassArmUsingPost({
    requests,
  }: {
    /**
     * requests
     */
    requests: Array<AssignClassEvaluatorRequest>;
  }): CancelablePromise<Array<ClassArmEvaluatorDto> | any> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/evaluator-role/assign",
      body: requests,
      errors: {
        401: `Unauthorized`,
        403: `Forbidden`,
        404: `Not Found`,
      },
    });
  }

  /**
   * getClassArmEvaluators
   * @returns ClassArmEvaluatorDto OK
   * @throws ApiError
   */
  public static getClassArmEvaluatorsUsingGet({
    armId,
    classLevelId,
    termId,
  }: {
    armId: string;
    classLevelId: string;
    termId: string;
  }): CancelablePromise<Array<ClassArmEvaluatorDto>> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/evaluator-role/class",
      query: {
        armId: armId,
        classLevelId: classLevelId,
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
   * deleteEvaluatorRoleFromClassArm
   * @returns any OK
   * @throws ApiError
   */
  public static deleteEvaluatorRoleFromClassArmUsingDelete({
    armId,
    classLevelId,
    evaluatorRoleId,
    staffId,
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
     * evaluatorRoleId
     */
    evaluatorRoleId: string;
    /**
     * staffId
     */
    staffId: string;
    /**
     * termId
     */
    termId: string;
  }): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: "DELETE",
      url: "/evaluator-role/delete",
      query: {
        armId: armId,
        classLevelId: classLevelId,
        evaluatorRoleId: evaluatorRoleId,
        staffId: staffId,
        termId: termId,
      },
      errors: {
        401: `Unauthorized`,
        403: `Forbidden`,
      },
    });
  }

  /**
   * getStaffEvaluatorRoles
   * @returns ClassArmEvaluatorDto OK
   * @throws ApiError
   */
  public static getStaffEvaluatorRolesUsingGet({
    id,
  }: {
    /**
     * id
     */
    id: string;
  }): CancelablePromise<Array<ClassArmEvaluatorDto>> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/evaluator-role/staff/{id}",
      path: {
        id: id,
      },
      errors: {
        401: `Unauthorized`,
        403: `Forbidden`,
        404: `Not Found`,
      },
    });
  }

  /**
   * toggleUsesEvaluatorRole
   * @returns any OK
   * @throws ApiError
   */
  public static toggleUsesEvaluatorRoleUsingPut(): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: "PUT",
      url: "/evaluator-role/toggle",
      errors: {
        401: `Unauthorized`,
        403: `Forbidden`,
        404: `Not Found`,
      },
    });
  }

  /**
   * updateClassEvaluator
   * @returns ClassArmEvaluatorDto OK
   * @returns any Created
   * @throws ApiError
   */
  public static updateClassEvaluatorUsingPut({
    request,
  }: {
    /**
     * request
     */
    request: UpdateRoleEvaluatorRequest;
  }): CancelablePromise<ClassArmEvaluatorDto | any> {
    return __request(OpenAPI, {
      method: "PUT",
      url: "/evaluator-role/update",
      body: request,
      errors: {
        401: `Unauthorized`,
        403: `Forbidden`,
        404: `Not Found`,
      },
    });
  }

  /**
   * getEvaluatorRole
   * @returns EvaluatorRoleDto OK
   * @throws ApiError
   */
  public static getEvaluatorRoleUsingGet({
    id,
  }: {
    /**
     * id
     */
    id: string;
  }): CancelablePromise<EvaluatorRoleDto> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/evaluator-role/{id}",
      path: {
        id: id,
      },
      errors: {
        401: `Unauthorized`,
        403: `Forbidden`,
        404: `Not Found`,
      },
    });
  }

  /**
   * deleteVocationalRole
   * @returns any OK
   * @throws ApiError
   */
  public static deleteVocationalRoleUsingDelete({
    id,
  }: {
    /**
     * id
     */
    id: string;
  }): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: "DELETE",
      url: "/evaluator-role/{id}",
      path: {
        id: id,
      },
      errors: {
        401: `Unauthorized`,
        403: `Forbidden`,
      },
    });
  }
}
