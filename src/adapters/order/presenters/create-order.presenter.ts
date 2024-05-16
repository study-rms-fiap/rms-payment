import { Order } from 'src/domain/order/order.entity';

export interface ICreateOrderPresenter {
  orderId: string;
  client: string;
}

export class CreateOrderPresenter {
  static build(order: Order): ICreateOrderPresenter {
    return {
      client: order.client,
      orderId: order.id,
    };
  }
}
