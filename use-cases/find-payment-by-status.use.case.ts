import { BadRequestException } from '@nestjs/common';
import { IPaymentRepositoryPort } from 'src/application/ports/payment.repository.port';
import { PaymentStatus } from 'src/domain/payment/payment.entity';

export class FindPaymentByStatusUseCase {
  static run(repo: IPaymentRepositoryPort, paymentStatus: number) {
    const status = Object.keys(PaymentStatus).find(
      (key) => String(key) === String(paymentStatus),
    );

    if (status === undefined) {
      throw new BadRequestException('Invalid Status');
    }

    return repo.findByStatus(Number(status));
  }
}
