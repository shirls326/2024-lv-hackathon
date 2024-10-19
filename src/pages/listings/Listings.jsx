import React, { useEffect, useState } from 'react'


function Listings() {
  const [products, setProducts] = useState([]);
  
  useEffect(() => {
    // fetch products from firebase
    const ref = firebase.database().ref('products');
    ref.on('value', snapshot => {
      const state = snapshot.val();
      setProducts(state);
    });
  });


  return (
  <>
    <h1>Listings</h1>
    <div className="listings">
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