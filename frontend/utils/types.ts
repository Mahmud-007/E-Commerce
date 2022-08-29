export interface productType {
  id: number;
  image: any;
  name: string;
  price: number;
  quantity: number;
}

export type storeContextType = {
  shoppingList: productType[];
  addToCart: (product: productType, id: any, quantity: number) => void;
  getCart: () => void;
  totalPrice: Number;
};

export type productContextType = {
  productList: productType[];
};

export type userType = {
  avatar: string;
  hasBankAccount: boolean;
  token: string;
  userId: string;
  username: string;
  message: string;
};

export type userContextType = {
  avatar: string;
  hasBankAccount: boolean;
  token: string;
  userId: string;
  username: string;
  message: string;
  setAvatar: (avatar: string) => void;
  setHasBankAccount: (hasBankAccount: boolean) => void;
  setToken: (token: string) => void;
  setUserId: (userId: string) => void;
  setUsername: (username: string) => void;
  setMessage: (message: string) => void;
};

export type checkoutType = {
  name: string;
  address: string;
  city: string;
  region: string;
  area: string;
  phone: string;
  country: string;
  setName: (name:string) => void;
  setPhone: (phone:string) => void;
  setCity: (city:string) => void;
  setAddress: (address:string) => void;
  setRegion: (region:string) => void;
  setArea: (area:string) => void;
  setCountry: (country:string) => void;
};
