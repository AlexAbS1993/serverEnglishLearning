import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import sequelize, { hardsync } from './database/connection'
import {passportUseFunction} from './passport/passport'
const passport = require('passport')



async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: "http://localhost:3000" 
    }
  });
  app.use(passport.initialize())
  await passportUseFunction(passport)
  try{
   hardsync ? (async() => {
   await sequelize.sync({ force: true })})() : (async() => {
    await sequelize.sync()})()
   await sequelize.authenticate()

  }
  catch(e){
    console.log(`ERROR: ${e.message}`)
  }
  await app.listen(5000);
}
bootstrap();