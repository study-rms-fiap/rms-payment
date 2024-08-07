import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { firstValueFrom } from 'rxjs';
import { OrderRepository } from './order.repository';
import { EventPattern, Payload } from '@nestjs/microservices';
import { CreatePaymentDto } from '../payment/dto/create-payment.dto';
import { CreatePaymentUseCase } from 'use-cases/create-payment.use-case';
import { PaymentRepository } from '../payment/payment.repository';
import { ProcessPaymentDto } from './dto/process-payment.dto';
import { UpdatePaymentUseCase } from 'use-cases/update-payment.use-case';

@ApiTags('order')
@Controller('order')
export class OrderController {
  constructor(private orderRepository: OrderRepository, private paymentRepository: PaymentRepository) { }

  @Post("/process_payment")
  async runOrder(@Body() input: ProcessPaymentDto) {
    console.info('PAYMENT-API: payment information received', input)
    const payment = await UpdatePaymentUseCase.run(this.paymentRepository, input.paymentId, String(input.status))
    await firstValueFrom(this.orderRepository.emit(input))
    return payment
  }

  @EventPattern('new_orders')
  async processNewOrder(@Payload() message: CreatePaymentDto) {
    return await CreatePaymentUseCase.run(this.paymentRepository, message)
  }
}
