export type TUser = {
  username: string;
  email: string;
  id?: number;
  password?: string;
};

export enum JWTValidationErrors {
  EXPIRED = "The token has expired",
  INVALID = "The token is invalid",
}
