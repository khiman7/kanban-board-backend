import { Module } from '@nestjs/common';
import { BoardsController } from './boards.controller';
import { MongooseModule } from '@nestjs/mongoose';

import { BoardsService } from './boards.service';
import { Board, BoardSchema } from './schemas/board.schema';
import { Card, CardSchema } from 'src/cards/schemas/card.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Board.name, schema: BoardSchema },
      { name: Card.name, schema: CardSchema },
    ]),
  ],
  controllers: [BoardsController],
  providers: [BoardsService],
})
export class BoardsModule {}
