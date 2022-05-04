import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class AddWorkspaceDto {
  @ApiProperty()
  @IsNotEmpty()
  name: string;
}

export class DeleteWorkspaceDto {
  @ApiProperty()
  @IsNotEmpty()
  id: string;
}
