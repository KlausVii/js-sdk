/**
 * JavaScript and Node.js SDK for OpenFGA
 *
 * API version: 0.1
 * Website: https://openfga.dev
 * Documentation: https://openfga.dev/docs
 * Support: https://discord.gg/8naAwJfWN6
 * License: [Apache-2.0](https://github.com/openfga/js-sdk/blob/main/LICENSE)
 *
 * NOTE: This file was auto generated by OpenAPI Generator (https://openapi-generator.tech). DO NOT EDIT.
 */


import type * as Nock from "nock";

import {
  AuthorizationModel,
  CheckRequest,
  CheckResponse,
  CreateStoreResponse,
  ExpandResponse,
  GetStoreResponse,
  ListObjectsResponse,
  ListStoresResponse,
  ReadAssertionsResponse,
  ReadAuthorizationModelResponse,
  ReadAuthorizationModelsResponse,
  ReadChangesResponse,
  ReadResponse,
  TupleKey,
  TupleOperation,
  WriteAuthorizationModelRequest,
} from "../../index";
import { defaultConfiguration } from "./default-config";

export const getNocks = ((nock: typeof Nock) => ({
  tokenExchange: (
    apiTokenIssuer: string,
    accessToken = "test-token",
    expiresIn = 300,
    statusCode = 200,
  ) => {
    return nock(`https://${apiTokenIssuer}`).post("/oauth/token").reply(statusCode, {
      access_token: accessToken,
      expires_in: expiresIn,
    });
  },
  listStores: (
    basePath = defaultConfiguration.getBasePath(),
    response: ListStoresResponse = { stores: [{ id: "some-id", name: "some-name" }] },
    responseCode = 200,
  ) => {
    return nock(basePath)
      .get("/stores")
      .reply(responseCode, response);
  },
  createStore: (
    basePath = defaultConfiguration.getBasePath(),
    response: CreateStoreResponse = { id: "some-id", name: "some-name" },
    responseCode = 200,
  ) => {
    return nock(basePath)
      .post("/stores")
      .reply(responseCode, response);
  },
  getStore: (
    storeId: string,
    basePath = defaultConfiguration.getBasePath(),
    response: GetStoreResponse = { id: "some-id", name: "some-name" },
    responseCode = 200,
  ) => {
    return nock(basePath)
      .get(`/stores/${storeId}`)
      .reply(responseCode, response);
  },
  deleteStore: (
    storeId: string,
    basePath = defaultConfiguration.getBasePath(),
    responseCode = 204,
  ) => {
    return nock(basePath)
      .delete(`/stores/${storeId}`)
      .reply(responseCode);
  },
  readAuthorizationModels: (
    storeId: string,
    basePath = defaultConfiguration.getBasePath(),
    authorizationModels: AuthorizationModel[] = [{ id: "some-id", schema_version: "1.1", type_definitions: [] }],
    statusCode = 200,
  ) => {
    return nock(basePath)
      .get(`/stores/${storeId}/authorization-models`)
      .reply(statusCode, {
        authorization_models: authorizationModels,
      } as ReadAuthorizationModelsResponse);
  },
  writeAuthorizationModel: (
    storeId: string,
    configurations: WriteAuthorizationModelRequest,
    basePath = defaultConfiguration.getBasePath(),
  ) => {
    return nock(basePath)
      .post(`/stores/${storeId}/authorization-models`)
      .reply(200, {
        id: "some-new-id",
      } as ReadAuthorizationModelResponse);
  },
  readSingleAuthzModel: (
    storeId: string,
    configId: string,
    basePath = defaultConfiguration.getBasePath(),
    authorizationModel: AuthorizationModel = { id: "some-id", schema_version: "1.1", type_definitions: [] },
  ) => {
    return nock(basePath)
      .get(`/stores/${storeId}/authorization-models/${configId}`)
      .reply(200, {
        authorization_model: authorizationModel
      });
  },
  readChanges: (storeId: string, type: string, pageSize: number, contToken: string, basePath = defaultConfiguration.getBasePath()) => {
    return nock(basePath)
      .get(`/stores/${storeId}/changes`)
      .query({
        type,
        page_size: pageSize,
        continuation_token: contToken
      })
      .reply(200, {
        changes: [{
          tuple_key: {
            user: "user:81684243-9356-4421-8fbf-a4f8d36aa31b",
            relation: "viewer",
            object: "document:roadmap"
          },
          operation: TupleOperation.Write,
          timestamp: "2000-01-01T00:00:00Z"
        }],
        "continuation_token": "eyJwayI6IkxBVEVTVF9OU0NPTkZJR19hdXRoMHN0b3JlIiwic2siOiIxem1qbXF3MWZLZExTcUoyN01MdTdqTjh0cWgifQ=="
      } as ReadChangesResponse);
  },
  read: (
    storeId: string,
    tuple: TupleKey,
    basePath = defaultConfiguration.getBasePath(),
  ) => {
    return nock(basePath)
      .post(`/stores/${storeId}/read`)
      .reply(200, { tuples: [] } as ReadResponse);
  },
  write: (
    storeId: string,
    basePath = defaultConfiguration.getBasePath(),
    responseBody: object | { code: string, message: string } = {},
    statusCode = 204,
  ) => {
    return nock(basePath)
      .post(`/stores/${storeId}/write`)
      .reply(statusCode, responseBody);
  },
  delete: (
    storeId: string,
    tuple: TupleKey,
    basePath = defaultConfiguration.getBasePath(),
  ) => {
    return nock(basePath)
      .post(`/stores/${storeId}/write`)
      .reply(200, {} as Promise<object>);
  },
  check: (
    storeId: string,
    tuple: TupleKey,
    basePath = defaultConfiguration.getBasePath(),
    response: { allowed: boolean } | { code: string, message: string } = { allowed: true },
    statusCode = 200,
  ) => {
    return nock(basePath)
      .post(`/stores/${storeId}/check`, (body: CheckRequest) =>
        body.tuple_key.user === tuple.user &&
        body.tuple_key.relation === tuple.relation &&
        body.tuple_key.object === tuple.object
      )
      .reply(statusCode, response as CheckResponse);
  },
  expand: (
    storeId: string,
    tuple: TupleKey,
    basePath = defaultConfiguration.getBasePath(),
  ) => {
    return nock(basePath)
      .post(`/stores/${storeId}/expand`)
      .reply(200, { tree: {} } as ExpandResponse);
  },
  listObjects: (storeId: string, responseBody: ListObjectsResponse, basePath = defaultConfiguration.getBasePath()) => {
    return nock(basePath)
      .post(`/stores/${storeId}/list-objects`)
      .reply(200, responseBody);
  },
  readAssertions: (storeId: string, modelId: string, assertions: ReadAssertionsResponse["assertions"] = [], basePath = defaultConfiguration.getBasePath()) => {
    return nock(basePath)
      .get(`/stores/${storeId}/assertions/${modelId}`)
      .reply(200, {
        authorization_model_id: modelId,
        assertions,
      });
  },
  writeAssertions: (storeId: string, modelId: string, basePath = defaultConfiguration.getBasePath(), responseStatus = 204) => {
    return nock(basePath)
      .put(`/stores/${storeId}/assertions/${modelId}`)
      .reply(responseStatus);
  },
}));
