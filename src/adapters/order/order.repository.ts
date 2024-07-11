import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';

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
