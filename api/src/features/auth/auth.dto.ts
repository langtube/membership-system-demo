import { ApiProperty } from '@nestjs/swagger';

export class SigninDto {
  @ApiProperty({ enum: ['free', 'basic', 'pro'] })
  username: string;

  @ApiProperty()
  password: string;
}
