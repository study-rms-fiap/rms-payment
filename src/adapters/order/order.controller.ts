import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateOrderDto } from './dto/create-order.dto';
import { PaymentRepository } from '../payment/payment.repository';
import { ExpeditePaidOrderUseCase } from 'use-cases/expedite-paid-order.use-case';

@ApiTags('order')
@Controller('orders')
export class OrderController {
  constructor(private readonly paymentRepository: PaymentRepository) {}

  @Post()
  async createOrder(@Body() inputDto: CreateOrderDto) {
    return ExpeditePaidOrderUseCase.run(
      this.paymentRepository,
      inputDto.orderId,
    );
  }
}
