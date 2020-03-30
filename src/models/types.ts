export type User = {
  id?: number;
  name: string;
  email: string | null;
  password: string | null;
  image_url?: string | null;
  token: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean | null;
  isLoading: boolean | null;
};

export type Error = {
  message: object;
  status: number | null;
  id?: string | null;
};

export type IItem2 = {
  token: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean | null;
};

export type Item2 = {
  id?: string;
  name: string;
  description: string;
  sold: boolean;
  sellerId: number | undefined;
  category: string;
  price: number;
  listedAt: Date;
  expires: Date;
  condition: string;
  pictureURL: string;
};

export type Item = {
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
  items: Item[];
  user: User | undefined;
  error: any;
  users: User[];
};
