import React, { useState, useEffect } from "react";
import { staticData } from "../../static/Static";
import "./Products.css";
import '../navBar/NavBar.css'
import { FaSearch, FaVideo, FaTh, FaBell, FaUserCircle } from "react-icons/fa";
import logo from "../../assets/logo.svg";

function Products() {
  const [products, setProducts] = useState([]);
  const [displayedProducts, setDisplayedProducts] = useState(8);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const categories = [
    "All",
    "men's clothing",
    "women's clothing",
    "jewelery",
    "electronics",
  ];

  useEffect(() => {
    setProducts(staticData);
  }, []);

  useEffect(() => {
    const filteredProducts =
      selectedCategory === "All"
        ? staticData
        : staticData.filter((product) => product.category === selectedCategory);
    setProducts(filteredProducts);
    setDisplayedProducts(8);
  }, [selectedCategory]);

  const handleSeeMore = () => {
    setDisplayedProducts(displayedProducts + 8);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const filteredProducts = staticData.filter((product) =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setProducts(filteredProducts);
    setSelectedCategory("All"); 
    setDisplayedProducts(8);
    setSearchTerm(""); 
  };

  return (
    <section>
      <div className="navbar container">
        <div className="navbar__logo">
          <img src={logo} alt="Logo" />
        </div>
        <form className="navbar__search search-container container" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <button type="submit" className="search-button">
            <FaSearch />
          </button>
        </form>
        <div className="navbar__icons">
          <FaVideo />
          <FaTh />
          <FaBell />
          <FaUserCircle />
        </div>
      </div>
      <div>
        <div className="categories-container container" style={{ marginTop: "20px" }}>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={
                selectedCategory === category
                  ? "category-button active"
                  : "category-button"
              }
            >
              {category}
            </button>
          ))}
        </div>
        <div className="products-container container">
          {products.slice(0, displayedProducts).map((product) => (
            <div key={product.id} className="product-card">
              <img
                src={product.image}
                alt={product.title}
                className="product-image"
              />
              <div className="card-content">
                <h2 className="description">{product.title}</h2>
                <p className="description">{product.description}</p>
              </div>
              <p className="category">{product.category}</p>
            </div>
          ))}
        </div>
        {displayedProducts < products.length && (
          <div className="text-center">
            <button className="btn-see-more" onClick={handleSeeMore}>
              See More
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

export default Products;
