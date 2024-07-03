import { Inject, Module } from '@nestjs/common';
import { PaymentController } from './adapters/payment/payment.controller';
import { OrderController } from './adapters/order/order.controller';
import { PaymentRepository } from './adapters/payment/payment.repository';
import { OrderRepository } from './adapters/order/order.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { Payment, PaymentSchema } from './domain/payment/payment.entity';
import { config } from 'dotenv';
import { ClientKafka, ClientsModule, Transport } from '@nestjs/microservices';
import kafka_config from 'kafka_config';
import { Admin, Kafka } from 'kafkajs';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'PAYMENT_API',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: kafka_config().services.payment.clientId,
            brokers: [kafka_config().broker],
          },
          consumer: {
            groupId: kafka_config().services.payment.groupId,
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
  private admin: Admin
  constructor( @Inject('PAYMENT_API') private readonly kafka: ClientKafka) { 
    console.log(
      'INITIALIZATION MONGO HOST',
      config().parsed['MONGO_HOST'] ||
        `mongodb://${process.env.MONGO_HOST}/payment`,
    );
  }

  
  async onModuleInit() {
    console.log(' Initializing subscription for topic')
    this.kafka.subscribeToResponseOf('paymentservice');
    this.kafka.subscribeToResponseOf('paymentservicereply');
    const kafka = new Kafka({
      clientId: 'payment-api-controller',
      brokers: ['broker:9092'],
    });
    this.admin = kafka.admin();
    const topics = await this.admin.listTopics();
    console.log('TOPICOS EXISTENTES', topics)

    const topicList = [];
    if (!topics.includes('paymentservice')) {
      topicList.push({
        topic: 'paymentservice',
        numPartitions: 10,
        replicationFactor: 1,
      });
    }

    if (!topics.includes('paymentservicereply')) {
      topicList.push({
        topic: 'paymentservicereply',
        numPartitions: 10,
        replicationFactor: 1,
      });
    }

    if (topicList.length) {
      await this.admin.createTopics({
        topics: topicList,
      });
    }
  }
}
