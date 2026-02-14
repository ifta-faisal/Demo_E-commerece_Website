import React, { useState, useMemo, useEffect } from 'react';
import './AllProducts.css';

const AllProducts = ({ products, onProductClick, initialCategory, initialVendor, convertPrice }) => {
    // ---- FILTER STATE ----
    const [selectedCategories, setSelectedCategories] = useState(initialCategory ? [initialCategory] : []);

    // ---- DYNAMIC DATA DERIVATION ----
    const { uniqueCategories, uniqueVendors, stockStats } = useMemo(() => {
        const catCounts = {};
        const vendCounts = {};
        let inStockCount = 0;
        let outStockCount = 0;

        products.forEach(p => {
            // Stock stats
            if (p.stock > 0) inStockCount++;
            else outStockCount++;

            // Dynamic Vendor Extraction
            // Use the vendor field directly. If empty, label as "Unbranded" or similar if desired.
            // For now, only count existing vendor strings.
            if (p.vendor) {
                const v = p.vendor.trim();
                if (v) {
                    vendCounts[v] = (vendCounts[v] || 0) + 1;
                }
            }

            // Dynamic Category Extraction
            if (p.category) {
                // Assuming categories might be comma-separated strings
                const parts = p.category.split(',').map(s => s.trim()).filter(s => s.length > 0);
                parts.forEach(c => {
                    catCounts[c] = (catCounts[c] || 0) + 1;
                });
            } else {
                catCounts['Uncategorized'] = (catCounts['Uncategorized'] || 0) + 1;
            }
        });

        // Convert to sorted arrays for the UI
        // Categories: Sort by Name or Count? Usually Name is better for browsing lists.
        const sortedCategories = Object.entries(catCounts).sort((a, b) => a[0].localeCompare(b[0]));
        const sortedVendors = Object.entries(vendCounts).sort((a, b) => a[0].localeCompare(b[0]));

        return {
            uniqueCategories: sortedCategories,
            uniqueVendors: sortedVendors,
            stockStats: { inStock: inStockCount, outStock: outStockCount }
        };
    }, [products]);

    useEffect(() => {
        if (initialCategory) {
            // Try to find exact match first, then case-insensitive
            const exactMatch = uniqueCategories.find(([cat]) => cat === initialCategory);
            if (exactMatch) {
                setSelectedCategories([initialCategory]);
            } else {
                const insensitiveMatch = uniqueCategories.find(([cat]) => cat.toLowerCase() === initialCategory.toLowerCase());
                if (insensitiveMatch) {
                    setSelectedCategories([insensitiveMatch[0]]);
                } else {
                    // Fallback / Partial Match Logic for specific known mappings
                    if (initialCategory === 'Drone FC & ESC' || initialCategory === 'FC & ESC') {
                        const fcMatch = uniqueCategories.find(([cat]) => cat.includes('FC') || cat.includes('ESC'));
                        if (fcMatch) setSelectedCategories([fcMatch[0]]);
                        else setSelectedCategories([initialCategory]);
                    }
                    else if (initialCategory === 'FRAMES') {
                        const frameMatch = uniqueCategories.find(([cat]) => cat.toLowerCase().includes('frame'));
                        if (frameMatch) setSelectedCategories([frameMatch[0]]);
                        else setSelectedCategories([initialCategory]);
                    }
                    else if (initialCategory === 'MOTORS') {
                        const motorMatch = uniqueCategories.find(([cat]) => cat.toLowerCase().includes('motor'));
                        if (motorMatch) setSelectedCategories([motorMatch[0]]);
                        else setSelectedCategories([initialCategory]);
                    }
                    else if (initialCategory === 'PROPELLERS') {
                        const propMatch = uniqueCategories.find(([cat]) => cat.toLowerCase().includes('prop'));
                        if (propMatch) setSelectedCategories([propMatch[0]]);
                        else setSelectedCategories([initialCategory]);
                    }
                    else if (initialCategory === 'BATTERIES') {
                        const battMatch = uniqueCategories.find(([cat]) => cat.toLowerCase().includes('batter'));
                        if (battMatch) setSelectedCategories([battMatch[0]]);
                        else setSelectedCategories([initialCategory]);
                    }
                    else if (initialCategory === 'ANTENNAS') {
                        const antMatch = uniqueCategories.find(([cat]) => cat.toLowerCase().includes('antenna'));
                        if (antMatch) setSelectedCategories([antMatch[0]]);
                        else setSelectedCategories([initialCategory]);
                    }
                    else if (initialCategory === 'Antennas') {
                        const antMatch = uniqueCategories.find(([cat]) => cat.toLowerCase().includes('antenna'));
                        if (antMatch) setSelectedCategories([antMatch[0]]);
                        else setSelectedCategories([initialCategory]);
                    }
                    else {
                        setSelectedCategories([initialCategory]);
                    }
                }
            }
        } else {
            setSelectedCategories([]);
        }
    }, [initialCategory, uniqueCategories]);

    // ---- FILTER STATE CONTINUED ----
    const [selectedVendors, setSelectedVendors] = useState(initialVendor ? [initialVendor] : []);

    useEffect(() => {
        if (initialVendor) {
            const exactMatch = uniqueVendors.find(([v]) => v === initialVendor);
            if (exactMatch) {
                setSelectedVendors([initialVendor]);
            } else {
                const insensitiveMatch = uniqueVendors.find(([v]) => v.toLowerCase() === initialVendor.toLowerCase());
                if (insensitiveMatch) {
                    setSelectedVendors([insensitiveMatch[0]]);
                } else {
                    setSelectedVendors([initialVendor]);
                }
            }
        } else {
            setSelectedVendors([]);
        }
    }, [initialVendor, uniqueVendors]);
    const [selectedPriceRanges, setSelectedPriceRanges] = useState([]);
    const [stockFilter, setStockFilter] = useState({ inStock: false, outStock: false });

    // View & Sort State
    const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'list'
    const [sortOption, setSortOption] = useState('created-descending');
    const [isSortOpen, setIsSortOpen] = useState(false);

    // Pagination State
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 12;

    // ---- FILTERING LOGIC ----
    const filteredProducts = useMemo(() => {
        return products.filter(p => {
            // 1. Stock Filter
            if (stockFilter.inStock && !stockFilter.outStock) {
                if (p.stock <= 0) return false;
            }
            if (!stockFilter.inStock && stockFilter.outStock) {
                if (p.stock > 0) return false;
            }

            // 2. Vendor Filter
            if (selectedVendors.length > 0) {
                if (!p.vendor) return false;
                // Exact match logic since selections come from the dynamic list
                if (!selectedVendors.includes(p.vendor.trim())) return false;
            }

            // 3. Category Filter
            if (selectedCategories.length > 0) {
                if (!p.category) {
                    if (!selectedCategories.includes('Uncategorized')) return false;
                } else {
                    const pCats = p.category.split(',').map(s => s.trim());
                    // Check if ANY of the product's categories match ANY of the selected categories
                    const hasMatch = pCats.some(cat => selectedCategories.includes(cat));
                    if (!hasMatch) return false;
                }
            }

            // 4. Price Filter
            if (selectedPriceRanges.length > 0) {
                const matchesPrice = selectedPriceRanges.some(rangeLabel => {
                    if (rangeLabel.includes("Under")) return p.price < 10;
                    if (rangeLabel.includes("10 -")) return p.price >= 10 && p.price <= 50;
                    if (rangeLabel.includes("50 -")) return p.price >= 50 && p.price <= 100;
                    if (rangeLabel.includes("100 -")) return p.price >= 100 && p.price <= 250;
                    if (rangeLabel.includes("250 -")) return p.price >= 250 && p.price <= 500;
                    if (rangeLabel.includes("500 -")) return p.price >= 500 && p.price <= 1000;
                    if (rangeLabel.includes("1,000 -")) return p.price >= 1000 && p.price <= 2500;
                    if (rangeLabel.includes("Above")) return p.price > 2500;
                    return false;
                });
                if (!matchesPrice) return false;
            }

            return true;
        });
    }, [products, selectedCategories, selectedVendors, selectedPriceRanges, stockFilter]);

    // ---- PAGINATION ----
    // ---- SORTING ----
    const sortedProducts = useMemo(() => {
        let sortable = [...filteredProducts];
        switch (sortOption) {
            case 'price-low':
                return sortable.sort((a, b) => a.price - b.price);
            case 'price-high':
                return sortable.sort((a, b) => b.price - a.price);
            case 'name-a-z':
                return sortable.sort((a, b) => a.name.localeCompare(b.name));
            case 'name-z-a':
                return sortable.sort((a, b) => b.name.localeCompare(a.name));
            case 'created-ascending':
                // Assuming original order is Descending, so we reverse it for Ascending
                return sortable.reverse();
            case 'created-descending':
            default:
                return sortable;
        }
    }, [filteredProducts, sortOption]);

    // ---- PAGINATION ----
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = sortedProducts.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);

    useEffect(() => {
        setCurrentPage(1);
    }, [selectedCategories, selectedVendors, selectedPriceRanges, stockFilter]);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // ---- HANDLERS ----
    const toggleCategory = (cat) => {
        // Single selection behavior: Check if already selected, if so deselect. If not, select ONLY this one.
        setSelectedCategories(prev => prev.includes(cat) ? [] : [cat]);
    };
    const toggleVendor = (vend) => {
        // Single selection: if already selected, deselect it (become empty). If not, select only this one.
        setSelectedVendors(prev => prev.includes(vend) ? [] : [vend]);
    };
    const togglePrice = (label) => {
        // Single selection behavior
        setSelectedPriceRanges(prev => prev.includes(label) ? [] : [label]);
    };
    const toggleStock = (type) => {
        setStockFilter(prev => {
            const newState = { ...prev, [type]: !prev[type] };
            // If verifying one, uncheck the other
            if (newState[type]) {
                const other = type === 'inStock' ? 'outStock' : 'inStock';
                newState[other] = false;
            }
            return newState;
        });
    };

    return (
        <div className="all-products-container">
            <h1 className="page-title">All Products</h1>

            {/* Top Control Bar */}
            <div className="control-bar">
                <div className="view-options">
                    <span>View As</span>
                    <div className="view-icons">
                        <svg
                            className={`view-icon ${viewMode === 'grid' ? 'active' : ''}`}
                            onClick={() => setViewMode('grid')}
                            width="18" height="18" fill="currentColor" viewBox="0 0 24 24"
                        >
                            <path d="M4 4h4v4H4zm6 0h4v4h-4zm6 0h4v4h-4zM4 10h4v4H4zm6 0h4v4h-4zm6 0h4v4h-4zM4 16h4v4H4zm6 0h4v4h-4zm6 0h4v4h-4z" />
                        </svg>
                        <svg
                            className={`view-icon ${viewMode === 'list' ? 'active' : ''}`}
                            onClick={() => setViewMode('list')}
                            width="18" height="18" fill="currentColor" viewBox="0 0 24 24"
                        >
                            <path d="M4 5h16v2H4zm0 6h16v2H4zm0 6h16v2H4z" />
                        </svg>
                    </div>
                </div>

                <div className="sort-options">
                    <div className="custom-select-wrapper" onClick={() => setIsSortOpen(!isSortOpen)}>
                        <div className="custom-select-trigger">
                            {sortOption === 'created-descending' && 'Created Descending'}
                            {sortOption === 'created-ascending' && 'Created Ascending'}
                            {sortOption === 'price-low' && 'Price: Low to High'}
                            {sortOption === 'price-high' && 'Price: High to Low'}
                            {sortOption === 'name-a-z' && 'Name: A-Z'}
                            {sortOption === 'name-z-a' && 'Name: Z-A'}
                            <svg width="10" height="6" viewBox="0 0 10 6" fill="none" style={{ marginLeft: '8px', stroke: '#333', strokeWidth: 1.5, transform: isSortOpen ? 'rotate(180deg)' : 'rotate(0)' }}><path d="M1 1L5 5L9 1" /></svg>
                        </div>
                        {isSortOpen && (
                            <div className="custom-options">
                                <div className={`custom-option ${sortOption === 'created-descending' ? 'selected' : ''}`} onClick={() => setSortOption('created-descending')}>Created Descending</div>
                                <div className={`custom-option ${sortOption === 'created-ascending' ? 'selected' : ''}`} onClick={() => setSortOption('created-ascending')}>Created Ascending</div>
                                <div className={`custom-option ${sortOption === 'price-low' ? 'selected' : ''}`} onClick={() => setSortOption('price-low')}>Price: Low to High</div>
                                <div className={`custom-option ${sortOption === 'price-high' ? 'selected' : ''}`} onClick={() => setSortOption('price-high')}>Price: High to Low</div>
                                <div className={`custom-option ${sortOption === 'name-a-z' ? 'selected' : ''}`} onClick={() => setSortOption('name-a-z')}>Name: A-Z</div>
                                <div className={`custom-option ${sortOption === 'name-z-a' ? 'selected' : ''}`} onClick={() => setSortOption('name-z-a')}>Name: Z-A</div>
                            </div>
                        )}
                    </div>
                    <span>{sortedProducts.length} Products</span>
                </div>
            </div>

            <div className="products-layout">
                {/* Sidebar */}
                <aside className="sidebar">
                    {/* STOCK STATUS */}
                    <div className="filter-group">
                        <div className="filter-title">
                            STOCK STATUS
                            <svg width="10" height="6" viewBox="0 0 10 6" fill="none" stroke="currentColor"><path d="M1 1L5 5L9 1" /></svg>
                        </div>
                        <ul className="filter-list">
                            <li className="filter-item">
                                <label>
                                    <input
                                        type="checkbox"
                                        checked={stockFilter.inStock}
                                        onChange={() => toggleStock('inStock')}
                                    /> In Stock
                                </label>
                                <span className="count">({stockStats.inStock})</span>
                            </li>
                            <li className="filter-item">
                                <label>
                                    <input
                                        type="checkbox"
                                        checked={stockFilter.outStock}
                                        onChange={() => toggleStock('outStock')}
                                    /> Out Of Stock
                                </label>
                                <span className="count">({stockStats.outStock})</span>
                            </li>
                        </ul>
                    </div>

                    <div className="sidebar-divider"></div>

                    {/* VENDOR */}
                    <div className="filter-group">
                        <div className="filter-title">
                            VENDOR
                            <svg width="10" height="6" viewBox="0 0 10 6" fill="none" stroke="currentColor"><path d="M1 1L5 5L9 1" /></svg>
                        </div>
                        <ul className="filter-list scrollable-list">
                            {uniqueVendors.map(([vendorName, count]) => (
                                <li className="filter-item" key={vendorName}>
                                    <label>
                                        <input
                                            type="checkbox"
                                            checked={selectedVendors.includes(vendorName)}
                                            onChange={() => toggleVendor(vendorName)}
                                        /> {vendorName}
                                    </label>
                                    <span className="count">({count})</span>
                                </li>
                            ))}
                        </ul>

                    </div>

                    <div className="sidebar-divider"></div>

                    {/* PRODUCT TYPE */}
                    <div className="filter-group">
                        <div className="filter-title">
                            PRODUCT TYPE
                            <svg width="10" height="6" viewBox="0 0 10 6" fill="none" stroke="currentColor"><path d="M1 1L5 5L9 1" /></svg>
                        </div>
                        <ul className="filter-list scrollable-list">
                            {uniqueCategories.map(([catName, count]) => (
                                <li className="filter-item" key={catName}>
                                    <label>
                                        <input
                                            type="checkbox"
                                            checked={selectedCategories.includes(catName)}
                                            onChange={() => toggleCategory(catName)}
                                        /> {catName}
                                    </label>
                                    <span className="count">({count})</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="sidebar-divider"></div>

                    {/* PRICE */}
                    <div className="filter-group">
                        <div className="filter-title">
                            PRICE
                            <svg width="10" height="6" viewBox="0 0 10 6" fill="none" stroke="currentColor"><path d="M1 1L5 5L9 1" /></svg>
                        </div>
                        <ul className="filter-list scrollable-list">
                            {[
                                "Under ৳ 10",
                                "৳ 10 - ৳ 50",
                                "৳ 50 - ৳ 100",
                                "৳ 100 - ৳ 250",
                                "৳ 250 - ৳ 500",
                                "৳ 500 - ৳ 1,000",
                                "৳ 1,000 - ৳ 2,500",
                                "Above ৳ 2,500"
                            ].map((label) => (
                                <li className="filter-item" key={label}>
                                    <label>
                                        <input
                                            type="checkbox"
                                            checked={selectedPriceRanges.includes(label)}
                                            onChange={() => togglePrice(label)}
                                        /> {label}
                                    </label>
                                </li>
                            ))}
                        </ul>
                    </div>
                </aside>

                {/* Product Grid */}
                <main className={`products-grid-area ${viewMode === 'list' ? 'list-view' : ''}`}>
                    {currentItems.length === 0 ? (
                        <div style={{ padding: '20px', width: '100%', textAlign: 'center', color: '#666' }}>
                            No products match your selection.
                        </div>
                    ) : (
                        currentItems.map((p, idx) => (
                            <div className="ap-product-card" key={idx} onClick={() => onProductClick(p)} style={{ cursor: 'pointer' }}>
                                <div className="ap-image-wrapper">
                                    {p.imageUrl ? (
                                        <img src={p.imageUrl} alt={p.name} />
                                    ) : (
                                        <div style={{ color: '#ccc', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>No Image</div>
                                    )}
                                    <div className="ap-add-to-cart-overlay">
                                        <svg width="16" height="16" fill="white" viewBox="0 0 24 24"><path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" /></svg>
                                        ADD TO CART
                                    </div>
                                </div>
                                <div className="ap-info">
                                    <div className="ap-title" title={p.name}>{p.name}</div>
                                    <div className="ap-vendor">{p.vendor}</div>
                                    <div className="ap-price">{convertPrice(p.price)}</div>
                                </div>
                            </div>
                        ))
                    )}
                </main>
            </div>

            {totalPages > 1 && (
                <div className="pagination">
                    <button
                        className="page-nav-btn prev"
                        disabled={currentPage === 1}
                        onClick={() => handlePageChange(currentPage - 1)}
                    >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1"><path d="M15 18l-6-6 6-6" /></svg>
                    </button>

                    <div className="page-numbers">
                        <PageNumbers
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={handlePageChange}
                        />
                    </div>

                    <button
                        className="page-nav-btn next"
                        disabled={currentPage === totalPages}
                        onClick={() => handlePageChange(currentPage + 1)}
                    >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1"><path d="M9 18l6-6-6-6" /></svg>
                    </button>
                </div>
            )}

            {/* Floating Rewards Button */}
            {/* <button className="earn-points-btn">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 6v6l4 2" />
                </svg>
                Earn NewBeePoints
            </button> */}
        </div>
    );
};

const PageNumbers = ({ currentPage, totalPages, onPageChange }) => {
    const pages = [];

    if (totalPages <= 6) {
        for (let i = 1; i <= totalPages; i++) {
            pages.push(i);
        }
    } else {
        pages.push(1);
        if (currentPage > 3) pages.push('...');
        let start = Math.max(2, currentPage - 1);
        let end = Math.min(totalPages - 1, currentPage + 1);
        if (currentPage <= 3) end = 4;
        if (currentPage >= totalPages - 2) start = totalPages - 3;
        for (let i = start; i <= end; i++) {
            if (i > 1 && i < totalPages) pages.push(i);
        }
        if (currentPage < totalPages - 2) pages.push('...');
        pages.push(totalPages);
    }

    const uniquePages = [...new Set(pages)];

    return uniquePages.map((page, index) => {
        if (page === '...') {
            return <span key={`ellipsis-${index}`} className="page-ellipsis">...</span>;
        }
        return (
            <button
                key={page}
                className={`page-num-btn ${currentPage === page ? 'active' : ''}`}
                onClick={() => onPageChange(page)}
            >
                {page}
            </button>
        );
    });
};

export default AllProducts;
