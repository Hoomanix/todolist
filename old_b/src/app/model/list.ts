import { Item } from './item';

export interface List {    
  id?: string;
  uid?: string;
  items? : Array<Item>;  
  title: string;
}
