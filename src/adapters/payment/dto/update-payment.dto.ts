import { ApiProperty } from '@nestjs/swagger';

export class UpdatePaymentDTO {
  @ApiProperty()
  paymentId: string;

  @ApiProperty()
  paymentStatus: string;
}
