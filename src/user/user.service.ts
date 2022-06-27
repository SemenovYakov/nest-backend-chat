import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user-dto';
import { User } from './user.model';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async createUser(userDto: CreateUserDto) {
    const user = await this.userRepository.save(userDto);
    return user;
  }

  async getUserByEmail(emailDto: string) {
    const user = await this.userRepository.findOneBy({
      email: emailDto,
    });
    return user;
  }

  async getAllUsers() {
    const users = await this.userRepository.find();
    return users;
  }
}
