export interface ToastType {
  type: "success" | "error" | "info" | "warning" | undefined;
  message: string;
  visible: boolean;
}

export interface ProductType {
  id: number;
  name: string;
  brand: string;
  image: string;
  quantity: number;
  reservedQuantity: number;
  requestId: number;
  productId: number;
  createdAt: string;
  updatedAt: string;
}

export interface UserType {
  id: number;
  accountNumber: number;
  hashPassword: string;
  role: string;
  createdAt: string;
  updatedAt: string;
}

export interface CartType {
  id: number;
  name: string;
  brand?: string;
  image?: string;
  quantity: number;
  reservedQuantity?: number;
}

export interface RequestType {
  id: number;
  status: string;
  type: string;
  updatedAt: string;
  createdAt: string;
  productOrdereds: ProductType[];
  productReserveds: ProductType[];
  userId: number;
  freeProducts: string;
  code: number;
}
