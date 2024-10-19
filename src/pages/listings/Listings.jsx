// React
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router';

// Firebase
import { auth, db } from '../../firebase/config';
import { onValue, ref } from 'firebase/database';
import { onAuthStateChanged } from 'firebase/auth';

// Components
import NavBar from '../../components/navbar.jsx';

function Listings() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {// ensure user is logged in
    onAuthStateChanged(auth, (user) => {
      console.log(user);
      if (user) {
        setUserID(user.uid);
        fetchProducts();
      } else {
        navigate('/login');
      }
    });
  }, []);

  // fetch products from firebase
  const fetchProducts = () => {
    const productsRef = ref(db, 'products');

    onValue(productsRef, (snapshot) => {
      const data = snapshot.val();
      const products = [];
      for (let id in data) {
        products.push({ id, ...data[id] });
      }
      setProducts(products);
    });
  }

  return (
    <>
      <NavBar />
      <div className="listings Container">

        {products.map(product => (
          <div key={product.id} className="product">
            <h2>{product.name}</h2>
            <p>{product.desc}</p>
            <p>{product.price}</p>
          </div>
        ))}
      </div>
    </>
  )
}

export default Listings;