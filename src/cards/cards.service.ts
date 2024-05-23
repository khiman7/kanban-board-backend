import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Board } from 'src/boards/schemas/board.schema';
import { Card } from './schemas/card.schema';
import { UpdateCardDTO } from './dtos/update-card.dto';
import { CreateCardDTO } from './dtos/create-card.dto';

@Injectable()
export class CardsService {
  constructor(
    @InjectModel(Board.name) private boardModel: Model<Board>,
    @InjectModel(Card.name) private cardModel: Model<Card>,
  ) {}

  async create(dto: CreateCardDTO): Promise<Card> {
    const { boardId, listName, title, description } = dto;
    const board = await this.boardModel.findById(boardId);

    if (!board) {
      throw new NotFoundException(`Board with id ${boardId} not found`);
    }

    const list = board.lists.find((list) => list.name === listName);

    if (!list) {
      throw new NotFoundException(
        `List with name "${listName}" not found on the board ${boardId}`,
      );
    }

    const card = new this.cardModel({ title, description });
    await card.save();
    list.cards.push(card._id);
    await board.save();

    return card;
  }

  async update(cardId: string, dto: UpdateCardDTO): Promise<Card | null> {
    const { boardId, listName, title, description } = dto;
    const card = await this.cardModel.findById(cardId);

    if (!card) {
      throw new NotFoundException('Card not found');
    }

    if (title) card.title = title;
    if (description) card.description = description;

    // Moving card between lists
    if (boardId && listName) {
      const board = await this.boardModel.findById(boardId);

      if (!board) {
        throw new NotFoundException(`Board with ID ${boardId} not found`);
      }

      const list = board.lists.find((list) => list.name === listName);

      if (!list) {
        throw new NotFoundException(
          `List with name "${listName}" not found on board`,
        );
      }

      for (const list of board.lists) {
        list.cards = list.cards.filter((id) => !id.equals(cardId));
      }

      list.cards.push(cardId);

      await board.save();
    }

    return await card.save();
  }

  async deleteById(cardId: string): Promise<Card | null> {
    return await this.cardModel.findByIdAndDelete(cardId);
  }
}
