import { Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinColumn, OneToOne } from 'typeorm';
import { UserRoleEnum } from 'src/common/enums';
import { Cart } from 'src/carts/entities/cart.entity';

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ nullable: false })
    name: string;

    @Column({ nullable: false, unique: true })
    email: string;

    @Column({ nullable: false })
    password: string;

    @Column({ nullable: false })
    image: string;

    @Column({
        type: 'enum',
        enum: UserRoleEnum, default: UserRoleEnum.ADMIN
    })
    role: string;

    @OneToOne(() => Cart)
    @JoinColumn()
    cart: Cart;
}