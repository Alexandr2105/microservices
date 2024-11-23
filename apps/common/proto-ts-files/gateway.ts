// Code generated by protoc-gen-ts_proto. DO NOT EDIT.
// versions:
//   protoc-gen-ts_proto  v2.3.0
//   protoc               v3.21.12
// source: gateway.proto

/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

export const protobufPackage = "gateway";

export interface GetUserById {
  id: string;
}

export interface CreateUser {
  login: string;
  email: string;
  password: string;
}

export interface GetUserResponse {
  id: string;
  login: string;
  email: string;
}

export const GATEWAY_PACKAGE_NAME = "gateway";

export interface GatewayServiceClient {
  getUser(request: GetUserById): Observable<GetUserResponse>;

  createNewUser(request: CreateUser): Observable<GetUserResponse>;
}

export interface GatewayServiceController {
  getUser(request: GetUserById): Promise<GetUserResponse> | Observable<GetUserResponse> | GetUserResponse;

  createNewUser(request: CreateUser): Promise<GetUserResponse> | Observable<GetUserResponse> | GetUserResponse;
}

export function GatewayServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["getUser", "createNewUser"];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("GatewayService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("GatewayService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const GATEWAY_SERVICE_NAME = "GatewayService";
