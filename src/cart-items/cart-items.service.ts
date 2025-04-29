import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCartItemDto } from './dto/cart-item.dtos';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CartItem } from './entities/cart-item.entity';
import { Product } from 'src/products/entities/product.entity';
import { User } from 'src/users/entities/user.entity';


@Injectable()
export class CartItemsService {
  constructor(
    @InjectRepository(CartItem)
    private readonly cartItemRepository: Repository<CartItem>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) { }

  async create(createCartItemDto: CreateCartItemDto) {
    const { productId, userId } = createCartItemDto;

    const product = await this.productRepository.findOne({ where: { id: productId } });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    const user = await this.userRepository.findOne({ where: { id: userId }, relations: ['cart', 'cart.cartItems', 'cart.cartItems.product'] });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const existingItem = user.cart.cartItems?.find(
      item => item.product.id === productId
    );

    if (existingItem) {
      existingItem.quantity += 1;
      await this.cartItemRepository.save(existingItem);
      return {
        message: 'Product added to cart successfully',
        cartItem: existingItem
      };
    }

    const cartItem = this.cartItemRepository.create({
      product,
      cart: user.cart,
    });
    await this.cartItemRepository.save(cartItem);

    return { message: 'Product added to cart successfully', cartItem };
  }

  async findAll() {
    const all_cartitems = await this.cartItemRepository.find();
    return { all_cartitems };
  }
}
