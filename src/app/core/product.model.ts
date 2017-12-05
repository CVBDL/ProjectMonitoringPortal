import { Charts } from "./charts.model";

export class Product {
  id: string;
  title: string;
  charts: Charts[] = [];
}
