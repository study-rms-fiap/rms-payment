import { Order } from 'src/domain/order/order.entity';

export interface IOrderRepositoryPort {
  save(order: Order): Promise<Order>;
  update(order: Order): Promise<void>;
}
