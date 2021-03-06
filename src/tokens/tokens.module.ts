import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Token } from './tokens.model';
import { TokensService } from './tokens.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Token]),
    JwtModule.register({ secret: 'SECRET' }),
  ],
  providers: [TokensService],
  exports: [TokensService, JwtModule],
})
export class TokensModule {}
