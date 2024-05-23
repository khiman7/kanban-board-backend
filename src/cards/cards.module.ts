import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { BoardsModule } from 'src/boards/boards.module';
import { Board, BoardSchema } from 'src/boards/schemas/board.schema';
import { Card, CardSchema } from './schemas/card.schema';
import { CardsController } from './cards.controller';
import { CardsService } from './cards.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Board.name, schema: BoardSchema },
      { name: Card.name, schema: CardSchema },
    ]),
    BoardsModule,
  ],
  controllers: [CardsController],
  providers: [CardsService],
})
export class CardsModule {}
