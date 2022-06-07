export interface productType {
  id: number;
  image: any;
  name: string;
  price: number;
}

export type storeContextType = {
  shoppingList: productType[];
  addToCart: (product: productType) => void;
};

export type productContextType = {
  productList: productType[];
};
