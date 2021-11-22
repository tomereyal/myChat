import { Request } from "express";
import { RowDataPacket } from "mysql2";

export type DbQueryResult<TableRecord> = (TableRecord & RowDataPacket)[];
export interface ReqNewUser {
  firstName: string;
  lastName: string;
  username: string;
  password: string;
}
export interface RequestWithToken extends Request {
  user: userTokenDetails;
}
export type userTokenDetails = {
  username: string;
  id: number;
  iat: string;
  isAdmin: boolean;
};

export type PaginationQuery = { current: number; fetchSize: number };

export type RefreshTokenModel = {
  jwt_token: string;
  userId: number;
};
