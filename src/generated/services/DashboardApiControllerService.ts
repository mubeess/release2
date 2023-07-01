/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BasicSchoolInformationDto } from "../models/BasicSchoolInformationDto";
import type { ContactResponse } from "../models/ContactResponse";
import type { UserContactsRequest } from "../models/UserContactsRequest";
import type { UserResponse } from "../models/UserResponse";
import type { UsersByTypeRequest } from "../models/UsersByTypeRequest";
import type { UsersByUMSIdsRequest } from "../models/UsersByUMSIdsRequest";

import type { CancelablePromise } from "../core/CancelablePromise";
import { OpenAPI } from "../core/OpenAPI";
import { request as __request } from "../core/request";

export class DashboardApiControllerService {
  /**
   * userContacts
   * @returns ContactResponse OK
   * @returns any Created
   * @throws ApiError
   */
  public static userContactsUsingPost({
    request,
  }: {
    /**
     * request
     */
    request: UserContactsRequest;
  }): CancelablePromise<Array<ContactResponse> | any> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/dashboard/contacts",
      body: request,
      errors: {
        401: `Unauthorized`,
        403: `Forbidden`,
        404: `Not Found`,
      },
    });
  }

  /**
   * schools
   * @returns BasicSchoolInformationDto OK
   * @throws ApiError
   */
  public static schoolsUsingGet(): CancelablePromise<
    Array<BasicSchoolInformationDto>
  > {
    return __request(OpenAPI, {
      method: "GET",
      url: "/dashboard/schools",
      errors: {
        401: `Unauthorized`,
        403: `Forbidden`,
        404: `Not Found`,
      },
    });
  }

  /**
   * users
   * @returns UserResponse OK
   * @returns any Created
   * @throws ApiError
   */
  public static usersUsingPost({
    request,
  }: {
    /**
     * request
     */
    request: UsersByUMSIdsRequest;
  }): CancelablePromise<Array<UserResponse> | any> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/dashboard/users",
      body: request,
      errors: {
        401: `Unauthorized`,
        403: `Forbidden`,
        404: `Not Found`,
      },
    });
  }

  /**
   * usersByType
   * @returns UserResponse OK
   * @returns any Created
   * @throws ApiError
   */
  public static usersByTypeUsingPost({
    request,
  }: {
    /**
     * request
     */
    request: UsersByTypeRequest;
  }): CancelablePromise<Array<UserResponse> | any> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/dashboard/users/user-types",
      body: request,
      errors: {
        401: `Unauthorized`,
        403: `Forbidden`,
        404: `Not Found`,
      },
    });
  }
}
