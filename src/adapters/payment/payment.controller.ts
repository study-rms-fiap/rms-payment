import { Body, Controller, Get, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UpdatePaymentDTO } from './dto/update-payment.dto';
import { UpdatePaymentUseCase } from 'use-cases/update-payment.use-case';
import { PaymentRepository } from './payment.repository';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { CreatePaymentUseCase } from 'use-cases/create-payment.use-case';
import { FindPaymentByStatusUseCase } from 'use-cases/find-payment-by-status.use.case';
import { PaymentStatus } from 'src/domain/payment/payment.entity';
import { FindAllPaymentsUseCase } from 'use-cases/find-all-payments.use-case';

@ApiTags('Payments')
@Controller('Payments')
export class PaymentController {
  constructor(private readonly paymentRepository: PaymentRepository) { }

  @Get('')
  findAllPayments() {
    return FindAllPaymentsUseCase.run(this.paymentRepository);
  }

  @Post('')
  async savePayment(@Body() inputDto: CreatePaymentDto) {
    return await CreatePaymentUseCase.run(this.paymentRepository, inputDto);
  }

  @Put('')
  updatePayment(@Body() inputDto: UpdatePaymentDTO) {
    const { orderId, paymentStatus } = inputDto;
    return UpdatePaymentUseCase.run(
      this.paymentRepository,
      orderId,
      paymentStatus,
    );
  }

  @Get('/paid')
  findPaidPayments() {
    const status = PaymentStatus.PAID.valueOf();
    return FindPaymentByStatusUseCase.run(this.paymentRepository, status);
  }
}
