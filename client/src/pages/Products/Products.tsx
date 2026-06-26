import { useQuery } from '@tanstack/react-query';
import { getProducts } from '../../services/productService';
import ProductCard from '../../components/ProductCard/ProductCard';
import styles from './Products.module.css';
import { useState } from 'react';
import { useSearchParams } from 'react-router';
import FilterDrawer from './FilterDrawer';

export default function ProductsPage() {
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [searchParams, setSearchParams] = useSearchParams();

    const categoryParam = searchParams.get('category');
    const searchQuery = searchParams.get('search');
    const page = Number(searchParams.get('page')) || 1;
    const limit = Number(searchParams.get('limit')) || 5;

    const selectedCategories = categoryParam ? categoryParam.split(',') : [];

    const { data: products, isLoading, error } = useQuery({
        queryKey: ['products', categoryParam, searchQuery],
        queryFn: () => getProducts(categoryParam, searchQuery, page, limit),
        placeholderData: (previousData) => previousData
    });

    const handleCategoryChange = (categorySlug: string, isChecked: boolean) => {
        let updatedCategories = [...selectedCategories];
        
        if (isChecked) {
            updatedCategories.push(categorySlug)
        } else {
            updatedCategories = updatedCategories.filter(c => c !== categorySlug)
        }

        if (updatedCategories.length > 0) {
            searchParams.set('category', updatedCategories.join(','));
        } else {
            searchParams.delete('category');
        }
        setSearchParams(searchParams);
    }

    const clearFilters = () => {
        setSearchParams({});
    };

    if (isLoading) return <div>Loading catalog...</div>;
    if (error) return <div>Error loading catalog.</div>;



    return (
        <main className={styles.catalogContainer}>
            <div className={styles.headerRow}>
                <h1 className={styles.catalogTitle}>All Auto Parts</h1>
                
                <button
                    className={styles.filterBtn}
                    onClick={() => setIsFilterOpen(true)}
                >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
                    </svg>
                    Filters
                </button>
            </div>

            <div className={styles.productGrid}>
                {products?.map((product: any) => (
                    <ProductCard key={product.slug} {...product} />
                ))}
            </div>

            <FilterDrawer
                isOpen={isFilterOpen}
                onClose={() => setIsFilterOpen(false)}
                selectedCategories={selectedCategories}
                onCategoryChange={handleCategoryChange}
                onClearFilters={clearFilters}
            />

        </main>
    );
}