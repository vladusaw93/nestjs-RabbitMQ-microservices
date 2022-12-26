import {JwtPayloadType} from "./jwt-payload.type";

export type JwtPayloadWithRtType = JwtPayloadType & { refresh_token: string };
