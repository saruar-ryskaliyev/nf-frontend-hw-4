import React, { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { createProduct } from '../services/productService';
import { Product } from '../types';

interface ProductCreationPageProps {
    onAddProduct: (product: Product) => void;
}

const ProductCreationPage: React.FC<ProductCreationPageProps> = ({ onAddProduct }) => {
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    const [images, setImages] = useState<FileList | null>(null);

    const queryClient = useQueryClient();
    const mutation = useMutation(createProduct, {
        onSuccess: (data) => {
            queryClient.invalidateQueries('products');
            onAddProduct(data);
        }
    });

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        const imageUrls: string[] = [];

        if (images) {
            for (let i = 0; i < images.length; i++) {
                const file = images[i];
                const url = URL.createObjectURL(file); 
                imageUrls.push(url);
            }
        }

        const newProduct: Product = {
            id: Date.now(), 
            title,
            price: parseFloat(price),
            category,
            description,
            image: imageUrls[0], 
            images: imageUrls,
        };

        console.log(newProduct);
        mutation.mutate(newProduct);

        setTitle('');
        setPrice('');
        setCategory('');
        setDescription('');
        setImages(null);
    };

    return (
        <div className="max-w-xl mx-auto p-6 bg-white rounded-lg shadow-md">
            <h1 className="text-2xl font-bold mb-4">Create Product</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Title:</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-black"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Price:</label>
                    <input
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-black"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Category:</label>
                    <input
                        type="text"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-black"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Description:</label>
                    <input
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-black"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Images:</label>
                    <input
                        type="file"
                        multiple
                        onChange={(e) => setImages(e.target.files)}
                        className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-black"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    Create Product
                </button>
            </form>
        </div>
    );
};

export default ProductCreationPage;
