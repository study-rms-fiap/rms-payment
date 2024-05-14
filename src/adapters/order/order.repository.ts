import { InjectRepository } from '@nestjs/typeorm';
import { IOrderRepositoryPort } from 'src/application/ports/order.repository';
import { Order } from 'src/domain/order/order.entity';
import { Repository } from 'typeorm';

export class OrderRepository implements IOrderRepositoryPort {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
  ) {}

  async save(order: Order): Promise<Order> {
    return await this.orderRepository.save(order);
  }
  async update(order: Order): Promise<void> {
    await this.orderRepository.update(order.id, order);
  }
}
