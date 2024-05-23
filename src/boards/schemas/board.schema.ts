import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Schema as MongooseSchema } from 'mongoose';

import { CardDocument } from '../../cards/schemas/card.schema';

export type BoardDocument = Board & mongoose.Document;

export enum BoardList {
  TODO = 'todo',
  WORK_IN_PROGRESS = 'work_in_progress',
  DONE = 'done',
}

@Schema()
export class List {
  @Prop({ enum: BoardList, required: true })
  name: BoardList;

  @Prop({
    type: [{ type: MongooseSchema.Types.ObjectId, ref: 'Card' }],
    default: [],
  })
  cards: CardDocument['_id'][];
}

@Schema()
export class Board {
  @Prop({ required: true })
  name: string;

  @Prop({
    type: [List],
    default: [
      { name: BoardList.TODO, cards: [] },
      { name: BoardList.WORK_IN_PROGRESS, cards: [] },
      { name: BoardList.DONE, cards: [] },
    ],
  })
  lists: List[];
}

export const BoardSchema = SchemaFactory.createForClass(Board);

BoardSchema.pre(['find', 'findOne', 'findOneAndUpdate'], function () {
  this.populate('lists.cards');
});
