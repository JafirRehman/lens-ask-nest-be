import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Cart } from 'src/carts/entities/cart.entity';
import { Product } from 'src/products/entities/product.entity';

@Entity()
export class CartItem {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ default: 1 })
    quantity: number;

    @ManyToOne(() => Cart, (cart) => cart.cartItems, {
        onDelete: 'CASCADE',
    })
    cart: Cart;

    @ManyToOne(() => Product,{
        onDelete: 'CASCADE',
    })
    product: Product;
}
