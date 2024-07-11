import { ApiProperty } from '@nestjs/swagger';

export class UpdatePaymentDTO {
  @ApiProperty()
  orderId: string;

  @ApiProperty()
  paymentStatus: string;
}
