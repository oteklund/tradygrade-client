export type User = {
    username: string
    email?: string
    password?: string
    image_url?: string
}

export type IItem = {
    id: string;
    title: string;
    description: string;
    sold: boolean;
    seller: string;
    category: string;
    price: number;
    listedAt: Date;
    expires: Date;
    condition: string;
  }

export type Authorization = {
    isAuthenticated : boolean | null
    token : string | null
    user: User | null
}

export type StoreState = {
    items: IItem[];
    auth: Authorization
  }