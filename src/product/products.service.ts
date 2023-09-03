import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Product } from './products.model';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product) private productRepository: typeof Product
  ) {}

  async createProduct(productDto: CreateProductDto) {
    try {
      const product = await this.productRepository.create(productDto);
      return product;
    } catch (error) {
      return new HttpException('Bad requiest', HttpStatus.BAD_REQUEST);
    }
  }

  async getProducts() {
    return await this.productRepository.findAll();
  }

  async getProductById(id: number) {
    const product = await this.productRepository.findOne({ where: { id } });
    if (!product) {
      return new HttpException('Product not found in database', HttpStatus.NOT_FOUND);
    }
    return product;
  }

  async deleteProduct(id: number) {
    try {
      await this.productRepository.destroy({ where: { id } });
    } catch (error) {
      return new HttpException('Bad requiest', HttpStatus.BAD_REQUEST);
    }
  }
}
