import React, { useState } from "react";
import ProductCard from "../products/ProductCard"; // Assuming ProductCard is already created
import { useFetchAllProductsQuery } from "../../redux/features/products/productApi";

const categories = [
  "Choose a Category",
  "Album",
  "Mixtape",
  "Single",
  "EPs",
  "Concert Tickets",
];

const BrowsePage = () => {
  const [selectedCategory, setSelectedCategory] = useState("Choose a Category");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("default");

  const { data: products = [] } = useFetchAllProductsQuery();
  console.log(products); // Debugging purpose

  // Filter products by category
  const filteredProducts = selectedCategory === "Choose a Category"
    ? products
    : products.filter((product) => product.category === selectedCategory);

  // Filter products by search term (name or artist)
  const searchFilteredProducts = filteredProducts.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.artistName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Sorting products based on selected sort option
  const sortedProducts = [...searchFilteredProducts];
  if (sortOption === "price-low-high") {
    sortedProducts.sort((a, b) => Number(a.new_price.$numberDecimal) - Number(b.new_price.$numberDecimal));
  } else if (sortOption === "price-high-low") {
    sortedProducts.sort((a, b) => Number(b.new_price.$numberDecimal) - Number(a.new_price.$numberDecimal));
  }

  // Clear all filters
  const clearFilters = () => {
    setSelectedCategory("Choose a Category");
    setSearchTerm("");
    setSortOption("default");
  };

  return (
    <div className="py-10">
      <h2 className="text-3xl font-semibold mb-6">Browse Products</h2>

      {/* Search Bar */}
      <div className="mb-8 flex items-center gap-4">
        <input
          type="text"
          placeholder="Search by Name or Artist"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border p-2 rounded-md w-64"
        />
        
        {/* Category Dropdown */}
        <select
          onChange={(e) => setSelectedCategory(e.target.value)}
          name="category"
          id="category"
          className="border p-2 rounded-md"
        >
          {categories.map((category, index) => (
            <option key={index} value={category}>
              {category}
            </option>
          ))}
        </select>

        {/* Sort Dropdown */}
        <select
          onChange={(e) => setSortOption(e.target.value)}
          name="sort"
          id="sort"
          className="border p-2 rounded-md"
        >
          <option value="default">Default</option>
          <option value="price-low-high">Price: Low to High</option>
          <option value="price-high-low">Price: High to Low</option>
        </select>

        {/* Clear Filters Button */}
        <button
          onClick={clearFilters}
          className="ml-4 bg-red-500 text-white p-2 rounded-md"
        >
          Clear Filters
        </button>
      </div>

      {/* Grid layout for products (2 per row) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {sortedProducts.length > 0 ? (
          sortedProducts.map((product, index) => (
            <div key={index} className="product-card-container">
              <ProductCard product={product} />
            </div>
          ))
        ) : (
          <p>No products found.</p>
        )}
      </div>
    </div>
  );
};

export default BrowsePage;
