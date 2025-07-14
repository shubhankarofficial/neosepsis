"use client";
import { useState } from 'react';
import { useSession, signIn } from "next-auth/react";
import Checklist from "@components/Checklist";

const Home = () => {
  const { data: session, status } = useSession();
  const loading = status === "loading";
  const [patientName, setPatientName] = useState('');
  const [patientId, setPatientId] = useState('');
  const [statusCurr, setStatusCurr] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setFormSubmitted(true);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!session) {
    return (
      <section className='w-full flex-center flex-col'>
        <h1 className='head_text text-center'>NeoSepsis
        <br className='max-md:hidden' />
        <span className='orange_gradient text-center'> Say NeO to Sepsis</span>
        </h1>
        <p className='text-center text-xl italic text-gray-600'>We care about your wellbeing.</p>
        <div className='mt-20 flex flex-col items-center justify-center'>
          <h1 className='text-4xl text-center font-semibold italic text-gray-500'>Please login to continue using NeoSepsis</h1>
          <button
            onClick={() => signIn('google')}
            className='mt-8 bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-full text-lg'>
            Sign in with Google
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className='w-full flex-center flex-col'>
      <h1 className='head_text text-center'>NeoSepsis
      <br className='max-md:hidden' />
      <span className='orange_gradient text-center'> Say NeO to Sepsis</span> </h1>
      <p className='text-center text-xl italic text-gray-600'>We care about your wellbeing.</p>
      <p className='mt-4 text-center text-lg'>Welcome, <span className='orange_gradient'>{session.user.name}!</span> You can now manage patient details and assess risks here.</p>
      <form onSubmit={handleSubmit} className="mt-4 flex flex-wrap items-center space-x-4">
        <input
          type="text"
          placeholder="Patient Name"
          value={patientName}
          onChange={(e) => setPatientName(e.target.value)}
          className="flex-1 min-w-[240px] p-2 border-2 border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
        />
        <input
          type="text"
          placeholder="Patient ID"
          value={patientId}
          onChange={(e) => setPatientId(e.target.value)}
          className="flex-1 min-w-[240px] p-2 border-2 border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
        />
        <div className="flex items-center">
          <span className={`mr-2 w-3 h-3 rounded-full ${
            statusCurr === 'Closed' ? 'bg-red-500' : statusCurr === 'Active' ? 'bg-green-500' : 'bg-transparent'
          }`}></span>
          <select
            value={statusCurr}
            onChange={(e) => setStatusCurr(e.target.value)}
            className={`p-2 border-2 border-gray-300 rounded-md focus:outline-none ${
              statusCurr === 'Closed' ? 'text-red-500' : statusCurr === 'Active' ? 'text-green-500' : 'text-black'
            }`}
          >
            <option value="">Select Status</option>
            <option value="Active">Active</option>
            <option value="Closed">Closed</option>
          </select>
        </div>
        <button
          type="submit"
          className="bg-orange-500 hover:bg-black text-white font-bold py-2 px-4 rounded-md transition-colors" >
          Submit Patient Details
        </button>
      </form>

      {formSubmitted && statusCurr === "Active" && <Checklist />}

      {statusCurr === "Closed" && (
        <p className='mt-10 text-center text-lg font-medium text-gray-800 px-6 py-3 bg-white border border-gray-300 rounded-md shadow-md'>
          Please change the status of the patient to <span className="text-green-500">Active</span> to continue diagnosis, 
          otherwise, please log out for returning to the main screen.
        </p>
      )}
    </section>
  );
};

export default Home;
