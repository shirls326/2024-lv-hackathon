import React, { useState } from 'react'
import { db } from '../../firebase/config';
import { push, ref, set } from 'firebase/database';

function NewProduct() {
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const [price, setPrice] = useState(-1.0);

  const handlePost = e => {
    e.preventDefault();

    // ensure all fields have been filled
    if (name === '' || desc === '' || price < 0) {
      console.error("Invalid input");
      return;
    }
    
    const newProduct = { name, desc, price, created: new Date().toISOString() };

    // create refs
    const productsRef = ref(db, 'products');
    const newProductRef = push(productsRef);

    // add new product to firebase
    set(newProductRef, newProduct).then(() => {
      console.log("Added " + newProduct);
    }).catch((error) => {
      console.error("Error adding " + newProduct + ": " + error);
    });
  }

  return (<>
    <h1>Create Product</h1>
    <input type="text" placeholder="Name" onChange={e => setName(e.target.value)} />
    <br />
    <input type="text" placeholder="Description" onChange={e => setDesc(e.target.value)} />
    <br />
    <input type="number" placeholder="Price" onChange={e => setPrice(e.target.value)} />
    <br />
    <button onClick={handlePost}></button>
  </>
  )
}

export default NewProduct