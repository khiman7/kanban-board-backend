import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { Board } from './schemas/board.schema';
import { BoardsService } from './boards.service';
import { CreateBoardDTO } from './dtos/create-board.dto';

@Controller('boards')
export class BoardsController {
  constructor(private readonly boardsService: BoardsService) {}

  @HttpCode(HttpStatus.OK)
  @Get(':id')
  async findById(@Param('id') id: string): Promise<Board | null> {
    return await this.boardsService.findById(id);
  }

  @HttpCode(HttpStatus.OK)
  @Get()
  async findAll(@Query('q') query: string): Promise<Board[]> {
    return await this.boardsService.findAll({ query });
  }

  @HttpCode(HttpStatus.CREATED)
  @Post()
  async create(@Body() dto: CreateBoardDTO): Promise<Board> {
    return await this.boardsService.create(dto);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    const deletedBoard = await this.boardsService.deleteById(id);

    if (!deletedBoard) {
      throw new NotFoundException(`Board with ID ${id} not found`);
    }

    return;
  }
}
