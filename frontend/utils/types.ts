export interface productType {
  id: number;
  image: any;
  name: string;
  price: number;
  quantity: number;
}

export type storeContextType = {
  shoppingList: productType[];
  addToCart: (product: productType,id:any,quantity:number) => void;
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

export type checkoutType = {
  name: string
  address: string;
  city: string;
  region: string;
  area: string;
  phone: string;
  setName:()=>void;
  setPhone:()=>void;
  setCity:()=>void;
  setAddress:()=>void;
  setRegion:()=>void;
  setArea:()=>void;
};
