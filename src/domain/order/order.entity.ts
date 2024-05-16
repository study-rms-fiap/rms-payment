export interface IOrder {
  id: string;
  client: string;
}

export class Order implements IOrder {
  id: string;

  client: string;

  constructor(client: string, id: string) {
    this.client = client;
    this.id = id;
  }
}
