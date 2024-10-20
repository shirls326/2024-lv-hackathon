// React
import React, { useEffect, useState } from 'react'

// Firebase
import { auth, db } from '../../firebase/config';
import { onAuthStateChanged } from 'firebase/auth';
import { push, ref, set } from 'firebase/database';

// Components
import NavBar from '../../components/navbar.jsx';
import Sidebar from '../../components/Sidebar.jsx';
import { useNavigate } from 'react-router';

// AWS
import { PutObjectCommand } from '@aws-sdk/client-s3';

// Styles
import './NewProduct.css';
import { s3 } from '../../s3/config.js';

function NewProduct() {
  const [userID, setUserID] = useState('');
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const [price, setPrice] = useState(-1.0);
  const [error, setError] = useState('');
  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  // ensure user is logged in
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserID(user.uid);
      } else {
        navigate('/login');
      }
    });

    // Cleanup the listener on unmount
    return () => unsubscribe();
  }, [navigate]);

  const handlePost = async e => {
    e.preventDefault();

    // ensure all fields have been filled
    if (name === '' || desc === '' || price < 0) {
      console.error("Invalid input");
      return;
    }

    // create refs
    const productsRef = ref(db, 'products');
    const newProductRef = push(productsRef);

    
    try {
      // upload image to s3 if it exists
      if (image) { 
        const params = {
          Bucket: import.meta.env.VITE_AWS_S3_REKOG_BUCKET_NAME,
          Key: `uploads/${newProductRef.key}/${image.name}`,
          Body: image,
          ContentType: image.type,  // MIME type of the file
        };

        const command = new PutObjectCommand(params);
        await s3.send(command);
      }

      // create new product object
      const newProduct = {
        name,
        desc,
        price: Number(price),
        imgSrc: image ? `https://${params.Bucket}.s3.amazonaws.com/${params.Key}` : null,
        created: new Date().toISOString(),
        seller: userID
      };

      // add new product to firebase
      await set(newProductRef, newProduct);
      console.log("Added " + newProduct);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <NavBar />
      <Sidebar />
      <div className='newProductContainer'>
        <h3>Name</h3>
        <label className="input input-bordered flex items-center gap-2 border-2 border-[#717171] bg-[#f8f8f8]">
          <input type="text" className="grow text-black" onChange={e => setName(e.target.value)} />
        </label>
        <h3>Description</h3>
        <label className="input input-bordered flex items-center gap-2 border-2 border-[#717171] bg-[#f8f8f8]">
          <input type="text" className="grow text-black" onChange={e => setDesc(e.target.value)} />
        </label>
        <h3>Price</h3>
        <label className="input input-bordered flex items-center gap-2 border-2 border-[#717171] bg-[#f8f8f8]">
          <input type="text" className="grow text-black" onChange={e => setPrice(e.target.value)} />
        </label>
        <h1>Create Product</h1>
        <h3>Upload Image</h3>
        <label className="input input-bordered flex items-center gap-2 border-2 border-[#717171] bg-[#f8f8f8]">
          <input type="file" className="grow text-black" onChange={e => setImage(e.target.files[0])} />
        </label>
        <button onClick={handlePost} className='btn btn-success mt-4'>Create Product</button>
      </div>
    </>
  )
}

export default NewProduct