import { IPaymentRepositoryPort } from 'src/application/ports/payment.repository.port';
import { FindPaymentByIdUseCase } from './find-payment-by-id.use-case';
import { BadRequestException } from '@nestjs/common';
import { PaymentStatus } from 'src/domain/payment/payment.entity';

export class UpdatePaymentUseCase {
  static async run(
    repo: IPaymentRepositoryPort,
    orderId: string,
    paymentStatus: string,
  ) {
    const payment = await FindPaymentByIdUseCase.run(repo, orderId);

    if (payment === undefined) {
      throw new BadRequestException('Invalid Payment Id');
    }

    const status = Object.keys(PaymentStatus).find(
      (key) => String(key) === String(paymentStatus),
    );
    payment.status = Number(status);

    const updatedPayment = await repo.update(payment);

    return updatedPayment;
  }
}
