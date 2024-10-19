import { db } from '../../firebase/config';
import { onValue, ref } from 'firebase/database';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router';

function Product() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  // fetch product data from firebase
  useEffect(() => {
    const productRef = ref(db, `products/${id}`);
    onValue(productRef, (snapshot) => {
      const data = snapshot.val();
      setProduct(data);
    });
  }, [id]);

  return (
    <>
      {product ? (
        <div className="product">
          <h2>{product.name}</h2>
          <p>{product.desc}</p>
          <p>{product.price}</p>
        </div>
      ) : (
        <h1>Error: Product not found</h1>
      )
      }
    </>
  )
}

export default Product;