import { IPaymentRepositoryPort } from 'src/application/ports/payment.repository.port';
import { BadRequestException } from '@nestjs/common';
import { FindPaymentByOrderIdUseCase } from './find-payment-by-order-id.use-case';

export class ExpeditePaidOrderUseCase {
  static async run(repo: IPaymentRepositoryPort, orderId: string) {
    const payment = await FindPaymentByOrderIdUseCase.run(repo, orderId);

    if (payment === null) {
      throw new BadRequestException(`Invalid Order Id ${orderId}`);
    }

    /** TODO falta implementar o order repo para chamar
     * o microservico de production e salvar o pedido
     */

    return null;
  }
}
