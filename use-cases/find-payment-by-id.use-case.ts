import { IPaymentRepositoryPort } from 'src/application/ports/payment.repository.port';

export class FindPaymentByIdUseCase {
  static run(repo: IPaymentRepositoryPort, id: string) {
    return repo.findById(id);
  }
}
