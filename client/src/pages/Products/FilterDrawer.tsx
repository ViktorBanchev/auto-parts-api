import { useQuery } from '@tanstack/react-query';
import styles from './Products.module.css'
import { getCategories } from '../../services/categoryService';

export default function FilterDrawer({
    isOpen,
    onClose,
    selectedCategories,
    onCategoryChange,
    onClearFilters
}: {
    isOpen: boolean;
    onClose: () => void;
    selectedCategories: string[];
    onCategoryChange: (slug: string, isChecked: boolean) => void;
    onClearFilters: () => void;
}) {
    const { data: categories } = useQuery({
        queryKey: ['categories'],
        queryFn: getCategories
    })


    return (
        <>
            {isOpen && (
                <div
                    className={styles.overlay}
                    onClick={onClose}
                ></div>
            )}

            <div className={`${styles.drawer} ${isOpen ? styles.drawerOpen : ''}`}>
                <div className={styles.drawerHeader}>
                    <h2>Filters</h2>
                    <button onClick={onClose}>✕</button>
                </div>

                <div className={styles.drawerContent}>
                    {categories?.map(cat => (
                        <label key={cat.id}>
                            <input
                                type="checkbox"
                                value={cat.slug}
                                checked={selectedCategories.includes(cat.slug)}
                                onChange={(e) => onCategoryChange(e.target.value, e.target.checked)}
                            /> {cat.name}
                        </label>
                    ))}
                </div>

                <div className="p-6 border-t border-gray-100 bg-gray-50">
                    <button
                        onClick={onClearFilters}
                        disabled={selectedCategories.length === 0}
                        className="w-full py-3 bg-white border border-gray-300 text-slate-700 font-medium rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition"
                    >
                        Clear filters
                    </button>
                </div>
            </div>
        </>
    )
};
