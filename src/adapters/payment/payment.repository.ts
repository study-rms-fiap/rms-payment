import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IPaymentRepositoryPort } from 'src/application/ports/payment.repository.port';
import {
  IPayment,
  Payment,
  PaymentStatus,
} from 'src/domain/payment/payment.entity';

export class PaymentRepository implements IPaymentRepositoryPort {
  constructor(
    @InjectModel(Payment.name) private paymentModel: Model<Payment>,
  ) {}

  findAll(): Promise<IPayment[]> {
    return this.paymentModel.find().exec();
  }

  findByStatus(status: PaymentStatus): Promise<IPayment[]> {
    return this.paymentModel.find({ status }).exec();
  }

  findById(id: string): Promise<IPayment> {
    return this.paymentModel.findById(id).exec();
  }

  create(payment: IPayment): Promise<IPayment> {
    const createdPayment = new this.paymentModel(payment);
    return createdPayment.save();
  }

  async update(payment: IPayment): Promise<IPayment> {
    return this.paymentModel.findByIdAndUpdate(payment, payment, {
      new: true,
    });
  }

  findByOrderId(orderId: string): Promise<IPayment> {
    return this.paymentModel.findOne({ orderId: orderId }).exec();
  }
}
