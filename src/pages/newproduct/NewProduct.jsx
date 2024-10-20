// React
import { useEffect, useState } from 'react'

// Firebase
import { auth, db } from '../../firebase/config';
import { onAuthStateChanged } from 'firebase/auth';
import { push, ref, set } from 'firebase/database';

// Components
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';
import { useNavigate } from 'react-router';
import MultiSelectDropdown from './MultiSelectDropdown.jsx';
import ConditionDropdown from './ConditionDropdown.jsx';
import CameraSVG from '../../assets/camera.svg';
import RedoSVG from '../../assets/redo.svg';

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
  const [tags, setTags] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [condition, setCondition] = useState('');
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
    setSubmitting(true);
    // ensure all fields have been filled
    if (name === '' || desc === '' || price < 0 || image === null || tags.length < 1 || condition === '') {
      console.error("Invalid input");
      setError("All input fields required.");
      setSubmitting(false);
      return;
    }

    // create refs
    const productsRef = ref(db, 'products');
    const newProductRef = push(productsRef);

    try {
      // upload image to s3 if it exists
      let imgSrc = null;
      if (image) {
        const params = {
          Bucket: import.meta.env.VITE_AWS_S3_REKOG_BUCKET_NAME,
          Key: `uploads/${newProductRef.key}/${image.name}`,
          Body: image,
          ContentType: image.type,  // MIME type of the file
        };

        const command = new PutObjectCommand(params);
        await s3.send(command);

        imgSrc = `https://${params.Bucket}.s3.amazonaws.com/${params.Key}`;
      }

      // create new product object
      const newProduct = {
        name,
        desc,
        price: Number(price),
        imgSrc,
        created: new Date().toISOString(),
        seller: userID,
        tags
      };

      // add new product to firebase
      await set(newProductRef, newProduct);
      console.log("Added " + newProduct);
      navigate(`/products/${newProductRef.key}`);
    } catch (error) {
      setError("ERROR: Could not create product.");
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  }


  return (
    <>
      <Navbar />
      <Sidebar />
      <div data-theme='light' className='newProductContainer pl-[calc(20vw+10rem)] pr-[10rem] pt-[calc(9vh+2rem)] pb-[7rem] !max-w-screen !h-screen !min-h-fit box-border overflow-y-auto'>
        {/* <h1>Create Product</h1> */}
        {/* Buttons */}
        <div className='flex flex-row justify-between'>
          <div>
            <h3>Upload Image*</h3>
            <div className="flex space-x-4">
              {/* Camera Button */}
              {/* <label className="btn btn-outline btn-square border-2 rounded-lg cursor-pointer">
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={e => setImage(e.target.files[0])}
                  disabled
                />
                <img src={CameraSVG} className='h-full w-auto'></img>
              </label> */}

              {image && 
                <div className='w-[20vw] h-[20vh]'>
                  <img src={URL.createObjectURL(image)} alt="given_image" className='max-w-full max-h-full object-cover rounded-lg'></img>
                </div>
              }

              {/* Add Button with Dashed Border for file upload */}
              <label className="btn btn-outline btn-square border-2 border-dashed rounded-lg cursor-pointer">
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={e => setImage(e.target.files[0])}
                />
                {image ?
                  <img src={RedoSVG} className='w-[70%] max-w-full max-h-full'></img>
                  :
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                  </svg>
                }

              </label>
            </div>
          </div>
          <div className='flex flex-col items-end'>
            <h3>Select Condition*</h3>
            <ConditionDropdown selectedCondition={condition} setSelectedCondition={setCondition} />
          </div>
        </div>



        <h3>Item Name*</h3>
        <label className="input input-bordered flex items-center gap-2 border-2 border-[#717171] bg-[#f8f8f8] h-[6vh] min-h-[6vh]">
          <input type="text" className="grow text-black" onChange={e => setName(e.target.value)} required />
        </label>
        
        <h3>Description*</h3>
        <textarea
          className="textarea textarea-bordered gap-2 border-2 border-[#717171] bg-[#f8f8f8] h-[20vh] max-w-full"
          onChange={e => setDesc(e.target.value)}
          required
        ></textarea>


        <div className='flex flex-row justify-between items-baseline'>
          <div>
            <h3>Select Tags (>= 1)*</h3>
            <MultiSelectDropdown selectedItems={tags} setSelectedItems={setTags} />
          </div>
          <div>
            <h3>Price*</h3>
            <label className="input input-bordered flex items-center gap-2 border-2 border-[#717171] bg-[#f8f8f8]">
              $
              <input type="number" className="grow text-black" onChange={e => setPrice(e.target.value)} required />
            </label>
          </div>


          <button onClick={handlePost} className='btn btn-success mt-auto'>
            {submitting ? <span className="loading loading-spinner"></span> : <span>Create Product</span>}
          </button>
        </div>
      </div>

      {error && error.length > 0 && 
        <div className="toast toast-start">
          <div className="alert alert-error">
            <span>{error}</span>
          </div>
        </div>
      }
    </>
  );
}

export default NewProduct