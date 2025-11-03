export interface Product {
  id: number;
  title: string;
  price: number;
  stock: number;
  thumbnail: string;
}

export interface ProductResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

export interface ProductDetail {
  id?: number;
  title?: string;
  description?: string;
  category?: string;
  price?: number;
  discountPercentage?: number;
  rating?: number;
  stock?: number;
  brand?: string;
  sku?: string;
  weight?: number;
  warrantyInformation?: string;
  shippingInformation?: string;
  availabilityStatus?: string;
  reviews?: ProductReview[];
  returnPolicy?: string;
  thumbnail?: string;
  images?: string[];
}

export interface ProductReview {
  rating?: number;
  comment?: string;
  date?: Date;
  reviewerName?: string;
  reviewerEmail?: string;
}
