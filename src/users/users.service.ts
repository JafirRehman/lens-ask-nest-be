import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/user.dtos';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { Cart } from 'src/carts/entities/cart.entity';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        @InjectRepository(Cart)
        private readonly cartRepository: Repository<Cart>,
    ) { }

    async create(create_user_dto: CreateUserDto) {
        const { name, email, password } = create_user_dto;

        const existing_user = await this.userRepository.findOne({ where: { email } });
        
        if (existing_user) {
            throw new ConflictException('User already exists');
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const user = this.userRepository.create({
            name,
            email,
            password: hashedPassword,
            image: `https://api.dicebear.com/6.x/initials/svg?seed=${name}&backgroundColor=00897b,00acc1,039be5,1e88e5,3949ab,43a047,5e35b1,7cb342,8e24aa,c0ca33,d81b60,e53935,f4511e,fb8c00,fdd835,ffb300,ffd5dc,ffdfbf,c0aede,d1d4f9,b6e3f4&backgroundType=solid,gradientLinear&backgroundRotation=0,360,-350,-340,-330,-320&fontFamily=Arial&fontWeight=600`,
        });
        await this.userRepository.save(user);

        const cart = this.cartRepository.create({
            user: user
        });

        await this.cartRepository.save(cart);

        return { message: 'signup successfull' };
    }

    async findAll() {
        const all_users = await this.userRepository.find();
        return { all_users };
    }

    async clearAllUsers() {
        const all_users = await this.userRepository.delete({});
        return { message: "db_cleared", all_users };
    }
}
