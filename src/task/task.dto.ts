import { ApiProperty } from '@nestjs/swagger';
import { IsDataURI, IsInt, Max, Min } from 'class-validator';

export class TaskDto {
  @ApiProperty({ description: 'Task number', example: 1 })
  @IsInt()
  @Min(1)
  @Max(15)
  number: number;

  @ApiProperty({ description: 'A base64 data url of the task image' })
  @IsDataURI()
  image: string;
}
