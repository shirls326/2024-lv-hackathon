// React
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';

// Firebase
import { auth, db } from '../../firebase/config';
import { onValue, ref, set } from 'firebase/database';
import { onAuthStateChanged } from 'firebase/auth';
import LoadingSkeleton from '../../components/LoadingSkeleton';

function capitalizeFirstLetterOfEachWord(str) {
  if (!str) return '';
  return str.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}

function formatDate(isoDateString) {
  const date = new Date(isoDateString);
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return date.toLocaleDateString(undefined, options);
}

function Product() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [userID, setUserID] = useState();
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState('light');
  const [previewImg, setPreviewImg] = useState(null);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserID(user.uid);
        checkIfSaved(user.uid);
      } else {
        navigate('/login');
      }
    });
  }, [navigate]);

  const checkIfSaved = (uid) => {
    const savedRef = ref(db, `users/${uid}/saved`);
    onValue(savedRef, (snapshot) => {
      const savedListings = snapshot.val() || [];
      setIsSaved(savedListings.includes(id));
    });
  };

  const toggleSaveListing = () => {
    const savedRef = ref(db, `users/${userID}/saved`);
    onValue(savedRef, (snapshot) => {
      const savedListings = snapshot.val() || [];
      let updatedListings;
      
      if (isSaved) {
        // Remove the listing ID from the saved listings
        updatedListings = savedListings.filter((listingID) => listingID !== id);
      } else {
        // Add the listing ID to the saved listings
        updatedListings = [...savedListings, id];
      }

      // Update Firebase with the new array of saved listings
      set(savedRef, updatedListings);
      setIsSaved(!isSaved); // Toggle the saved state locally
    }, { onlyOnce: true });
  };

  useEffect(() => {
    const productRef = ref(db, `products/${id}`);
    onValue(productRef, (snapshot) => {
      const data = snapshot.val();
      setProduct(data);
      setLoading(false);
    });
  }, [id]);

  useEffect(() => {
    if (product && product.imgSrc && product.imgSrc.length > 0) {
      setPreviewImg(product.imgSrc);
    }
  }, [product]);

  const handleReturnToProducts = (event) => {
    event.preventDefault();
    navigate('/products');
  };

  if (!userID) {
    navigate('/login');
  }
  if (loading) {
    return <LoadingSkeleton />;
  }
  if (product) {
    return (
      <div data-theme={theme} className="p-6 bg-white w-full h-screen min-h-fit overflow-auto box-border">
        {/* Close Button */}
        <div className="flex justify-end">
          <button className="btn btn-circle btn-outline" onClick={handleReturnToProducts}>✕</button>
        </div>

        <div className="flex flex-wrap lg:flex-nowrap gap-8 mt-4">
          {/* Main Image */}
          <div className="flex-grow border border-gray-300 rounded-lg overflow-hidden">
            {product.imgSrc && product.imgSrc.length > 0 &&
              <img src={previewImg} alt="Main Product Image" className="object-cover w-full h-full" />
            }
          </div>

          {/* Product Details Section */}
          <div className="flex flex-col w-full lg:w-1/3 p-4 rounded-lg shadow-lg bg-[#E7F6F1]">
            <h1 className="text-3xl font-bold">{capitalizeFirstLetterOfEachWord(product.name)}</h1>
            <p className="text-xl font-semibold mt-2">${product.price}</p>
            <p className="text-sm text-gray-500">Lehigh University</p>
            <div className="mt-4 flex gap-2">
              <button className="btn btn-outline btn-primary">Message</button>
              <button
                className={`btn ${isSaved ? 'btn-secondary' : 'btn-primary'}`}
                onClick={toggleSaveListing}
              >
                {isSaved ? 'Unsave Listing' : 'Save Listing'}
              </button>
            </div>

            {/* Details Section */}
            <div className="mt-6">
              <h2 className="font-bold text-lg">Details</h2>
              <p className="text-sm mt-2"><span className="font-semibold">Condition: </span>{capitalizeFirstLetterOfEachWord(product.condition)}</p>
              <p className="text-sm"><span className="font-semibold">Date Posted: </span>{formatDate(product.created)}</p>
            </div>

            <div className="mt-4">
              <p className="text-sm text-gray-700">{product.desc}</p>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return <h1>Error: Product not found</h1>;
  }
}

export default Product;
