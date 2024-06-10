"use client"; // Add this directive at the top

import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import './globals.css';

const queryClient = new QueryClient();

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <html lang="en">
            <head>
                <title>Product Management</title>
            </head>
            <body>
                <QueryClientProvider client={queryClient}>
                    <div className="app-layout">
                        {children}
                    </div>
                </QueryClientProvider>
            </body>
        </html>
    );
};

export default Layout;
