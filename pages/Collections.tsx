import React, { useState, useEffect } from 'react';
import { medusa } from '../lib/medusa';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const Collections: React.FC = () => {
    const [collections, setCollections] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchCollections = async () => {
            try {
                const { collections } = await medusa.collections.list();
                setCollections(collections);
            } catch (error) {
                console.error('Error fetching collections:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchCollections();
    }, []);

    if (isLoading) return <div className="p-12 text-center text-gray-500">Loading collections...</div>;

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-4xl font-serif font-bold mb-8 text-center text-secondary">Collections</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {collections.map((collection) => (
                    <Link
                        key={collection.id}
                        to={`/collections/${collection.id}`}
                        className="group block bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100"
                    >
                        <div className="h-48 bg-light-beige flex items-center justify-center overflow-hidden relative">
                            {/* Placeholder or specific collection image if available in metadata */}
                            <div className="text-secondary opacity-20 font-serif text-6xl font-bold">
                                {collection.title.charAt(0)}
                            </div>
                            <div className="absolute inset-0 bg-black/5 group-hover:bg-black/0 transition-colors" />
                        </div>
                        <div className="p-6">
                            <h2 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">{collection.title}</h2>
                            <div className="flex items-center text-primary font-medium text-sm">
                                Shop Collection <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Collections;
