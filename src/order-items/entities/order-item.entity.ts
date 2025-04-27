import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Product } from 'src/products/entities/product.entity';
import { Order } from 'src/orders/entities/order.entity';

@Entity()
export class OrderItem {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    quantity: number;

    @Column('decimal', { precision: 10, scale: 2 })
    priceAtPurchaseTime: number;

    @ManyToOne(() => Order, (order) => order.orderItems, {
        onDelete: 'CASCADE',
    })
    order: Order;

    @ManyToOne(() => Product)
    product: Product;
}
