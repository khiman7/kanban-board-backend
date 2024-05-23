import {
  IsEnum,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { BoardList } from 'src/boards/schemas/board.schema';

export class UpdateCardDTO {
  @IsOptional()
  @IsString()
  boardId: string;

  @IsOptional()
  @IsEnum(BoardList)
  listName: BoardList;

  @IsOptional()
  @IsString()
  @MinLength(3)
  readonly title: string;

  @IsOptional()
  @IsString()
  @MinLength(1)
  @MaxLength(64)
  readonly description: string;
}
