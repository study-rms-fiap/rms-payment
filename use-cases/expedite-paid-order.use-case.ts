import { IPaymentRepositoryPort } from 'src/application/ports/payment.repository.port';
import { FindPaymentByIdUseCase } from './find-payment-by-id.use-case';
import { BadRequestException } from '@nestjs/common';

export class ExpeditePaidOrderUseCase {
  static run(repo: IPaymentRepositoryPort, paymentId: string) {
    const payment = FindPaymentByIdUseCase.run(repo, paymentId);

    if (payment === undefined) {
      throw new BadRequestException(`Invalid Payment Id ${paymentId}`);
    }

    /** TODO falta implementar o order repo para chamar
     * o microservico de production e salvar o pedido
     */

    return null;
  }
}
