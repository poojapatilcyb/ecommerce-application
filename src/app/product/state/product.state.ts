import { Product } from "../../../Model/product.model";

export interface ProductState {
    product: Product[]
};

export const productInitialState: ProductState = {
    product: [
        {
            "id": 1,
            "name": "Nike sneaker",
            "price": 15000,
            "rating": 1,
            "categoryId": 5,
            "img": "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/0558cdb5-4d42-4f4d-9b37-5038f1f97f9f/pegasus-41-road-running-shoes-RZm89S.png",
            "description": "Air Max 2017 Sneakers For Men  (Blue)",
            "brand_id": 1
        },
        {
            "id": 2,
            "name": "Adidas sports",
            "price": 2000,
            "rating": 2,
            "categoryId": 5,
            "img": "https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/61f3a688da6c483da7976fe295119e9d_9366/POMAZOR_SHOES_Grey_IQ9816_01_standard.jpg",
            "description": "Flodean M Walking Shoes For Men",
            "brand_id": 2
        },
        {
            "id": 3,
            "name": "SAMSUNG 183",
            "price": 5000,
            "rating": 3.5,
            "categoryId": 3,
            "img": "https://media-ik.croma.com/prod/https://media.croma.com/image/upload/v1713512832/Croma%20Assets/Large%20Appliances/Refrigerator/Images/306326_luucce.png?tr=w-640",
            "description": "SAMSUNG 183 L Direct Cool Single Door 4 Star Refrigerator with Base Drawer with Digital Inverter  (Camellia Purple, RR20C1824CR/HL)",
            "brand_id": 3
        },
        {
            "id": 4,
            "name": "LG 80 cm",
            "price": 10000,
            "rating": 4,
            "categoryId": 4,
            "img": "https://www.lg.com/content/dam/channel/wcms/in/images/tvs/55uq7500psf_atr_eail_in_c/55UQ7500PSF-450.jpg",
            "description": "Stay productive and improve your performance with the Super Retina XDR display that is comfortable for the eyes.",
            "brand_id": 4
        },
        {
            "id": 5,
            "name": "Apple iPhone 14 Plus",
            "price": 100000,
            "rating": 5,
            "categoryId": 1,
            "img": "https://www.digitaltrends.com/wp-content/uploads/2022/08/iPhone-SE-2022-Back.jpg?fit=3000%2C2000&p=1",
            "description": "Stay productive and improve your performance with the Super Retina XDR display that is comfortable for the eyes.",
            "brand_id": 5
        },
        {
            "id": 6,
            "name": "OnePlus Nord CE 3",
            "price": 10000,
            "rating": 2,
            "categoryId": 1,
            "img": "https://i.gadgets360cdn.com/products/large/oneplus-12r-blue-651x800-1706078842.jpg?downsize=*:180",
            "description": "OnePlus Nord CE 3 Lite 5G (Pastel Lime, 256 GB)  (8 GB RAM)",
            "brand_id": 6
        },
        {
            "id": 7,
            "name": "vivo T3x 5G",
            "price": 10000,
            "rating": 3,
            "categoryId": 1,
            "img": "https://in-exstatic-vivofs.vivo.com/gdHFRinHEMrj3yPG/1709633892940/8d2b048cc6f94321e93ac8940473eede.png",
            "description": "6 GB RAM | 128 GB ROM | Expandable Upto 1 TB and 17.07 cm (6.72 inch) Full HD+ Display",
            "brand_id": 7
        },
        {
            "id": 8,
            "name": "SAMSUNG Galaxy",
            "price": 10000,
            "rating": 4,
            "categoryId": 1,
            "img": "https://media-ik.croma.com/prod/https://media.croma.com/image/upload/v1705640892/Croma%20Assets/Communication/Mobiles/Images/303817_cc5lmd.png?tr=w-640",
            "description": "Behold the Samsung Galaxy S24 Ultra smartphone, an exceptional amalgamation of incredible technology and superior sophistication. Whether you're typing up a storm or jotting something down, Note Assist makes a long story short. Behold the Samsung Galaxy S24 Ultra smartphone, an exceptional amalgamation of incredible technology and superior sophistication. Whether you're typing up a storm or jotting something down, Note Assist makes a long story short.",
            "brand_id": 8
        },
        {
            "id": 9,
            "name": "SAMSUNG Galaxy1",
            "price": 60000,
            "rating": 4,
            "categoryId": 1,
            "img": "https://media-ik.croma.com/prod/https://media.croma.com/image/upload/v1705640892/Croma%20Assets/Communication/Mobiles/Images/303817_cc5lmd.png?tr=w-640",
            "description": "Behold the Samsung Galaxy S24 Ultra smartphone, an exceptional amalgamation of incredible technology and superior sophistication. Whether you're typing up a storm or jotting something down, Note Assist makes a long story short. Behold the Samsung Galaxy S24 Ultra smartphone, an exceptional amalgamation of incredible technology and superior sophistication. Whether you're typing up a storm or jotting something down, Note Assist makes a long story short.",
            "brand_id": 9
        }
    ]
}