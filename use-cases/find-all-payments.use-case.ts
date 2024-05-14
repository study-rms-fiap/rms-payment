import { IPaymentRepositoryPort } from 'src/application/ports/payment.repository.port';

export class FindAllPaymentsUseCase {
  static run(repo: IPaymentRepositoryPort) {
    return repo.findAll();
  }
}
