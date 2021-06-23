import { responseError } from '../../Types/generalTypes';
import { loginInResponse, loginInType, userFromTokenType, getLoginResponseType, statisticSearchType } from './types/userServiceTypes';
import { Injectable } from '@nestjs/common';
import bounded from '../../database/relations'
const config = require('config')
const jwt = require('jsonwebtoken')
const {User, Statistic} = bounded

export type userType = {
  login: string, 
  password: string, 
  id: number
}

@Injectable()
export class UserService {
  async getUsers(): Promise<userType[]> {
    const users:userType[] = await User.findAll()
    return users;
  }
  async postUser(data:any): Promise<string>{
    let newuser = await User.create({login: data.login, password: data.password})
    if (data.statistic){
      await Statistic.create({userId: newuser.id, ...data.statistic})
    }
    else {
      await Statistic.create({userId: newuser.id})
    }
    return "Success"
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
    return {
        login: data.login,
        isRemember: data.isRemember || false,
        statistic,
        token: `Bearer ${token}`
    }
    }
    catch(e){
        return {
            error: e.message
        }
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
        statistic
      })
    }
    catch(e){
      return {
        error: e.message
    }
    }
  }
}
