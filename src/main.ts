import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import sequelize from './database/connection'
import {passportUseFunction} from './passport/passport'
const passport = require('passport')

const hardsync = false

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: "http://localhost:3000" 
    }
  });
  app.use(passport.initialize())
  await passportUseFunction(passport)
  try{
    hardsync ? await sequelize.sync({ force: true }) : await sequelize.sync()
    await sequelize.authenticate()
  }
  catch(e){
    console.log(`ERROR: ${e.message}`)
  }
  await app.listen(5000);
}
bootstrap();