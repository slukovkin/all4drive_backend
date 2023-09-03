import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductService } from './products.service';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  create(@Body() productDto: CreateProductDto) {
    return this.productService.createProduct(productDto);
  }

  @Get()
  getProducts() {
    return this.productService.getProducts();
  }

  @Get('/:id')
  getProductById(@Param('id') id: number) {
    return this.productService.getProductById(id);
  }

  @Delete('/:id')
  deleteProductById(@Param('id') id: number) {
    return this.productService.deleteProduct(id);
  }
}
