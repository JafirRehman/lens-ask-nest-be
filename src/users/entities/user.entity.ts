import { Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinColumn } from 'typeorm';
import { UserRoleEnum } from 'src/common/enums';

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

    @Column('jsonb', { default: [] })
    cart: Array<{
        product: string;
        quantity: number;
    }>;
}