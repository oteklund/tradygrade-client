export type User = {
  username: string;
  email?: string;
  password?: string;
  image_url?: string;
};

export type IItem2 = {
  id?: string;
  name: string;
  description: string;
  sold: boolean;
  seller: string;
  category: string;
  price: number;
  listedAt: Date;
  expires: Date;
  condition: string;
  pictureURL: string;
};

export type IItem = {
  item: {
    id: string;
    name: string;
    description: string;
    sold: boolean;
    category: string;
    price: number;
    listedAt: Date;
    expires: Date;
    condition: string;
    pictureURL: string;
  };
  seller: {
    name: string;
    id: number;
  };
};

export type Authorization = {
  isAuthenticated: boolean | null;
  token: string | null;
  user: User | null;
};

export type StoreState = {
  items: IItem[];
  auth: Authorization;
};
