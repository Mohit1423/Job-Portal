import { useState } from 'react'

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from './components/Home.jsx';
import SignUp from './components/Signup.jsx';
import Login from './components/Login.jsx';
import { Toaster } from './components/ui/sonner.jsx';
import Jobs from './components/Jobs.jsx';
import Browse from './components/Browse.jsx';
import Profile from './components/Profile.jsx';
import JobDescription from './components/JobDescription.jsx';
import Companies from './components/Admin/Companies.jsx';
import AdminJobs from './components/Admin/AdminJobs.jsx';
import CreateCompany from './components/Admin/CreateCompany.jsx';
import EditCompany from './components/Admin/EditCompany.jsx';
import CreateJobs from './components/Admin/CreateJobs.jsx';
import Applications from './components/Admin/Applications.jsx';


function App() {



  const router = createBrowserRouter([
       {
          path: "/",
          element: <Home />
        },
        {
          path: "/Login",
          element: <Login />
        },
        {
          path: "/Signup",
          element: <SignUp />
        },
        {
          path: "/Jobs",
          element: <Jobs />
        },
        {
          path: "/Browse/:keyword",
          element: <Browse />
        },
        {
          path: "/Browse",
          element: <Browse />
        },
        {
          path: "/profile",
          element: <Profile />
        },{
          path:"/description/:id",
          element:<JobDescription />
        }
        ,{
          path:"/admin/companies",
          element:<Companies/>
        }
        ,{
          path:"/admin/jobs",
          element:<AdminJobs/>
        }
        ,{
          path:"/admin/companies/create",
          element:<CreateCompany/>
        }
        ,{
          path:"/admin/companies/:id",
          element:<EditCompany/>
        }
        ,{
          path:"/admin/jobs/create",
          element:<CreateJobs/>
        }
        ,{
          path:"/admin/jobs/applicants/:id",
          element:<Applications/>
        }
      ]
    );
  
  return (
      <div className='m-auto w-[80%] h-screen'>
        <Toaster/>
        <RouterProvider router={router} />
      </div>
  )
  
}

export default App
