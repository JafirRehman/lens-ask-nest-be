import { IsUUID, IsNotEmpty } from 'class-validator';

export class CreateCartItemDto {
    @IsUUID()
    @IsNotEmpty()
    productId: string;

    @IsUUID()
    @IsNotEmpty()
    userId: string;
}