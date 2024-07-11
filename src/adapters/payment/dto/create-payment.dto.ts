import { ApiProperty } from '@nestjs/swagger';

export class CreatePaymentDto {
  @ApiProperty()
  client: string;

  @ApiProperty()
  orderId: string;
}
