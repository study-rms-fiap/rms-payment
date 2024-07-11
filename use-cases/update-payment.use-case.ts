import { IPaymentRepositoryPort } from 'src/application/ports/payment.repository.port';
import { BadRequestException } from '@nestjs/common';
import { PaymentStatus } from 'src/domain/payment/payment.entity';
import { FindPaymentByOrderIdUseCase } from './find-payment-by-order-id.use-case';

export class UpdatePaymentUseCase {
  static async run(
    repo: IPaymentRepositoryPort,
    orderId: string,
    paymentStatus: string,
  ) {
    const payment = await FindPaymentByOrderIdUseCase.run(repo, orderId)

    if (payment === undefined) {
      throw new BadRequestException('Invalid Payment Id');
    }

    const status = Object.keys(PaymentStatus).find(
      (key) => String(key) === String(paymentStatus),
    );

    if(status === undefined) {
      throw new BadRequestException('Invalid Payment Status')
    }
    payment.status = Number(status);

    const updatedPayment = await repo.update(payment);

    return updatedPayment;
  }
}
