import { Module } from '@nestjs/common';
import { PaymentController } from './adapters/payment/payment.controller';
import { OrderController } from './adapters/order/order.controller';
import { PaymentRepository } from './adapters/payment/payment.repository';
import { OrderRepository } from './adapters/order/order.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { Payment, PaymentSchema } from './domain/payment/payment.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './domain/order/order.entity';
import { config } from 'dotenv';

@Module({
  imports: [
    MongooseModule.forRoot(
      config().parsed['MONGO_HOST'] ||
        `mongodb://${process.env.MONGO_HOST}/payment`,
    ),
    MongooseModule.forFeature([{ name: Payment.name, schema: PaymentSchema }]),
  ],
  controllers: [PaymentController, OrderController],
  providers: [PaymentRepository],
})
export class AppModule {
  constructor() {
    console.log(
      'INITIALIZATION MONGO HOST',
      config().parsed['MONGO_HOST'] ||
        `mongodb://${process.env.MONGO_HOST}/payment`,
    );
  }
}
