import { responseError } from '../../Types/generalTypes';
import { loginInResponse, loginInType, userFromTokenType, getLoginResponseType, statisticSearchType } from './types/userServiceTypes';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import bounded from '../../database/relations'
import { errorDecoder } from 'src/functions/errorDecoder';
const config = require('config')
const jwt = require('jsonwebtoken')
const {User, Statistic} = bounded

export type userType = {
  login: string, 
  password: string, 
  id: number,
  role: "admin"|"user"
}

@Injectable()
export class UserService {
  async getUsers(): Promise<userType[]> {
    const users:userType[] = await User.findAll()
    return users;
  }
  async postUser(data:any): Promise<{message: string}>{
    let newuser
    let candidate = await User.findOne({where: {login: data.login}})
    if (candidate){
      throw new HttpException(errorDecoder("Уже существует", "validation"), HttpStatus.BAD_REQUEST)
    }
    try{
      newuser = await User.create({login: data.login, password: data.password})}
    catch(e){
        throw new HttpException(errorDecoder(e.message, "validation"), HttpStatus.BAD_REQUEST) 
      }
      try {
        if (data.statistic){
          await Statistic.create({userId: newuser.id, ...data.statistic})
        }
        else {
          await Statistic.create({userId: newuser.id})
        }
      }
      catch(e){
        throw new HttpException(errorDecoder(e.message, "statistic"), HttpStatus.BAD_REQUEST) 
      }
      return {
        message: "Пользователь зарегистрирован. Войдите на сайт"
      }
    
      
    }

  async loginIn(data:loginInType): Promise<loginInResponse|responseError>{
    try{
        const candidate = await User.findOne({ where: { login: data.login } })
    if (!candidate){
        throw new Error("Такого пользователя не существует")
    }
    if (candidate.password !== data.password){
        throw new Error("Неверный пароль")
    }
    const statistic = await Statistic.findOne({where: {userId: candidate.id}})
    const token = await jwt.sign({id: candidate.id, login: candidate.login}, config.get("secretkey"))
    console.log(data)
    return {
        message: "Вход выполнен",
        login: data.login,
        isRemember: data.rememberMe || false,
        role: candidate.role,
        id: candidate.id,
        statistic,
        token: `Bearer ${token}`
    }
    }
    catch(e){
      throw new HttpException(errorDecoder(e.message, "loginisation"), HttpStatus.BAD_REQUEST)
    }
  }
  async isLogin(user:userFromTokenType):Promise<getLoginResponseType|responseError> {
    try{
      const candidate:userType = await User.findOne({where: {id: user.id}})
      if (!candidate){
        throw new Error("Такого пользователя нет")
      }
      const statistic: statisticSearchType = await Statistic.findOne({where: {userId: user.id}})
      return({
        login: candidate.login,
        id: candidate.id,
        message: "Добро пожаловать",
        role: candidate.role,
        statistic
      })
    }
    catch(e){
      throw new HttpException(errorDecoder(e.message, "loginisation"), HttpStatus.BAD_REQUEST)
    }
  }
}
