import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 120 })
    title: string;

    @Column('decimal', { precision: 10, scale: 2 })
    price: number;

    @Column('text')
    description: string;

    @Column()
    image: string;

    @Column()
    category: string;

    @CreateDateColumn()
    createdAt: Date;
}
