export type Order = {
  id: string;
  waiterName: string;
  code: string;
  time: string;
  type: string;
  smsEnabled: boolean;
  clientName: string;
  items: OrderItem[];
  price: number; 
};

export type OrderItem = {
  name: string;
  quantity: number;
  price: number;
  image: string;
  extras?: {
    name: string;
    price: number;
  }[];
  notes?: string;
};
