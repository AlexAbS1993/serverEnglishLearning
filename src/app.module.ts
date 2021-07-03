import { UserModule } from './routes/user/user.module';
import { Module } from '@nestjs/common';
import { ValidateModule } from './routes/validate/validate.module';
import { StatisticModule } from './routes/statistic/statistic.module';
import { WordsModule } from './routes/words/words.module';


@Module({
  imports: [UserModule, ValidateModule, StatisticModule, WordsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
