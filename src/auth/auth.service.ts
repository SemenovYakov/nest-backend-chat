import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/create-user-dto';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcryptjs';
import { LoginDto } from './login-dto';
import { TokensService } from 'src/tokens/tokens.service';
import { User } from 'src/user/user.model';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private tokensService: TokensService,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async registration(userDto: CreateUserDto) {
    const human = await this.userService.getUserByEmail(userDto.email);
    if (human) {
      throw new HttpException(
        'This email is already in use',
        HttpStatus.BAD_REQUEST,
      );
    }
    const hashPassword = await bcrypt.hash(userDto.password, 5);
    const user = await this.userService.createUser({
      ...userDto,
      password: hashPassword,
    });
    const tokens = await this.tokensService.generateToken(user);
    await this.tokensService.saveToken(user.id, tokens.refreshToken);
    return {
      ...tokens,
      user: userDto,
    };
  }

  async login(loginDto: LoginDto) {
    const user = await this.userService.getUserByEmail(loginDto.email);
    const passwordEquals = await bcrypt.compare(
      loginDto.password,
      user.password,
    );
    if (user && passwordEquals) {
      const tokens = await this.tokensService.generateToken(user);
      await this.tokensService.saveToken(user.id, tokens.refreshToken);
      return {
        ...tokens,
        user,
      };
    }
    throw new UnauthorizedException({ message: 'Incorrect email or password' });
  }

  async logout(refreshToken) {
    const token = await this.tokensService.removeToken(refreshToken);
    return token;
  }

  async refresh(refreshToken) {
    if (!refreshToken) {
      throw new UnauthorizedException({
        message: 'Ошибка авторизации',
      });
    }
    const userData = await this.tokensService.validateRefreshToken(
      refreshToken,
    );
    const tokenFromDb = await this.tokensService.findToken(refreshToken);
    if (!userData || !tokenFromDb) {
      throw new UnauthorizedException({
        message: 'Ошибка авторизации',
      });
    }
    const user = await this.userRepository.findOneBy({ id: userData.userId });
    const tokens = await this.tokensService.generateToken(user);
    await this.tokensService.saveToken(user.id, tokens.refreshToken);
    return {
      ...tokens,
      user,
    };
  }
}
