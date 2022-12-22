import { Item } from './item.model';

export interface ListDto {

  name: string;

  description: string;

  items: Item[];
}
