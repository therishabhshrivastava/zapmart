import React, { useEffect, useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../../FirebaseAuth/FirebaseAuth'; 
import { FaShoppingCart } from 'react-icons/fa';
import HomeIcon from "@mui/icons-material/Home";
import { HiOutlineBars3 } from "react-icons/hi2";
import { Box, Drawer, List, Divider, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { AiFillProduct } from "react-icons/ai";

const Navbar = ({ cart }) => {
  const [userName, setUserName] = useState(null);
  const [openMenu, setOpenMenu] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef();
  const navigate = useNavigate();

  // Listen for auth changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUserName(user?.displayName || null);
    });
    return () => unsubscribe();
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        setUserName(null);
        setDropdownOpen(false);
        navigate('/login');
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const menuOptions = [
    { text: "Home", icon: <HomeIcon />, link: '/' },
    { text: "Products", icon: <AiFillProduct />, link: '/products' },
  ];

  return (
    <div>
      <nav className="flex items-center justify-between min-h-[90px] px-10">
        {/* Logo */}
        <div className="flex items-center">
          <Link to='/'><h3 className="font-bold text-2xl cursor-pointer">Zap<span className='text-red-500'>Mart</span></h3></Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center">
          <ul className="flex items-center text-lg justify-center font-semibold">
            <Link to='/'><li className="mr-5 hover:text-gray-900 cursor-pointer">Home</li></Link>
            <Link to='/products'><li className="mr-5 hover:text-gray-900 cursor-pointer">Products</li></Link>
          </ul>
        </div>

        {/* Right Side */}
        <div className="flex items-center relative">
          {userName ? (
            <div className="relative mr-4" ref={dropdownRef}>
              <button
                className="font-semibold cursor-pointer bg-white px-4 py-2 rounded"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                {userName}
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 bg-white text-black border rounded shadow-md z-10 w-32">
                  <button
                    onClick={handleLogout}
                    className="block px-4 py-2 hover:bg-gray-100 w-full text-left"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to='/login'>
              <button className="py-[0.9rem] px-3 bg-white border-none rounded-full text-lg cursor-pointer font-semibold transition duration-200 hover:bg-gray-200">
                Login
              </button>
            </Link>
          )}

          {/* Cart */}
          <Link to='/cart'>
            <span className="absolute top-0 -right-1 bg-red-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
              {cart.length}
            </span>
            <button className="py-[0.9rem] px-3 bg-white border-none rounded-full text-lg cursor-pointer font-semibold transition duration-200 hover:bg-gray-200 flex items-center ml-4">
              <FaShoppingCart />
            </button>
          </Link>

          {/* Mobile Menu Toggle */}
          <HiOutlineBars3 className="text-xl cursor-pointer ml-4 lg:hidden" onClick={() => setOpenMenu(true)} />
        </div>

        {/* Mobile Drawer */}
        <Drawer open={openMenu} onClose={() => setOpenMenu(false)} anchor="right">
          <Box sx={{ width: 250 }} role="presentation" onClick={() => setOpenMenu(false)} onKeyDown={() => setOpenMenu(false)}>
            <List>
              {menuOptions.map((item) => (
                <ListItem key={item.text} disablePadding>
                  <ListItemButton>
                    <ListItemIcon>{item.icon}</ListItemIcon>
                    <Link to={item.link} className="text-black">
                      <ListItemText primary={item.text} />
                    </Link>
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
            <Divider />
          </Box>
        </Drawer>
      </nav>
    </div>
  );
};

export default Navbar;
