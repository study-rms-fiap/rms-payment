import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateOrderDto } from './dto/create-order.dto';
import { firstValueFrom } from 'rxjs';
import { OrderRepository } from './order.repository';

@ApiTags('order')
@Controller('order')
export class OrderController {
  constructor(private orderRepository: OrderRepository) { }

  @Post("/process_payment")
  async runOrder(@Body() input: CreateOrderDto) {
    console.log(' Sending MEssage to TOPIC', input)
    await firstValueFrom(this.orderRepository.emit(input))
    return { nessage: 'ok' }
  }
}
