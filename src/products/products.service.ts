import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { CreateProductDto } from './dto/product.dtos';

@Injectable()
export class ProductsService {
    constructor(
        @InjectRepository(Product)
        private readonly productRepository: Repository<Product>,
    ) {}

    async create(createProductDto: CreateProductDto) {
        const { title, price, description, image } = createProductDto;
        const product = this.productRepository.create({
            title,
            price,
            description,
            image,
        });
        await this.productRepository.save(product);
        return { message: 'Product created successfully', product };
    }

    async findAll() {
        const all_products = await this.productRepository.find();
        return { all_products };
    }
}
