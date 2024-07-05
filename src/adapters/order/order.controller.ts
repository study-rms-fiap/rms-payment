import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateOrderDto } from './dto/create-order.dto';
import { ClientKafka, MessagePattern, Payload } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { OrderRepository } from './order.repository';

@ApiTags('order')
@Controller('orders')
export class OrderController {
  constructor(private orderRepository: OrderRepository) { }

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

  @Post("/process_payment")
  async runOrder(@Body() input: CreateOrderDto) {
    console.log(' Sending MEssage to TOPIC', input)
    await firstValueFrom(this.orderRepository.emit(input))
    return { nessage: 'ok' }
  }
}
