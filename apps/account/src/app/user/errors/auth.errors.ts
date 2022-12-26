import {HttpException, HttpStatus} from '@nestjs/common';

export const IncorrectCredentialsError = () => {
  throw new HttpException('Credentials incorrect!', HttpStatus.BAD_REQUEST);
};

export const UserExist = () => {
  throw new HttpException('There is user!', HttpStatus.BAD_REQUEST);
};

export const AccessDeniedError = () => {
  throw new HttpException('Access denied!', HttpStatus.BAD_REQUEST, );

};
