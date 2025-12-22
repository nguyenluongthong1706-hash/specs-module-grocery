import { IsString, IsNotEmpty, IsNumber, Min, IsOptional, IsInt } from 'class-validator';

export class CreateProductDto {
  @IsString({ message: 'Tên sản phẩm phải là chuỗi ký tự' })
  @IsNotEmpty({ message: 'Tên sản phẩm không được để trống' })
  name!: string;

  @IsNumber({}, { message: 'Giá tiền phải là số' })
  @Min(0, { message: 'Giá tiền không được nhỏ hơn 0' })
  price!: number;

  @IsInt({ message: 'Tồn kho phải là số nguyên' })
  @Min(0, { message: 'Tồn kho không được âm' })
  stock!: number;

  @IsInt({ message: 'Category ID phải là số nguyên' })
  categoryId!: number;

  @IsOptional()
  @IsString()
  description?: string;
  
  @IsOptional()
  @IsString()
  image?: string;
}