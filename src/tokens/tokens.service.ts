import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/user.model';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import { Token } from './tokens.model';

@Injectable()
export class TokensService {
  constructor(
    @InjectRepository(Token) private tokenRepository: Repository<Token>,
    private jwtService: JwtService,
  ) {}

  async generateToken(user: User) {
    const payload = { email: user.email, id: user.id };

    return {
      accessToken: this.jwtService.sign(payload, {
        expiresIn: '15m',
      }),
      refreshToken: this.jwtService.sign(payload, {
        expiresIn: '1d',
      }),
    };
  }

  async saveToken(userId: number, refreshToken: string) {
    const tokenData = await this.tokenRepository.findOneBy({
      userId,
    });

    if (tokenData) {
      await this.tokenRepository.update(userId, { refreshToken });
      return tokenData;
    }

    const token = await this.tokenRepository.save({
      userId,
      refreshToken,
    });
    return token;
  }

  async removeToken(refreshToken) {
    const tokenData = await this.tokenRepository.delete({
      refreshToken,
    });
    return tokenData;
  }

  validateAccessToken(token) {
    try {
      const userData = this.jwtService.verify(token, {
        secret: 'SECRET',
      });
      return userData;
    } catch (e) {
      return null;
    }
  }

  validateRefreshToken(token) {
    try {
      const userData = this.jwtService.verify(token, {
        secret: 'SECRET',
      });
      return userData;
    } catch (e) {
      return null;
    }
  }

  async findToken(refreshToken) {
    const tokenData = await this.tokenRepository.findOneBy({
      refreshToken,
    });
    return tokenData;
  }
}
