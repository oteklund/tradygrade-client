export type User = {
  id?: number;
  name: string;
  email: string | null;
  password: string | null;
  image_url?: string | null;
  token: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean | null;
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

export type StoreState = {
  items: IItem[];
  user: User | undefined;
  users: User[];
};
