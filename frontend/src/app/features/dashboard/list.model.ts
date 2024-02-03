import { Item } from './item.model';

export interface List {
  name: string;
  description: string;
  items: Item[];
}
