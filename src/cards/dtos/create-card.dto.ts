import { IsEnum, IsNotEmpty, MaxLength, MinLength } from 'class-validator';
import { BoardList } from 'src/boards/schemas/board.schema';

export class CreateCardDTO {
  @IsNotEmpty()
  readonly boardId: string;

  @IsEnum(BoardList)
  readonly listName: BoardList;

  @IsNotEmpty()
  @MinLength(3)
  readonly title: string;

  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(64)
  readonly description: string;
}
