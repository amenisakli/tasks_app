import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { SignIn } from './logindto';
@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.userService.findByEmail(email);
    if (user) {
      const isPasswordMatching = await bcrypt.compare(pass, user.password);
      if (isPasswordMatching) {
        const { password, ...result } = user;
        return result;
      }
    }
    return null;
  }

  async login(signin: SignIn) {
    const objectUser = await this.validateUser(signin.email, signin.password);
    if (objectUser) {
      const payload = {
        id: objectUser.id,
        lastName: objectUser.lastName,
        firstName: objectUser.firstName,
        email: objectUser.email,
      };
      const token = this.jwtService.sign(payload);
      return {
        token,
      };
    } else {
      return 'email et/ou mot de passe incorrect';
    }
  }
}
