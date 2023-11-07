'use client'
import React, { useState } from 'react';
import '../styles/FilterSidebar.css';
import { useFilterContext } from './FilterContext';

const FilterSidebar = () => {
    const filters = ['all', 'designable', 'designed'];
    const { selectedFilter, setSelectedFilter } = useFilterContext();

    // Function to handle filter changes
    const handleFilterChange = (name) => {
        setSelectedFilter(name);
    };

    return (

        <>
            <div className="filterSidebar">
                <h2>Categories</h2>
                {filters.map((filter, index) => (
                    <div className="filterSidebarOptions" key={index}>
                        <label>
                            <input
                                type="checkbox"
                                name={filter}
                                checked={selectedFilter === filter}
                                onChange={() => handleFilterChange(filter)}
                            />
                            {filter.charAt(0).toUpperCase() + filter.slice(1)}
                        </label>
                    </div>
                ))}
            </div>
        </>

    );
};

export default FilterSidebar;

