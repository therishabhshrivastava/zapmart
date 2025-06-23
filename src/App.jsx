import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { onAuthStateChanged } from 'firebase/auth';

import Home from './pages/Home/Home';
import Cart from './pages/Cart/Cart';
import Products from './pages/Products/Products';
import Login from './pages/Login/Login';
import SignUp from './pages/SingUp/SignUp';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import SingleProduct from './pages/SingleProduct/SingleProduct';

import { auth } from './FirebaseAuth/FirebaseAuth';

const App = () => {
  const [cart, setCart] = useState([]);
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [invalid, setInvalid] = useState('Invalid PromoCode');
  const [userName, setUserName] = useState('');

  // ✅ Add to Cart with Login Check
  const AddToCart = (product) => {
    if (!userName) {
      toast.error('Please login to add items to the cart');
      return;
    }

    const exists = cart.find((item) => item.id === product.id);
    if (exists) {
      const updatedCart = cart.map((item) =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      );
      setCart(updatedCart);
      toast.success('Product quantity updated');
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
      toast.success('Product added to cart');
    }
  };

  // ✅ Increase Quantity
  const handleIncrease = (id) => {
    const updated = cart.map((item) =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    );
    setCart(updated);
  };

  // ✅ Decrease Quantity
  const handleDecrease = (id) => {
    const updated = cart.map((item) =>
      item.id === id && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    );
    setCart(updated);
  };

  // ✅ Remove Item
  const handleRemove = (id) => {
    const updated = cart.filter((item) => item.id !== id);
    setCart(updated);
  };

  // ✅ Total Price
  const getTotalPrice = () => {
    const total = cart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    return total - discount;
  };

  // ✅ Promo Code Logic
  const applyPromoCode = () => {
    if (promoCode === 'DISCOUNT10') {
      setDiscount(getTotalPrice() * 0.1);
      setPromoCode('');
    } else {
      setInvalid('Invalid PromoCode');
    }
  };

  // ✅ Get User Name from Firebase
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserName(user.displayName);
      } else {
        setUserName('');
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <>
      <BrowserRouter>
        <Navbar cart={cart} userName={userName} />
        <Routes>
          <Route path="/" element={<Home AddToCart={AddToCart} />} />
          <Route
            path="/cart"
            element={
              <Cart
                cart={cart}
                setCart={setCart} // ✅ for dummy checkout to clear cart
                handleIncrease={handleIncrease}
                handleDecrease={handleDecrease}
                handleRemove={handleRemove}
                getTotalPrice={getTotalPrice}
                applyPromoCode={applyPromoCode}
                promoCode={promoCode}
                setPromoCode={setPromoCode}
                invalid={invalid}
                userName={userName}
              />
            }
          />
          <Route path="/products" element={<Products AddToCart={AddToCart} />} />
          <Route path="/singleproduct/:productId" element={<SingleProduct AddToCart={AddToCart} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
        <Toaster />
        <Footer />
      </BrowserRouter>
    </>
  );
};

export default App;
