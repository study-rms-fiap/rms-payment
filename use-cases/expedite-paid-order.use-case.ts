import { IPaymentRepositoryPort } from 'src/application/ports/payment.repository.port';
import { BadRequestException, Inject } from '@nestjs/common';
import { FindPaymentByOrderIdUseCase } from './find-payment-by-order-id.use-case';
import kafka_config from 'kafka_config';
import { ClientKafka } from '@nestjs/microservices';

export class ExpeditePaidOrderUseCase {
  constructor(@Inject(kafka_config().services.payment.name) private paymentClient: ClientKafka){}

  test(input: any) {
    this.paymentClient.send('test', {...input})
  }
  
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
