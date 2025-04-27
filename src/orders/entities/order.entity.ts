import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    ManyToOne,
    OneToMany,
} from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { OrderItem } from 'src/order-items/entities/order-item.entity';

@Entity()
export class Order {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ default: 'pending' })
    status: string; // e.g., pending, confirmed, shipped, delivered, cancelled

    @CreateDateColumn()
    createdAt: Date;

    @ManyToOne(() => User, (user) => user.orders)
    user: User;

    @OneToMany(() => OrderItem, (orderItem) => orderItem.order)
    orderItems: OrderItem[];
}
