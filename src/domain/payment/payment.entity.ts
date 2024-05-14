import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { DateTime } from 'luxon';
import { SchemaTypes, Types } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

export interface IPayment {
  id: Types.ObjectId;
  status: PaymentStatus;
  lastUpdate: string;
  createdAt: string;
  client: string;
  orderId: string;
}

export enum PaymentStatus {
  PENDING = 1,
  PAID = 10,
  CANCELLED = 20,
}

@Schema()
export class Payment implements IPayment {
  @Prop({ type: SchemaTypes.ObjectId })
  id: Types.ObjectId;

  @Prop({ required: true })
  status: PaymentStatus;

  @Prop({ required: true })
  createdAt: string;

  @Prop({ required: true })
  lastUpdate: string;

  @Prop({ required: true })
  client: string;

  @Prop({ required: true })
  orderId: string;

  constructor(client: string) {
    this.client = client;
    this.lastUpdate = DateTime.utc().toISO();
    this.createdAt = DateTime.utc().toISO();
    this.orderId = uuidv4();
  }

  updateStatus(status: PaymentStatus) {
    this.status = status;
    this.lastUpdate = DateTime.utc().toISO();
  }
}

export const PaymentSchema = SchemaFactory.createForClass(Payment);
