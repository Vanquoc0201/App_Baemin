import { IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
  @ApiProperty({ example: 1 })
  userId: number;

    @IsOptional()
  @ApiProperty({ example: 'Võ Văn Quốc', required: false })
  name?: string;

  @ApiProperty({ example: 'vovanquoc@example.com' })
  email: string;

  @IsOptional()
  @ApiProperty({ example: '0909123456', required: false })
  phone?: string;

  @IsOptional()
  @ApiProperty({ example: 'quoc1234', required: false })
  password?: string;

  @IsOptional()
  @ApiProperty({ example: '13/5 Đông Hưng Thuận 19', required: false })
  address?: string;

  @IsOptional()
  @ApiProperty({ example: false, required: false })
  isDeleted?: boolean;
}