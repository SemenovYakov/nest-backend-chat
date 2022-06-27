import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { TokensModule } from 'src/tokens/tokens.module';

@Module({
  providers: [AuthService],
  controllers: [AuthController],
  imports: [UserModule, TokensModule],
})
export class AuthModule {}
