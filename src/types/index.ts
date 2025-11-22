export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    image_url: string;
    stock: number;
    created_at: string;
}

export interface Order {
    id: string;
    user_email: string;
    total_amount: number;
    status: string;
    created_at: string;
}
