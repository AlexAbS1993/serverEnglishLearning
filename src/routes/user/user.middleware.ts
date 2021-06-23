import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
const passport = require("passport")

@Injectable()
export class PassportMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    next()
  }
}
