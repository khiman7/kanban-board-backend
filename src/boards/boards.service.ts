import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Board } from './schemas/board.schema';
import { CreateBoardDTO } from './dtos/create-board.dto';
import { UpdateBoardDTO } from './dtos/update-board.dto';
import { Card } from 'src/cards/schemas/card.schema';

interface FindAllOptions {
  query: string;
}

@Injectable()
export class BoardsService {
  constructor(
    @InjectModel(Board.name) private boardModel: Model<Board>,
    @InjectModel(Card.name) private cardModel: Model<Card>,
  ) {}

  async findAll(options?: FindAllOptions): Promise<Board[]> {
    if (options && options.query) {
      return await this.boardModel.aggregate([
        {
          $match: {
            $expr: {
              $regexMatch: {
                input: { $toString: '$_id' },
                regex: new RegExp(`^${options.query}`),
              },
            },
          },
        },
      ]);
    }

    return await this.boardModel.find();
  }

  async findById(id: string): Promise<Board | null> {
    return await this.boardModel.findById(id);
  }

  async create(dto: CreateBoardDTO): Promise<Board> {
    const board = new this.boardModel(dto);

    return await board.save();
  }

  async updateById(id: string, dto: UpdateBoardDTO): Promise<Board | null> {
    const updatedBoard = await this.boardModel.findByIdAndUpdate(id, dto);

    return updatedBoard;
  }

  async deleteById(id: string): Promise<Board | null> {
    const deletedBoard = await this.boardModel.findByIdAndDelete(id);

    if (deletedBoard) {
      for (const list of deletedBoard.lists) {
        for (const cardId of list.cards) {
          await this.cardModel.findByIdAndDelete(cardId);
        }
      }
    }

    return deletedBoard;
  }
}
