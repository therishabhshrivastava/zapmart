import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaCartPlus, FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../FirebaseAuth/FirebaseAuth";
import toast from "react-hot-toast";

const Products = ({ AddToCart }) => {
  const [allProducts, setAllProducts] = useState([]);
  const [originalProducts, setOriginalProducts] = useState([]);
  const [allCategory, setAllCategory] = useState([]);
  const [selectProducts, setSelectProducts] = useState("");
  const [searchItem, setSearchItem] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [user, setUser] = useState(null);

  // Check if user is logged in
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  // Fetch all products
  useEffect(() => {
    const fetchProducts = async () => {
      const res = await axios("https://fakestoreapi.com/products/");
      setAllProducts(res.data);
      setOriginalProducts(res.data);
    };
    fetchProducts();
  }, []);

  // Fetch all product categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios("https://fakestoreapi.com/products/categories");
        setAllCategory(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCategories();
  }, []);

  const filterProducts = (selectCategory) => {
    setSelectProducts(selectCategory);
    const filtered = selectCategory
      ? originalProducts.filter((item) => item.category === selectCategory)
      : originalProducts;
    setAllProducts(filtered);
  };

  const handleSearchItemButton = () => {
    const filtered = originalProducts.filter((item) =>
      item.title.toLowerCase().includes(searchItem.toLowerCase())
    );
    setAllProducts(filtered);
  };

  const handlePriceFilter = () => {
    const min = parseFloat(minPrice);
    const max = parseFloat(maxPrice);
    const filtered = originalProducts.filter(
      (item) => (!min || item.price >= min) && (!max || item.price <= max)
    );
    setAllProducts(filtered);
  };

  const handleAddToCart = (item) => {
    if (!user) {
      toast.error("You have to login to add items to cart");
      return;
    }
    AddToCart(item);
  };

  return (
    <>
      <div className="bg-[#e2e0e0] container w-[90%] mx-auto rounded-md py-4 mt-4 flex flex-col lg:flex-row items-center justify-between gap-4">
        {/* CATEGORY */}
        <div className="w-full lg:flex-1 text-center">
          <select
            onChange={(e) => filterProducts(e.target.value)}
            className="border py-2 px-4 rounded-md w-full"
          >
            <option value="">Filter by Category</option>
            {allCategory.slice(0, 6).map((item, index) => (
              <option value={item} key={index}>
                {item}
              </option>
            ))}
          </select>
        </div>

        {/* SEARCH PRODUCTS */}
        <div className="w-full lg:flex-[3] flex flex-col sm:flex-row items-center justify-center gap-2">
          <input
            type="text"
            placeholder="Search Item"
            className="w-full sm:w-[70%] md:w-[80%] p-3 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
            onChange={(e) => setSearchItem(e.target.value)}
            value={searchItem}
          />
          <button
            className="py-3 px-5 text-sm font-medium transition-all bg-red-500 text-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:outline-none focus:z-10 focus:ring-4 focus:ring-gray-500"
            onClick={handleSearchItemButton}
          >
            <FaSearch />
          </button>
        </div>

        {/* FILTER PRODUCTS */}
        <div className="w-full lg:flex-[2] flex flex-col sm:flex-row items-center justify-end gap-2">
          <input
            type="text"
            placeholder="Min Price"
            className="border px-3 py-2 rounded-md w-full sm:w-auto"
            onChange={(e) => setMinPrice(e.target.value)}
            value={minPrice}
          />
          <input
            type="text"
            placeholder="Max Price"
            className="border px-3 py-2 rounded-md w-full sm:w-auto"
            onChange={(e) => setMaxPrice(e.target.value)}
            value={maxPrice}
          />
          <button
            className="py-3 px-5 text-sm font-medium transition-all bg-red-500 text-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:outline-none focus:z-10 focus:ring-4 focus:ring-gray-500"
            onClick={handlePriceFilter}
          >
            <FaSearch />
          </button>
        </div>
      </div>

      {/* PRODUCT GRID */}
      <div className="bg-white">
        <div className="max-w-2xl mx-auto px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:gap-x-8">
            {allProducts.map((item, index) => (
              <div key={index} className="group relative">
                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                  />
                </div>

                <div className="mt-4 flex justify-between">
                  <div>
                    <Link to={`/singleproduct/${item.id}`}>
                      <h3 className="text-sm text-gray-700">
                        <span
                          aria-hidden="true"
                          className="absolute inset-0"
                        ></span>
                        {item.title}
                      </h3>
                    </Link>
                    <p className="mt-1 text-sm text-gray-500">
                      Rating: {item.rating.rate} ({item.rating.count} reviews)
                    </p>
                    <button
                      className="absolute top-5 right-1 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700"
                      onClick={() => handleAddToCart(item)}
                    >
                      <FaCartPlus size={20} />
                    </button>
                  </div>
                  <p className="text-sm font-medium text-gray-900">
                    Price: Rs.{item.price}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Products;
