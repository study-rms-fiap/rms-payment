import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateOrderDto } from './dto/create-order.dto';
import { ClientKafka } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@ApiTags('order')
@Controller('orders')
export class OrderController {
  constructor(@Inject('PAYMENT_API') private readonly kafka: ClientKafka) { }

  // constructor(
  //   @Inject('order-service')
  //   private readonly service: ExpeditePaidOrderUseCase,

  //   // private readonly paymentRepository: PaymentRepository
  // ) { }

  @Post()
  async createOrder(@Body() inputDto: CreateOrderDto) {

    // return ExpeditePaidOrderUseCase.run(
    //   this.paymentRepository,
    //   inputDto.orderId,
    // );
  }

  @Post("/test")
  async runOrder(@Body() input: CreateOrderDto) {
    console.log(' Sending MEssage to TOPIC', input)
    // const test = this.kafka.send('paymentservice', { ...input })
    await firstValueFrom(this.kafka.emit('paymentservice', { ...input }))
    return { nessage: 'ok' }
  }
}
