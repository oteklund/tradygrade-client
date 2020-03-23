export interface Item {
  id: string;
  name: string;
  price: number;
  listedAt: Date;
  expires: Date;
  seller: string;
  category: string;
  sold: Boolean;
}
