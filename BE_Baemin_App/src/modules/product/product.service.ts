import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { PaginationDto } from './Dto/pagination-product.dto';
import { API_KEY_CLOUDINARY, API_SECRET_CLOUDINARY, CLOUD_NAME_CLOUDINARY } from 'src/common/constant/app.constant';
import { v2 as cloudinary, UploadApiResponse } from 'cloudinary';
@Injectable()
export class ProductService {
    constructor(private readonly prismaService : PrismaService) {}
    async getAllProduct() {
        const allProduct = await this.prismaService.foods.findMany({});
        return {
            message : 'Lấy danh sách món ăn thành công',
            ...allProduct,
        }
    }
    async getAllProductPagination(paginationDto: PaginationDto) {
        let { page, pageSize , search } = paginationDto;
        page = +page > 0 ? +page : 1;
        pageSize = +pageSize > 0 ? +pageSize : 3;
        search = search || ``;
        const skip = (page - 1) * pageSize;
        const where = { foodName: { contains: search } };
        const foods = await this.prismaService.foods.findMany({
            skip: skip,
            take: pageSize,
            orderBy: { createdAt: 'desc' },
            where: where,
        });
        if(!foods.length){
            throw new BadRequestException('Không tìm thấy món ăn nào');
        }
        const totalItem = await this.prismaService.foods.count({
            where: where,
          });
        const totalPage = Math.ceil(totalItem / pageSize);
        return {
            page: page,
            pageSize: pageSize,
            totalItem: totalItem,
            totalPage: totalPage,
            items: foods || [],
        };
    }
    async searchProduct(foodName: string) {
        const where = { foodName: { contains: foodName } };
        const food = await this.prismaService.foods.findMany({
            where: where
        });
        if (!food.length) {
            throw new BadRequestException('Không tìm thấy sản phẩm nào');
        }
        return food;
    }
    async addProduct(productData: any, file: Express.Multer.File) {
        cloudinary.config({
            cloud_name: CLOUD_NAME_CLOUDINARY,
            api_key: API_KEY_CLOUDINARY,
            api_secret: API_SECRET_CLOUDINARY,
        });
        const uploadResult: UploadApiResponse = await new Promise((resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream(
                { folder: 'images' },
                (error, result) => {
                    if (error) return reject(error);
                    resolve(result as UploadApiResponse);
                }
            );
            stream.end(file.buffer);
        });
        const category = await this.prismaService.categories.findUnique({
            where : { categoryId: productData.categoryId }
        })
        if(!category) throw new BadRequestException('Danh mục không tồn tại');
        const productToSave = {
            ...productData,
            foodImage: uploadResult.secure_url,
        };
        const foods = await this.prismaService.foods.create({
            data: productToSave,
        })
        return {
            message: 'Thêm sản phẩm thành công',
            ...foods,
        }
    }
    async getDetailProduct(foodId: string) {
        const existingProduct = await this.prismaService.foods.findUnique({
            where: { foodId: +foodId },  
        });
        if(!existingProduct){
            throw new BadRequestException('Sản phẩm không tồn tại');
        }
        const detailProduct = await this.prismaService.foods.findUnique({
            where: { foodId: +foodId },
        });
        return {
            message: 'Lấy thông tin sản phẩm thành công',
            ...detailProduct,
        }
    }
    async deleteProduct(foodId : string){
        const productId = +foodId;

        const existProduct = await this.prismaService.foods.findUnique({
            where: { foodId: +foodId },
        });
    
        if (!existProduct) {
            throw new BadRequestException('Sản phẩm không tồn tại');
        }
    
        const productDelete = await this.prismaService.foods.delete({
            where: { foodId: +foodId },
        });
    
        return {
            message: 'Xóa sản phẩm thành công',
            data: productDelete,
        };
    }
    async getAllProductType (){
        const productTypes = await this.prismaService.categories.findMany({
            where: {
                categoryName: {
                    not: null,
                },
            },
            distinct: ['categoryName'],
            select: {
                categoryName: true,
            },
        });
        if (!productTypes.length) {
            throw new BadRequestException('Không tìm thấy loại sản phẩm nào');
        }
        const response = productTypes.map((item) => item.categoryName); 
        return {
            message : 'Lấy danh sách loại sản phẩm thành công',
            data : response,
        }
    }
}
