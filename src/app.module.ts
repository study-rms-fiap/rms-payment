import { Inject, Module } from '@nestjs/common';
import { PaymentController } from './adapters/payment/payment.controller';
import { OrderController } from './adapters/order/order.controller';
import { PaymentRepository } from './adapters/payment/payment.repository';
import { OrderRepository } from './adapters/order/order.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { Payment, PaymentSchema } from './domain/payment/payment.entity';
import { config } from 'dotenv';
import { ClientKafka, ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'PAYMENT_API',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'payment',
            brokers: ['broker:9092'],
          },
          consumer: {
            groupId: 'payment-consumer',
          },
        },
      },
    ]),
    MongooseModule.forRoot(
      config().parsed['MONGO_HOST'] ||
        `mongodb://${process.env.MONGO_HOST}/payment`,
    ),
    MongooseModule.forFeature([{ name: Payment.name, schema: PaymentSchema }]),
  ],
  controllers: [PaymentController, OrderController],
  providers: [PaymentRepository, OrderRepository],
})
export class AppModule {
  constructor(
    @Inject('PAYMENT_API')
    private readonly clientKafka: ClientKafka
  ) { 

    console.log(
      'INITIALIZATION MONGO HOST',
      config().parsed['MONGO_HOST'] ||
        `mongodb://${process.env.MONGO_HOST}/payment`,
    );
  } 

  onModuleInit() {
    this.clientKafka.subscribeToResponseOf('new_orders')
  }
}
