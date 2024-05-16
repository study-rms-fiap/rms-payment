import { IPaymentRepositoryPort } from 'src/application/ports/payment.repository.port';

export class FindPaymentByOrderIdUseCase {
  static run(repo: IPaymentRepositoryPort, orderId: string) {
    return repo.findByOrderId(orderId);
  }
}
