export interface OrderUser {
  id: number;
  First_name: string;
  Last_name: string;
}

export interface OrderItem {
  // أضف الحقول هنا عندما ترسل لي
  // response الخاص بـ items
  [key: string]: unknown;
}

export interface SellingOrder {
  id: number;
  user_id: number;
  total: string;
  status: string;
  created_at: string;
  updated_at: string;
  type_of_payment: string;
  number_of_messages_payment: number;
  image_path: string | null;
  user: OrderUser;
  items: OrderItem[];
}

export interface PaginationLink {
  url: string | null;
  label: string;
  page: number | null;
  active: boolean;
}

export interface SellingOrdersResponse {
  current_page: number;
  data: SellingOrder[];

  first_page_url: string;
  from: number | null;
  last_page: number;
  last_page_url: string;

  links: PaginationLink[];

  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;

  to: number | null;
  total: number;
}