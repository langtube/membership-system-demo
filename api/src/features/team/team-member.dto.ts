import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class AddTeamMemberDto {
  @ApiProperty()
  @IsNotEmpty()
  email: string;
}

export class DeleteTeamMemberDto {
  @ApiProperty()
  @IsNotEmpty()
  id: string;
}
