import { IsOptional, IsString, MinLength } from 'class-validator';

export class UpdateBoardDTO {
  @IsOptional()
  @IsString()
  @MinLength(3)
  readonly name: string;
}
