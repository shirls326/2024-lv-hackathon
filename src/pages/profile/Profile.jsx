// React
import { useEffect, useState } from 'react'
// Firebase
import { auth, db } from '../../firebase/config';
import { query, orderByChild, equalTo, ref, get, set } from "firebase/database";
import { onAuthStateChanged } from 'firebase/auth';
// Components
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';
// Icon
import EditSVG from '../../assets/edit_icon.svg';
import LoadingSkeleton from '../../components/LoadingSkeleton';
import placeholder from '../../assets/product_placeholder.svg';

function Profile() {
  const [userId, setUserId] = useState(null);
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
        setUserData(userData); // Set the user data in state, add ID
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
    // Listen to the auth state change (REQUIRED, otherwise auth.currentUser is NULL)
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("User email", user.email);
        setUserId(user.uid);
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
      <Sidebar />
      <Navbar />

      <div data-theme="light" className="pl-[20vw] pt-[9vh] !max-w-screen !h-screen box-border">
        {/* Profile Section */}
        <div className="h-[40%] box-border rounded-lg flex items-center justify-around bg-base-100">
          {/* Avatar Section */}
          <div className="flex items-center">
            <div className="avatar">
              <div className="w-[26vh] rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                <img src={placeholder} alt="Profile" />
              </div>
            </div>
          </div>

          {/* User Info */}
          <div className='flex flex-col gap-6'>
            <div className="text-3xl">
              <span className="font-bold">Name: </span>{userData.firstName + " " + userData.lastName}
            </div>
            <div className="text-3xl">
              <span className="font-bold">School: </span>{userData.university}
            </div>
            <div className="text-3xl">
              <span className="font-bold">Email: </span>{userData.email}
            </div>
            <div className="text-3xl">
              <span className="font-bold">Password: </span>******
            </div>
          </div>

          {/* Edit Icon */}
          <div className='flex flex-col h-full pt-5 box-border'>
            <button className="btn btn-square btn-sm" onClick={() => document.getElementById('edit_profile_modal').showModal()}>
              <img src={EditSVG} />
            </button>
          </div>
        </div>

        {/* 'My Products' Section */}
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

        <EditProfileModal userData={{ uid: userId, ...userData }} />
      </div>
    </>
  );
}

// eslint-disable-next-line react/prop-types
const InputTitle = ({ children }) => {
  return <h2 className='mb-[0.2rem] mt-[1rem] font-thin'>{children}</h2>
}
// eslint-disable-next-line react/prop-types
const TextInput = ({ children, getter, setter }) => {
  return <>
    <InputTitle>{children}</InputTitle>
    <label className="input input-bordered flex items-center gap-2 border-2 border-[#717171] bg-[#f8f8f8]">
      <input
        type="text"
        value={getter}
        onChange={e => setter(e.target.value)}
        className="grow"
      />
    </label>
  </>
}

function EditProfileModal({ userData }) {
  console.log(userData);

  const [firstName, setFirstName] = useState(userData.firstName);
  const [lastName, setLastName] = useState(userData.lastName);

  function handleSave() {
    console.log("Saving profile changes to DB");

    // update user data in DB
    const userRef = ref(db, 'users/' + userData.uid);

    set(userRef, {
      firstName: firstName,
      lastName: lastName,
      uniID: userData.uniID,
      university: userData.university,
      email: userData.email,
      verified: userData.verified
    }, { merge: true });

    // close the modal
    document.getElementById('edit_profile_modal').close();
  }

  return <>
    <button className="btn" ></button>
    <dialog id="edit_profile_modal" className="modal">
      <div className="modal-box">
        <form method="dialog">
          {/* if there is a button in form, it will close the modal */}
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
        </form>
        <h1>Edit Profile</h1>

        <div className='flex flex-col justify-center gap-1'>
          <div>
            <TextInput init={userData.firstName} getter={firstName} setter={setFirstName}>First Name</TextInput>
          </div>
          <div>
            <TextInput init={userData.lastName} getter={lastName} setter={setLastName}>Last Name</TextInput>
          </div>

          {/* save to DB on submission */}
          <button className='btn btn-success mt-4' onClick={handleSave}>Save Changes</button>
        </div>
        <p className="py-4">Press ESC key or click on ✕ button to close</p>
      </div>
    </dialog>
  </>;
}

export default Profile;