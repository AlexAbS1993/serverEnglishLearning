import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { responseError } from 'src/Types/generalTypes';
import { getLoginResponseType, loginInResponse, loginInType, userFromTokenType } from './types/userServiceTypes';
import { UserService, userType } from './user.service';

@Controller("auth")
export class UserController {
  constructor(private readonly appService: UserService) {}

  @Get("getUsers")
  getUsers(): Promise<userType[]> {
    return this.appService.getUsers();
  }
  @Post("createUser")
  createUser(@Body() data: any):any {
    return this.appService.postUser(data)
  }
  @Post("loginIn")
  loginIn(@Body() data: loginInType): Promise<loginInResponse|responseError>{
      return this.appService.loginIn(data)
  }
  @Get("isLogin")
  isLogin(@Req() req): Promise<getLoginResponseType|responseError>{
    const user:userFromTokenType = req.user
    return this.appService.isLogin(user)
  }
}
