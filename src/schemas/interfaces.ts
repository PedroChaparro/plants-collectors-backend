export type TUser = {
  username: string;
  email: string;
  id?: number;
  password?: string;
};

export type TPopulatedPlant = {
  plant_id: number;
  plant_name: string;
  owner_username: string;
};

export enum JWTValidationErrors {
  EXPIRED = "The token has expired",
  INVALID = "The token is invalid",
}
