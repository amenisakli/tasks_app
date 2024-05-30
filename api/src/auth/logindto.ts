import { ApiProperty } from '@nestjs/swagger';
export class SignIn {
  @ApiProperty()
  readonly email?: string;
  @ApiProperty()
  readonly password?: string;
}
