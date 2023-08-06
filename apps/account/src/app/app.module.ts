import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import {  ConfigModule  } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { getMongooseConfig } from './config/mongoose.config';

@Module({
  imports: [
    UserModule, 
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: 'envs/.account.env'
    }),
    MongooseModule.forRootAsync(getMongooseConfig())
  ],
})
export class AppModule {}
