import {IsEmail, IsOptional, IsString} from "class-validator";
import {UserRole} from "@microservices/interfaces";

export class RegisterDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsOptional()
  @IsString()
  display_name?: string;

  @IsOptional()
  @IsString()
  role?: UserRole;
}
