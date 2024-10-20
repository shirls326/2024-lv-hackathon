// React
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

// Firebase
import { auth, db } from '../../firebase/config';
import { onValue, ref } from 'firebase/database';
import { onAuthStateChanged } from 'firebase/auth';
import './Listings.css';

// components
import CardListing from '../../components/cardListing';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';

function Listings() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [userSavedListings, setUserSavedListings] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Ensure user is logged in
    onAuthStateChanged(auth, (user) => {
      if (user) {
        fetchProducts();
        fetchUserSavedListings(user.uid);
      } else {
        navigate('/login');
      }
    });
  }, []);

  // Fetch products from Firebase
  const fetchProducts = () => {
    const productsRef = ref(db, 'products');
    onValue(productsRef, (snapshot) => {
      const data = snapshot.val();
      const productsArray = [];
      for (let id in data) {
        productsArray.push({ id, ...data[id] });
      }
      setProducts(productsArray);
      setFilteredProducts(productsArray); // Initialize with all products
    });
  };

  // Fetch user's saved listings
  const fetchUserSavedListings = (userId) => {
    const savedRef = ref(db, `users/${userId}/saved`);
    onValue(savedRef, (snapshot) => {
      const savedListingsData = snapshot.val() || [];
      // Convert the saved listings to an array if it's not already one
      const savedListingsArray = Array.isArray(savedListingsData)
        ? savedListingsData
        : Object.keys(savedListingsData);
      setUserSavedListings(savedListingsArray);
    });
  };

  // Filter products based on the selected category
  useEffect(() => {
    if (selectedCategory === 'All') {
      setFilteredProducts(products);
    } else if (selectedCategory === 'Saved') {
      // Filter to only show saved listings
      setFilteredProducts(
        products.filter(product => userSavedListings.includes(product.id))
      );
    } else if (selectedCategory === 'Free') {
      // Filter to only show free listings
      setFilteredProducts(
        products.filter(product => product.price == 0)
      );
    } else {
      // Filter products by the selected category
      setFilteredProducts(
        products.filter(product => product.tags && product.tags.includes(selectedCategory))
      );
    }
  }, [selectedCategory, products, userSavedListings]);

  return (
    <>
      <Navbar />
      <Sidebar selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
      <div className="listings Container">
        <h1>RECENTLY ADDED</h1>
        <div className='listingsGrid'>
          {filteredProducts.map(product => (
            <CardListing key={product.id} id={product.id} imgSrc={product.imgSrc} name={product.name} price={product.price} />
          ))}
        </div>
      </div>
    </>
  );
}

export default Listings;
