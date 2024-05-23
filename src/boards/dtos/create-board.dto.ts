import { IsString, MinLength } from 'class-validator';

export class CreateBoardDTO {
  @IsString()
  @MinLength(3)
  readonly name: string;
}
