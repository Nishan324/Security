import { Link, useNavigate } from 'react-router-dom';
import axios from '../../axios';
import React from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { Field, Form, Formik } from 'formik';
import * as yup from 'yup';
import FieldError from '../../components/FieldError';
import toast from 'react-hot-toast';
import bcrypt from 'bcryptjs';

function Signup() {
    const navigate = useNavigate();
    const validationSchema = yup.object({
        name: yup.string().required('This Field is required'),
        email: yup.string().required('This Field is required').email('Invalid email address'),
        mobile_no: yup.string().required("Phone number is required").matches(/^[9]\d{9}$/, "Invalid phone number"),
        password: yup.string().required('Password is required').min(8, 'Password must be at least 8 characters').matches(/[A-Z]/, 'Password must contain at least one uppercase letter').matches(/[a-z]/, 'Password must contain at least one lowercase letter').matches(/[0-9]/, 'Password must contain at least one number').matches(/[!@#$%^&*]/, 'Password must contain at least one special character'),
        confirmpassword: yup.string().required('Confirm Your Password').oneOf([yup.ref('password')], 'Passwords must match')
    });

    const handleFormSubmit = async (values, actions) => {
        try {
            // Hash the password before sending to the server
            const hashedPassword = await bcrypt.hash(values.password, 10);
            const data = { ...values, password: hashedPassword };
            delete data.confirmpassword;

            // Make an Axios POST request
            const response = await axios.post('/users/register', data);

            if (response.data.success) {
                toast.success('Registration Successful');

                setTimeout(() => {
                    navigate('/login');
                }, 100);
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            toast.error(error.response?.data?.msg || 'Registration failed');
        }
    };

    return (
        <div className="grid min-h-screen w-full items-center px-6 py-12 lg:px-8">
            <div className='max-w-2xl w-full mx-auto'>
                <div className='mx-auto my-4 mb-10 w-fit'>
                    <img src='logo.png' alt="Logo" />
                </div>
                <Link to='/' className='font-semibold text-gray-600 flex items-center gap-3'>
                    <FaArrowLeft /> Home
                </Link>
                <div className="sm:mx-auto">
                    <h2 className="mt-10 text-left text-2xl font-bold leading-9 tracking-tight ">
                        Register
                    </h2>
                </div>
                <div className="mt-10">
                    <Formik
                        enableReinitialize
                        initialValues={{
                            name: "",
                            email: "",
                            mobile_no: "",
                            password: "",
                            confirmpassword: "",
                        }}
                        validationSchema={validationSchema}
                        onSubmit={handleFormSubmit}
                    >
                        {(props) => (
                            <Form className='gap-3 grid grid-cols-2'>
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium leading-6">
                                        Name
                                    </label>
                                    <div className="mt-2">
                                        <Field
                                            id="name"
                                            name="name"
                                            autoComplete="name"
                                            required
                                            placeholder="Your Name"
                                            className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                    <FieldError message={props.touched.name && props.errors.name} />
                                </div>
                                <div>
                                    <label htmlFor="mobile_no" className="block text-sm font-medium leading-6">
                                        Mobile Number
                                    </label>
                                    <div className="mt-2">
                                        <Field
                                            placeholder="Your Contact number"
                                            id="mobile_no"
                                            name="mobile_no"
                                            autoComplete="mobile_no"
                                            required
                                            className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                    <FieldError message={props.touched.mobile_no && props.errors.mobile_no} />
                                </div>
                                <div className='col-span-full text-center opacity-15'>
                                    ------------
                                </div>
                                <div className='col-span-full -mt-3'>
                                    <label htmlFor="email" className="block text-sm font-medium leading-6">
                                        Email address
                                    </label>
                                    <div className="mt-2">
                                        <Field
                                            placeholder="Your Email"
                                            id="email"
                                            name="email"
                                            type="email"
                                            autoComplete="email"
                                            required
                                            className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                    <FieldError message={props.touched.email && props.errors.email} />
                                </div>
                                <div className="w-full">
                                    <label htmlFor="password" className="block text-sm font-medium leading-6">
                                        Password
                                    </label>
                                    <div className="relative flex items-center justify-center">
                                        <Field
                                            placeholder="*******"
                                            required
                                            name="password"
                                            value={props.values.password}
                                            id="password"
                                            type="password"
                                            className="block mt-2 w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                    <FieldError message={props.touched.password && props.errors.password} />
                                </div>
                                <div className="w-full">
                                    <label htmlFor="confirmpassword" className="block text-sm font-medium leading-6">
                                        Confirm Password
                                    </label>
                                    <div className="relative flex items-center justify-center">
                                        <Field
                                            placeholder="Re-enter your Password"
                                            required
                                            name="confirmpassword"
                                            value={props.values.confirmpassword}
                                            id="confirmpassword"
                                            type="password"
                                            className="block mt-2 w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                    <FieldError message={props.touched.confirmpassword && props.errors.confirmpassword} />
                                </div>
                                <div className='col-span-full mt-4'>
                                    <button
                                        type="submit"
                                        className="flex w-full justify-center rounded-md bg-green-800 text-white px-3 py-1.5 text-sm font-semibold leading-6 shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
                                    >
                                        Register
                                    </button>
                                </div>
                            </Form>
                        )}
                    </Formik>
                    <p className="mt-10 text-center text-sm text-gray-500">
                        Already Signed Up?{' '}
                        <Link to="/login" className="font-semibold leading-6 text-gray-600 hover:text-gray-500">
                            Login Now
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Signup;

