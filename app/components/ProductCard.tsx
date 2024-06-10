import React from "react";
import { Product } from "../types";


interface ProductCardProps {
    product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    return (
        <div className="product-card p-4 bg-white rounded-lg shadow-md">
            <img className="w-full h-48 object-cover rounded-lg" src={product.image} alt={product.title} />
            <h3 className="text-blue-400 mt-4 text-lg font-bold">{product.title}</h3>
            <p className="text-gray-700 mt-2">{product.description}</p>
            <p className="text-green-600 font-semibold mt-4">{product.price} тг</p>
        </div>
    );
};

export default ProductCard;
