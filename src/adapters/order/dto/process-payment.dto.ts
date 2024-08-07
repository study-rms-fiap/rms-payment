import { ApiProperty } from "@nestjs/swagger";
import { PaymentStatus } from "src/domain/payment/payment.entity";

export class ProcessPaymentDto {
    @ApiProperty()
    paymentId: string

    @ApiProperty()
    status: PaymentStatus
}