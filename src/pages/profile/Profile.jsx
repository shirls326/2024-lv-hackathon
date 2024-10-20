// React
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router';
// Firebase
import { auth, db } from '../../firebase/config';
import { onValue, ref } from 'firebase/database';
import { onAuthStateChanged } from 'firebase/auth';
import LoadingSkeleton from '../../components/LoadingSkeleton';
// Components
import NavBar from '../../components/navbar.jsx';
import Sidebar from '../../components/Sidebar.jsx';


function Profile() {
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
          <div className='flex flex-col justify-between'>
            <div className="text-xl font-semibold">
              <span className="font-bold">Name: </span>John Doe
            </div>
            <div className="text-xl font-semibold">
              <span className="font-bold">School: </span>EDU College
            </div>
            <div className="text-xl font-semibold">
              <span className="font-bold">Email: </span>johndoe332@college.edu
            </div>
            <div className="text-xl font-semibold">
              <span className="font-bold">Password: </span>*******
            </div>
          </div>

          {/* Edit Icon */}
          <div>
            <button className="btn btn-square btn-outline btn-sm">
              ✏️
            </button>
          </div>
        </div>

        {/* Saved Drafts Section */}
        <div className=" h-[60%] box-border bg-base-200 p-2 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">Saved Drafts</h2>
          <div className="grid grid-cols-2 gap-4">

            <div className="card card-compact bg-base-100 shadow-md">
              <figure>
                <img src="https://placehold.co/150x150" alt="High Chair" />
              </figure>
              <div className="card-body">
                <h3 className="card-title">High Chair</h3>
                <p>$20</p>
              </div>
            </div>

            <div className="card card-compact bg-base-100 shadow-md">
              <figure>
                <img src="https://placehold.co/150x150" alt="Pink Keurig" />
              </figure>
              <div className="card-body">
                <h3 className="card-title">Pink Keurig</h3>
                <p>N/A</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;