// React
import { useEffect, useState } from 'react'
// Firebase
import { auth, db } from '../../firebase/config';
import { query, orderByChild, equalTo, ref, get } from "firebase/database";
import { onAuthStateChanged } from 'firebase/auth';
// Components
import NavBar from '../../components/navbar.jsx';
import Sidebar from '../../components/Sidebar.jsx';
// Icon
import EditSVG from '/edit_icon.svg?url';
import LoadingSkeleton from '../../components/LoadingSkeleton';

function Profile() {
  const [userData, setUserData] = useState(null);
  const [userProducts, setUserProducts] = useState([]);
  const [userDataLoading, setUserDataLoading] = useState(true);
  const [productDataLoading, setProductDataLoading] = useState(true);

  // Function to retrieve user info by email
  async function getUserByEmail(email) {
    const usersRef = ref(db, 'users'); // Reference to the users node
    const emailQuery = query(usersRef, orderByChild('email'), equalTo(email)); // Query by email
    
    try {
      const snapshot = await get(emailQuery); // Fetch the snapshot
      if (snapshot.exists()) {
        const userData = Object.values(snapshot.val())[0]; // Extract user data
        setUserData(userData); // Set the user data in state
        console.log("User data found: ", userData);
      } else {
        console.log("No user found with the email:", email);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    } finally {
      setUserDataLoading(false);
    }
  }

  async function getProductsByUserID(userID) {
    const productsRef = ref(db, 'products'); 
    const userProductQuery = query(productsRef, orderByChild('seller'), equalTo(userID));
    
    try {
      const snapshot = await get(userProductQuery); // Fetch the snapshot
      if (snapshot.exists()) {
        const data = Object.values(snapshot.val())[0];
        setUserProducts(data); 
        console.log("Data found: ", data);
      } else {
        console.log("No products found with the userID:", userID);
      }
    } catch (error) {
      console.error("Error fetching products data for user:", error);
    } finally {
      setProductDataLoading(false);
    }
  }

  useEffect(() => {
    // Listen to the auth state change
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("User email", user.email);
        getUserByEmail(user.email); // Fetch user data using the email
        getProductsByUserID(user.uid)
      } else {
        setUserDataLoading(false);
        setProductDataLoading(false);
        console.log("No user is logged in.");
      }
    });

    // Cleanup the listener on unmount
    return () => unsubscribe();
  }, []);

  if (userDataLoading || productDataLoading) {
    return <LoadingSkeleton />
  }
  if (userData === null) {
    return <h1>No User Data</h1>
  }
  return (
    <>
      <Sidebar/>
      <NavBar/>

      <div className="pl-[20vw] pt-[9vh] !max-w-screen !h-screen box-border">
        {/* Profile Section */}
        <div className="h-[40%] box-border rounded-lg flex items-center justify-around bg-base-100">
          {/* Avatar Section */}
          <div className="flex items-center">
            <div className="avatar">
              <div className="w-[26vh] rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                <img src="https://placehold.co/100" alt="Profile" />
              </div>
            </div>
          </div>
          
          {/* User Info */}
          <div className='flex flex-col gap-6'>
            <div className="text-xl">
              <span className="font-bold">Name: </span>{userData.firstName + " " + userData.lastName}
            </div>
            <div className="text-xl">
              <span className="font-bold">School: </span>{userData.university}
            </div>
            <div className="text-xl">
              <span className="font-bold">Email: </span>{userData.email}
            </div>
            <div className="text-xl">
              <span className="font-bold">Password: </span>******
            </div>
          </div>

          {/* Edit Icon */}
          <div className='flex flex-col h-full pt-5 box-border'>
            <button className="btn btn-square btn-sm">
              <img src={EditSVG} />
            </button>
          </div>
        </div>

        {/* Saved Drafts Section */}
        <div className=" h-[60%] box-border bg-base-200 p-2 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">My Products</h2>
          <div className="grid grid-cols-2 gap-4">

            {userProducts && userProducts.length > 0 && userProducts.map((prod, index) => (
              <div key={`prod_${index}`} className="card card-compact bg-base-100 shadow-md">
                <figure>
                  <img src={prod.imgSrc} alt="High Chair" />
                </figure>
                <div className="card-body">
                  <h3 className="card-title">{prod.name}</h3>
                  <p>{prod.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;