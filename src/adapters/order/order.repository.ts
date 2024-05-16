import { IOrderRepositoryPort } from 'src/application/ports/order.repository';
import { Order } from 'src/domain/order/order.entity';

export class OrderRepository implements IOrderRepositoryPort {
  /** @TODO checar se vou colocar o httpclient aqui ou no modulo principal */
  async save(order: Order): Promise<void> {
    /** @TODO configurar a URL do payment e fazer a chamada */
  }
}
