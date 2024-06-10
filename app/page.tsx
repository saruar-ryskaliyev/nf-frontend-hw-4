// app/page.tsx
"use client"; // Add this directive at the top

import React, { useState } from 'react';
import ProductList from './components/ProductList';
import ProductCreationPage from './components/ProductCreationPage';
import { Product } from './types';

const Page: React.FC = () => {
    const [newProducts, setNewProducts] = useState<Product[]>([]);

    const handleAddProduct = (product: Product) => {
        setNewProducts((prevProducts) => [...prevProducts, product]);
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Product Management</h1>
            <ProductCreationPage onAddProduct={handleAddProduct} />
            <ProductList newProducts={newProducts} />
        </div>
    );
};

export default Page;
