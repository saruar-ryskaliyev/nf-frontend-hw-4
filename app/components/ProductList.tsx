// components/ProductList.tsx
import React from "react";
import { useQuery } from 'react-query';
import { fetchProducts } from '../services/productService';
import { Product } from "../types";
import ProductCard from './ProductCard';

interface ProductListProps {
    newProducts: Product[];
}

const ProductList: React.FC<ProductListProps> = ({ newProducts }) => {
    const { data: products, isLoading, isError } = useQuery<Product[], Error>('products', fetchProducts);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div>Error while fetching data</div>;
    }

    const allProducts = [...(products || []), ...newProducts];

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Products</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {allProducts.map(product => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    );
};

export default ProductList;
