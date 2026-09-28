import { Item } from './item.model';

export type List = {
  name: string;
  description: string;
  items: Item[];
};
