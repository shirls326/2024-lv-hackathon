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
  const navigate = useNavigate();

  useEffect(() => {
    // Ensure user is logged in
    onAuthStateChanged(auth, (user) => {
      console.log(user);
      if (user) {
        fetchProducts();
      } else {
        navigate('/login');
      }
    });
  }, []);

  // Fetch products from firebase
  const fetchProducts = () => {
    const productsRef = ref(db, 'products');

    onValue(productsRef, (snapshot) => {
      const data = snapshot.val();
      console.log(data);
      
      const products = [];
      for (let id in data) {
        products.push({ id, ...data[id] });
      }
      setProducts(products);
      setFilteredProducts(products); // Initialize with all products
    });
  };

  // Filter products based on the selected category
  useEffect(() => {
    if (selectedCategory === 'All') {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(
        products.filter(product => product.tags && product.tags.includes(selectedCategory))
      );
    }
  }, [selectedCategory, products]);

  return (
    <>
      <Navbar />
      <Sidebar setSelectedCategory={setSelectedCategory} />
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
