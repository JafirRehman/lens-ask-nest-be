import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Cart } from 'src/carts/entities/cart.entity';
import { Product } from 'src/products/entities/product.entity';

@Entity()
export class CartItem {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    quantity: number;

    @ManyToOne(() => Cart, (cart) => cart.cartItems, {
        onDelete: 'CASCADE',
    })
    cart: Cart;

    @ManyToOne(() => Product, {
        eager: true,
    })
    product: Product;
}
