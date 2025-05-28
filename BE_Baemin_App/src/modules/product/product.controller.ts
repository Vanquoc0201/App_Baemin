import { Body, Controller, Delete, Get, MaxFileSizeValidator, ParseFilePipe, Post, Query, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ProductService } from './product.service';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiExtraModels, ApiQuery, getSchemaPath } from '@nestjs/swagger';
import { PaginationDto } from './Dto/pagination-product.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { AddFoodDto } from './Dto/add-product.dto';

@ApiExtraModels(AddFoodDto)
@Controller('Food')
export class ProductController {
    constructor(private readonly productService : ProductService){}
    @Get('LayDanhSachSanPham')
    @ApiBearerAuth('AccessToken')
    async getAllProduct(){
        return await this.productService.getAllProduct();
    }



    @Get('LayDanhSachSanPhamPhanTrang')
    @ApiBearerAuth('AccessToken')
    @ApiQuery({
        name: 'page',
        required: false,
        description: 'Nếu không truyền thì mặc định là 1',
        example: '1',
      })
      @ApiQuery({
        name: 'pageSize',
        required: false,
        description: 'Nếu không truyền thì mặc định là 3',
        example: '3',
      })
      @ApiQuery({
        name: 'search',
        required: false,
        description: 'Từ khóa tìm kiếm',
        example: 'ga ran',
      })
    async getAllProductPagination(
        @Query('page') page: string ,
        @Query('pageSize') pageSize: string,
        @Query('search') search: string
      ) {
        const paginationDto: PaginationDto = {
          page,
          pageSize,
          search,
        };
        return this.productService.getAllProductPagination(paginationDto);
    }

    @Get('TimKiemSanPham')
    @ApiBearerAuth('AccessToken')
    @ApiQuery({
        name: 'foodName',
        required: true,
        description: 'Tài khoản cần tìm kiếm',
        example: 'ga ran',
    })
    async searchProduct (
        @Query('foodName') foodName:string
    ){
        return this.productService.searchProduct(foodName)
    }


    @Post('ThemSanPham')
    @ApiBearerAuth('AccessToken')
    @UseInterceptors(FileInterceptor('foodImage'))
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        schema: {
          allOf: [
            { $ref: getSchemaPath(AddFoodDto) },
            {
              type: 'object',
              properties: {
                foodImage: {
                  type: 'string',
                  format: 'binary',
                },
              },
            },
          ],
        },
    })
    async addProduct(
        @Body()
        body : AddFoodDto,
        @UploadedFile(new ParseFilePipe({
            validators : [
                new MaxFileSizeValidator({maxSize : 1000000})
            ]
        }))
       file : Express.Multer.File
    ){
        const productData = {
            ...body,
            foodImage : file.filename
        }
        return this.productService.addProduct(productData,file);
    }

    @Get('LayThongTinSanPham')
    @ApiBearerAuth('AccessToken')
    @ApiQuery({
      name: 'foodId',
      required: true,
      description: 'foodId phải là chữ số',
      example: '1',
    })
    async getDetailMovie(
      @Query('foodId') foodId: string
    ){
      return this.productService.getDetailProduct(foodId)
    }
    @Delete('XoaSanPham')
    @ApiBearerAuth('AccessToken')
    @ApiQuery({
      name: 'foodId',
      required: true,
      description: 'foodId phải là chữ số',
      example: '1',
    })
    async deleteMovie(
      @Query('foodId') foodId: string
    ){
      return this.productService.deleteProduct(foodId)
    }

    @Get('LayDanhSachLoaiSanPham')
    @ApiBearerAuth('AccessToken')
    async getAllUserType(){
        return await this.productService.getAllProductType();
    }

}
