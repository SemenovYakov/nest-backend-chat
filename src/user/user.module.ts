import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.model';

@Module({
  providers: [UserService],
  controllers: [UserController],
  imports: [TypeOrmModule.forFeature([User])],
  exports: [UserService, TypeOrmModule.forFeature([User])],
})
export class UserModule {}
