import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { medusa } from '../lib/medusa';
import ProductCard from '../components/ProductCard';

const CollectionDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [collection, setCollection] = useState<any | null>(null);
    const [products, setProducts] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            if (!id) return;
            setIsLoading(true);
            try {
                // Fetch collection details
                const { collection } = await medusa.collections.retrieve(id);
                setCollection(collection);

                // Fetch products in this collection
                const { products } = await medusa.products.list({
                    collection_id: [id]
                });
                setProducts(products);
            } catch (error) {
                console.error('Error fetching collection details:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [id]);

    if (isLoading) return <div className="p-12 text-center text-gray-500">Loading collection...</div>;
    if (!collection) return <div className="p-12 text-center text-red-500">Collection not found.</div>;

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="text-center mb-12">
                <Link to="/collections" className="text-gray-500 hover:text-primary text-sm mb-4 inline-block">&larr; Back to Collections</Link>
                <h1 className="text-4xl font-serif font-bold text-secondary">{collection.title}</h1>
            </div>

            {products.length === 0 ? (
                <p className="text-center text-gray-500">No products found in this collection.</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {products.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default CollectionDetails;
