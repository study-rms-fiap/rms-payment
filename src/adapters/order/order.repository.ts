import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { IOrderRepositoryPort } from 'src/application/ports/order.repository';
import { Order } from 'src/domain/order/order.entity';

Injectable()
export class OrderRepository  {
  constructor(
    @Inject('PAYMENT_API')
    private readonly kakfaClient: ClientKafka
  ) {}

  emit(input:any) {
    return this.kakfaClient.emit('process_payment', input)
  }
}
