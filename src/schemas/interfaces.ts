import { Request } from "express";

export type TUser = {
  username: string;
  email: string;
  id?: number;
  password?: string;
};

export type TPopulatedPlant = {
  plant_id: number;
  plant_name: string;
  average_rate: number;
  image_endpoint: string;
  owner_username: string;
};

export enum KnownErrors {
  JWT_EXPIRED = "The token has expired",
  JWT_INVALID = "The token is invalid",
  REQ_NO_USER = "The request object does not have a user property",
}

type TRequestUser = {
  id: number;
  username: string;
};

export interface IRequestWithUser extends Request {
  user?: TRequestUser;
}
