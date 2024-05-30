import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { UpdateUserDto } from './dto/update-user.dto';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}
  async create(userDto: CreateUserDto): Promise<User> {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(userDto.password, saltRounds);

    const user = this.usersRepository.create({
      ...userDto,
      password: hashedPassword,
    });

    return this.usersRepository.save(user);
  }
  findAll() {
    return this.usersRepository.findBy({ status: true });
  }
  async findByEmail(email: string) {
    const user = await this.usersRepository.findOneBy({ email: email });
    if (!user) {
      throw new NotFoundException("user n'exsit pas");
    }
    return user;
  }
  async update(id: number, updateUserDto: UpdateUserDto) {
    const todo = await this.usersRepository.preload({
      id: id,
      ...updateUserDto,
    });
    if (!todo) {
      throw new NotFoundException("Todo n'existe pas ");
    } else {
      return this.usersRepository.save(todo);
    }
  }
  findOne(id: number) {
    return this.usersRepository.findOneBy({ id });
  }
  async delete(id: number) {
    const user = await this.usersRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException(`user n'existe pas`);
    } else {
      user.status = false;
      return this.usersRepository.save(user);
    }
  }
}
