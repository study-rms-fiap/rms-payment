import { CreatePaymentDto } from 'src/adapters/payment/dto/create-payment.dto';
import { IPaymentRepositoryPort } from 'src/application/ports/payment.repository.port';
import { Payment, PaymentStatus } from 'src/domain/payment/payment.entity';

export class CreatePaymentUseCase {
  static run(repo: IPaymentRepositoryPort, payment: CreatePaymentDto) {
    const newPayment = new Payment(payment.client, payment.orderId);

    newPayment.updateStatus(PaymentStatus.PENDING);
    return repo.create(newPayment);
  }
}
