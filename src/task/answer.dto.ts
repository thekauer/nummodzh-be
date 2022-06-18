import {
  IsEnum,
  IsIn,
  IsInt,
  IsNotEmpty,
  IsString,
  Max,
  Min,
} from 'class-validator';
import { Certainty } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class AnswerDto {
  @ApiProperty({ description: 'Task number', example: 1 })
  @IsInt()
  @Min(1)
  @Max(15)
  number: number;

  @ApiProperty({ description: 'Answer', example: 'A' })
  @IsString()
  @IsIn(['A', 'B', 'C', 'D'])
  @IsNotEmpty()
  answer: string;

  @ApiProperty({ description: 'Certainty', example: Certainty.FIX })
  @IsEnum(Certainty)
  certainty: Certainty;
}
