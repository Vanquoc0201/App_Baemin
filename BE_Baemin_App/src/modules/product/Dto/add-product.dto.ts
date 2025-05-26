import { IsString , IsNotEmpty , IsNumber,} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class AddFoodDto {
  @IsString({ message: 'foodName phải là chuỗi' })
  @IsNotEmpty({ message: 'foodName không được để trống' })
  @ApiProperty({ example: 'Bánh mì thịt nướng' })
  foodName: string;

  @IsNumber({}, { message: 'foodPrice phải là số' })
  @Type(() => Number)
  @IsNotEmpty({ message: 'foodPrice không được để trống' })
  @ApiProperty({ example: 25000 })
  foodPrice: number;

  @IsString({ message: 'foodDescription phải là chuỗi' })
  @IsNotEmpty({ message: 'foodDescription không được để trống' })
  @ApiProperty({ example: 'Bánh mì thịt nướng kèm rau và nước sốt đặc biệt' })
  foodDescription: string;

  @IsNumber({}, { message: 'foodStock phải là số' })
  @Type(() => Number)
  @IsNotEmpty({ message: 'foodStock không được để trống' })
  @ApiProperty({ example: 100 })
  foodStock: number;

  @IsNumber({}, { message: 'categoryId phải là số' })
  @Type(() => Number)
  @IsNotEmpty({ message: 'categoryId không được để trống' })
  @ApiProperty({ example: 1 })
  categoryId: number;
}
