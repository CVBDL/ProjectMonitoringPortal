import { Product } from "./product.model";

export class Bucket {
  id: string = '';
  title: string = '';
  products: Product[] = [];
}
