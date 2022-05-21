export interface productType {
  image: string;
  name: string;
  price: number;
  slug: null;
}

export type storeContextType = {
  shoppingList: productType[];
  addToCart: (product: productType) => void;
};

export type productContextType = {
  productList: productType[];
};
