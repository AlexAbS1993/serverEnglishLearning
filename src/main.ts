import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import sequelize from './database/connection'
import {passportUseFunction} from './passport/passport'
import models from './database/relations'
const passport = require('passport')

const {User, Statistic, Word, userWord} = models
// Горячая синхронизация с базой данных
const hardsyncs = {
  User: false,
  Word: true,
  userWord: false,
  Statistic: false
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: "http://localhost:3000" 
    }
  });
  app.use(passport.initialize())
  await passportUseFunction(passport);
  await (async() => {
    if (hardsyncs.User){
      await User.sync({alter: true})
    }
    if(hardsyncs.Statistic){
      await Statistic.sync({alter: true})
    }
    if (hardsyncs.Word){
      await Word.sync({alter: true})
    }
    if(hardsyncs.userWord){
      await userWord.sync({alter: true})
    }
  })()
  try{
   await sequelize.authenticate()
  }
  catch(e){
    console.log(`ERROR: ${e.message}`)
  }
  await app.listen(5000);
}
bootstrap();