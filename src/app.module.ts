import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { User } from './users/entities/user.entity';
import { SubscribersModule } from './subscribers/subscribers.module';
import { OrdersModule } from './orders/orders.module';
import { ProductsModule } from './products/products.module';
import { Order } from './orders/entities/order.entity';
import { Product } from './products/entities/product.entity';
import { Subscriber } from './subscribers/entities/subscriber.entity';
import { CartsModule } from './carts/carts.module';
import { CartItemsModule } from './cart-items/cart-items.module';
import { OrderItemsModule } from './order-items/order-items.module';
import { Cart } from './carts/entities/cart.entity';
import { CartItem } from './cart-items/entities/cart-item.entity';
import { OrderItem } from './order-items/entities/order-item.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      password: 'abc123',
      username: 'postgres',
      entities: [User, Subscriber, Order, Product, Cart, CartItem, OrderItem, Order],
      database: 'lens-ask',
      synchronize: true,
    }),
    UsersModule,
    SubscribersModule,
    OrdersModule,
    ProductsModule,
    CartsModule,
    CartItemsModule,
    OrderItemsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
