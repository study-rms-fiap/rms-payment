import { IPayment, PaymentStatus } from 'src/domain/payment/payment.entity';

export interface IPaymentRepositoryPort {
  findAll(): Promise<Array<IPayment>>;
  findByStatus(status: PaymentStatus): Promise<Array<IPayment>>;
  findById(id: string): Promise<IPayment>;
  create(payment: IPayment): Promise<IPayment>;
  update(payment: IPayment): Promise<IPayment>;
  findByOrderId(orderId: string): Promise<IPayment>;
}
