import { IsString, IsNumber, IsNotEmpty, IsUrl, IsOptional, Min, MaxLength } from 'class-validator';

export class CreateProductDto {

    @IsString()
    @IsNotEmpty({ message: 'title is required' })
    @MaxLength(120)
    title: string;

    @IsNumber()
    @IsNotEmpty({ message: 'price is required' })
    price: number;

    @IsString()
    @IsNotEmpty({ message: 'description is required' })
    description: string;

    @IsUrl()
    @IsNotEmpty({ message: 'image is required' })
    image: string;
}
