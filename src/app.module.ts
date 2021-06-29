import { UserModule } from './routes/user/user.module';
import { Module } from '@nestjs/common';
import { ValidateModule } from './routes/validate/validate.module';


@Module({
  imports: [UserModule, ValidateModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
