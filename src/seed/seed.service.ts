import { Injectable } from '@nestjs/common';
import { ProductsService } from 'src/products/products.service';
import { initialData } from './data/seedData';

@Injectable()
export class SeedService {
  constructor(private readonly productsService: ProductsService) {}
  async seedExecution() {
    await this.createNewProducts();
    return 'Seed execution';
  }

  async createNewProducts() {
    await this.productsService.deleteAllProducts();

    const products = initialData.products;

    const insertPromises = [];

    products.forEach((product) => {
      insertPromises.push(this.productsService.create(product));
    });

    return true;
  }
}
