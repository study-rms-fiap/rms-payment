import { ApiProperty } from '@nestjs/swagger';

class OrderItemsDto {
  @ApiProperty()
  product: string;
  @ApiProperty()
  quantity: number;
}

export class CreateOrderDto {
  @ApiProperty()
  orderId: string;
  @ApiProperty()
  client: string;
}
