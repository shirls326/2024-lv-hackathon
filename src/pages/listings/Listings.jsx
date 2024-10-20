import React, { useEffect, useState } from 'react'
import { auth, db } from '../../firebase/config';
import { onValue, ref } from 'firebase/database';
import { onAuthStateChanged } from 'firebase/auth';

// component imports
import NavBar from '../../components/navbar.jsx';
import Sidebar from '../../components/sidebar.jsx';

function Listings() {
  const [products, setProducts] = useState([]);

  useEffect(() => {// ensure user is logged in
    onAuthStateChanged(auth, (user) => {
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
    ;
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
      <Sidebar />
      {/* <div className="listings Container">


        {products.map(product => (
          <div key={product.id} className="product">
            <h2>{product.name}</h2>
            <p>{product.desc}</p>
            <p>{product.price}</p>
          </div>
        ))}
      </div> */}
    </>
  )
}

export default Listings;