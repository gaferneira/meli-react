export interface CartItem {
  id: string;
  title: string;
  quantity: number;
  price: number;
  total: number;
}

export interface Cart {
  items: CartItem[];
  totalItems: number;
}
