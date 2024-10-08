// import { Link, useNavigate } from 'react-router-dom';
// import axios from '../../axios'; // Import the configured Axios instance
// import React, { useContext, useEffect } from 'react';
// import { FaArrowLeft } from 'react-icons/fa';
// import { Field, Form, Formik } from 'formik';
// import toast from 'react-hot-toast';
// import { AuthContext } from '../../context/authContext';

// function Login() {
//   const navigate = useNavigate();
//   const { isAuthenticated, setIsAuthenticated, setUserDetails } = useContext(AuthContext);

//   // Function to handle form submission
//   const handleFormSubmit = async (values, actions) => {
//     try {
//       console.log('Submitting form with values:', values); // Debugging line
//       const response = await axios.post('/users/login', values);

//       if (response.data.success) {
//         console.log('Login successful:', response.data); // Debugging line
//         localStorage.setItem('_hw_userDetails', JSON.stringify(response.data.data));
//         localStorage.setItem('_hw_token', response.data.data.token);
//         setUserDetails(response.data.data);
//         toast.success('Login Successful');

//         setTimeout(() => {
//           setIsAuthenticated(true);
//           if (response.data.data.role.includes('admin') || response.data.data.role.includes('super-admin')) {
//             navigate('/dashboard');
//           } else {
//             navigate('/');
//           }
//         }, 400);
//       }
//     } catch (error) {
//       console.error('Error submitting form:', error); // Debugging line
//       toast.error(error?.response?.data?.msg ? error?.response?.data?.msg : "Failed To Login");
//     }
//   };

//   useEffect(() => {
//     if (isAuthenticated) {
//       navigate('/');
//     }
//   }, [isAuthenticated, navigate]);

//   return (
//     <div className="grid min-h-screen bg-center bg-cover w-full items-center px-6 py-12 lg:px-8">
//       <div
//         className="absolute inset-x-0 -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]"
//         aria-hidden="true"
//       >
//       </div>
//       <div className='max-w-sm w-full mx-auto'>
//         <img
//           className="mx-auto w-auto my-10"
//           src="/logo.png"
//           alt="login img"
//         />
//         <a href='/' className='font-semibold text-gray-600 flex items-center gap-3'>
//           <FaArrowLeft /> Home
//         </a>
//         <div className="mx-auto w-full">
//           <h2 className="mt-10 text-left text-2xl font-bold leading-9 tracking-tight">
//             Log in
//           </h2>
//         </div>

//         <div className="mt-10 mx-auto w-full">
//           <Formik
//             initialValues={{
//               email: "",
//               password: "",
//             }}
//             onSubmit={async (values, actions) => {
//               await handleFormSubmit(values, actions);
//             }}
//           >
//             {(props) => (
//               <Form>
//                 <div>
//                   <label
//                     id="email"
//                     className="block w-full text-sm font-medium leading-6"
//                   >
//                     Email Address
//                   </label>
//                   <Field
//                     required
//                     name="email"
//                     value={props.values.email}
//                     aria-labelledby="email"
//                     type="email"
//                     className="block mt-2 w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
//                   />
//                 </div>
//                 <div className="mt-6 w-full">
//                   <label
//                     htmlFor="pass"
//                     className="block w-full text-sm font-medium leading-6"
//                   >
//                     Password
//                   </label>
//                   <div className="relative flex items-center justify-center">
//                     <Field
//                       required
//                       name="password"
//                       value={props.values.password}
//                       id="pass"
//                       type="password"
//                       className="block mt-2 w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
//                     />
//                   </div>
//                 </div>

//                 <div className="mt-8">
//                   <button
//                     type="submit"
//                     role="button"
//                     className="flex w-full mr-auto justify-center rounded-md bg-green-800 text-white px-3 py-1.5 text-sm font-semibold leading-6 shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
//                   >
//                     Sign in
//                   </button>
//                 </div>
//               </Form>
//             )}
//           </Formik>

//           <p className="mt-10 text-center text-sm text-gray-500">
//             Not Registered Yet?
//             <Link to="/signup" className="font-semibold ml-3 leading-6 text-gray-600 hover:text-gray-500">
//               Sign up now
//             </Link>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Login;


import { Link, useNavigate } from 'react-router-dom';
import axios from '../../axios'; // Import the configured Axios instance
import React, { useContext, useEffect } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { Field, Form, Formik } from 'formik';
import toast from 'react-hot-toast';
import { AuthContext } from '../../context/authContext';

function Login() {
  const navigate = useNavigate();
  const { isAuthenticated, setIsAuthenticated, setUserDetails } = useContext(AuthContext);

  // Function to handle form submission
  const handleFormSubmit = async (values, actions) => {
    try {
      console.log('Submitting form with values:', values); // Debugging line
      const response = await axios.post('/users/login', values);

      if (response.data.success) {
        console.log('Login successful:', response.data); // Debugging line
        localStorage.setItem('_hw_userDetails', JSON.stringify(response.data.data));
        localStorage.setItem('_hw_token', response.data.data.token);
        setUserDetails(response.data.data);
        toast.success('Login Successful');

        setTimeout(() => {
          setIsAuthenticated(true);
          if (response.data.data.role.includes('admin') || response.data.data.role.includes('super-admin')) {
            navigate('/dashboard');
          } else {
            navigate('/');
          }
        }, 400);
      }
    } catch (error) {
      console.error('Error submitting form:', error); // Debugging line
      toast.error(error?.response?.data?.msg ? error?.response?.data?.msg : "Failed To Login");
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-cover bg-center px-6 py-12 lg:px-8" style={{ backgroundImage: `url('')` }}>
      <div className="relative w-full max-w-lg space-y-8 p-12 bg-white bg-opacity-90 rounded-lg shadow-lg">
        <img
          className="mx-auto w-auto my-10"
          src="/logo.png"
          alt="login img"
        />
        <Link to='/' className='font-semibold text-gray-600 flex items-center gap-3 mb-4'>
          <FaArrowLeft /> Home
        </Link>
        <div className="mx-auto w-full">
          <h2 className="text-center text-3xl font-extrabold text-gray-900">
            Log in to your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Or{' '}
            <Link to="/signup" className="font-medium text-green-600 hover:text-green-500">
              Sign up now
            </Link>
          </p>
        </div>

        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          onSubmit={async (values, actions) => {
            await handleFormSubmit(values, actions);
          }}
        >
          {(props) => (
            <Form className="mt-8 space-y-6">
              <div className="rounded-md shadow-sm -space-y-px">
                <div>
                  <label htmlFor="email" className="sr-only">
                    Email address
                  </label>
                  <Field
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="appearance-none rounded-none relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-md"
                    placeholder="Email address"
                  />
                </div>
                <div>
                  <label htmlFor="password" className="sr-only">
                    Password
                  </label>
                  <Field
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="appearance-none rounded-none relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-md"
                    placeholder="Password"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-md font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                  Sign in
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default Login;


