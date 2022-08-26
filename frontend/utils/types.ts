export interface productType {
  id: number;
  image: any;
  name: string;
  price: number;
  quantity: number;
}

export type storeContextType = {
  shoppingList: productType[];
  addToCart: (product: productType) => void;
  getCart: () => void;
};

export type productContextType = {
  productList: productType[];
};

export type userType = {
  avatar: string;
  hasBankAccount: boolean;
  message: string;
  token: string;
  tokenSecret: string;
  userId: string;
  username: string;
};
