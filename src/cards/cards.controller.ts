import {
  Controller,
  Post,
  Param,
  HttpStatus,
  HttpCode,
  Body,
  Put,
  Delete,
  NotFoundException,
} from '@nestjs/common';

import { Card } from './schemas/card.schema';
import { CardsService } from './cards.service';
import { CreateCardDTO } from './dtos/create-card.dto';
import { UpdateCardDTO } from './dtos/update-card.dto';

@Controller('cards')
export class CardsController {
  constructor(private readonly cardsService: CardsService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post()
  async create(@Body() dto: CreateCardDTO): Promise<Card> {
    return await this.cardsService.create(dto);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateCardDTO,
  ): Promise<Card | null> {
    return await this.cardsService.update(id, dto);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    const deletedCard = await this.cardsService.deleteById(id);

    if (!deletedCard) {
      throw new NotFoundException(`Card with ID ${id} not found`);
    }

    return;
  }
}
