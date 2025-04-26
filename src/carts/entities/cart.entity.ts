import { Entity, PrimaryGeneratedColumn, OneToOne, OneToMany } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { CartItem } from 'src/cart-items/entities/cart-item.entity';

@Entity()
export class Cart {
    @PrimaryGeneratedColumn()
    id: number;

    @OneToOne(() => User, (user) => user.cart)
    user: User;

    @OneToMany(() => CartItem, (cartItem) => cartItem.cart, {
        cascade: true, // Automatically persist new items when added to cart.cartItems
        eager: true,   // Automatically load cartItems when fetching a Cart
    })
    cartItems: CartItem[];
}
