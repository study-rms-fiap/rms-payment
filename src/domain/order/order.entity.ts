import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

export interface IOrder {
  id: string;
  client: string;
  isPaid: boolean;
  createdAt: string;
  updateStatus(status: boolean): void;
}

@Entity()
export class Order implements IOrder {
  @PrimaryGeneratedColumn('increment')
  id: string;

  @Column({ type: 'text', nullable: true })
  client: string;

  @Column({ type: 'boolean' })
  isPaid: boolean;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  createdAt: string;

  constructor(client: string) {
    this.client = client;
    this.isPaid = false;
  }

  updateStatus(status: boolean): void {
    this.isPaid = status;
  }
}
