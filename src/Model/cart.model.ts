export interface Cart {
    id: number;
    name: string;
    price: number;
    rating: number; // Optional property
    categoryId: number
    img: string
    description: string,
    brand_id: number,
    count: number
}