import toast from 'react-hot-toast'
import axios from '../../axios'
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaArrowRight } from 'react-icons/fa';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

export default function Home() {

    const navigate = useNavigate();

    const [productList, setProductList] = useState()
    const [categoryData, setCategoryData] = useState([])

    const getAllCategory = async () => {
        try {
            let result = await axios.get('/category', {
                params: {
                    search: "",
                    page: 1,
                    size: 50
                }
            })

            if (result.data.success) {
                setCategoryData(result?.data?.data ? result?.data?.data : [])
            } else toast.error('Failed')
        } catch (ERR) {
            console.log(ERR)
            toast.error(ERR?.response?.data?.msg)
        }
    }

    useEffect(() => {
        getAllCategory()
    }, [])


    const getAllProducts = async () => {
        try {
            let result = await axios.get('/products', {
                params: {
                    search: "",
                    page: 1,
                    size: 8,
                    price: -1,
                }
            })

            if (result.data.success) {
                setProductList(result?.data?.data ? result?.data?.data : [])
            } else toast.error('Failed to fetch products')
        } catch (ERR) {
            console.log(ERR)
            toast.error(ERR?.response?.data?.msg)
        }
    }

    useEffect(() => {
        getAllProducts()
    }, [])

    const stats = [
        { id: 1, name: '', img: '' },
        { id: 2, name: '', img: '' },
        { id: 3, name: '', img: '' },
    ]


    return (
        <div className="bg-white dark:bg-black  dark:text-white">

            <div className="relative grid place-items-center w-full h-screen -mt-20 ">
                <div className="absolute top-0 right-0 z-0 w-full h-full bg-contain bg-white">
                    <img
                        className="object-cover w-full ml-auto h-screen rounded shadow-lg lg:rounded-none  lg:shadow-none "
                        src="/images/home/hero4.jpg"
                        alt="home page pic"
                    />
                    <div className='absolute top-0 bg-black bg-opacity-65 h-full w-full from-black to-transparent'>

                    </div>
                </div>
                <div className="relative mt-10 flex flex-col items-start w-full max-w-xl px-4 mx-auto md:px-0 lg:px-8 lg:max-w-screen-2xl">
                    <div className="my-20  w-full lg:max-w-2xl lg:pr-5 text-white  rounded-xl shadow p-10">

                        <h2 className="mb-5 text-3xl font-bold tracking-tight  md:text-7xl sm:leading-none">
                        "Tech Treasures, 
                        <br />
                        Delivered to Your Doorstep!"
                        </h2>
                        <p className="pr-5 mb-5 text-3xl  md:text-3xl mt-3">
                            
                        </p>
                        <div className="flex  mt-10 md:text-3xl  items-center">
                            <a
                                href="/product"
                                className="border-l-4 flex items-center gap-5 text-2xl border-green-600 pl-5 focus:shadow-outline focus:outline-none"
                            >
                                 Our products <FaArrowRight size={22} />
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* FEATURES */}
            <div className="bg-white dark:bg-black  dark:text-white py-24 sm:py-32">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <dl className="grid grid-cols-1 gap-x-8 gap-y-16 text-center lg:grid-cols-3">
                        {stats.map((stat) => (
                            <div key={stat.id} className="mx-auto flex max-w-xs flex-col gap-y-4">
                                <div className="order-first mx-auto font-semibold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
                                    <img src={`${stat.img}`} />
                                </div>
                                <label className=" mt-5 leading-7 text-gray-900 dark:text-white font-semibold text-2xl">{stat.name}</label>
                            </div>
                        ))}
                    </dl>
                </div>
            </div>


            {/* Product */}
            <div className="bg-white dark:bg-black  dark:text-white">
                <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">Recommended Items</h2>

                    <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                        {productList?.map((product, index) => (
                            <Link to={`/product/${product.sku}`} key={index} className="group relative" role='button'>
                                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                                    <img
                                        src={`${import.meta.env.VITE_APP_BASE_URI}${product.images[0]}`}
                                        alt={product.imageAlt}
                                        className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                                    />
                                </div>
                                <div className="mt-4 flex justify-between">
                                    <div>
                                        <h3 className="text-gray-700 dark:text-white capitalize">
                                            <span aria-hidden="true" className="absolute inset-0" />
                                            {product.name}
                                        </h3>
                                        {/* <p className="mt-1 text-gray-500 capitalize">{product.variant[0].variant_type[0].color}</p> */}
                                    </div>
                                    <p className="font-medium text-gray-900 dark:text-white">Rs. {product.price}</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>

            



            {/* CTA */}
            <div className="mx-auto max-w-7xl w-full flex justify-center items-center py-12 px-4 sm:px-6 2xl:px-0">
                <div className="flex flex-col lg:flex-row justify-between w-full items-center space-y-6 lg:space-y-0">
                    <div className=" sm:w-auto flex flex-col justify-start items-start w-full">
                        <div>
                            <p className="text-3xl xl:text-4xl font-semibold leading-9 text-gray-800 dark:text-white">Wide range of Gadets</p>
                        </div>
                        <div className="mt-4 w-full">
                            <p className="text-base leading-6 text-gray-600 dark:text-white">With cheap rate</p>
                        </div>
                        <div className="mt-16 w-full">
                            <button onClick={() => {
                                navigate('/product')
                            }} className="px-4 bg-white-900 flex justify-between items-center w-full lg:w-72 h-14 text-white hover:bg-white-700">
                                <p className="text-xl font-medium leading-5"></p>
                                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M6.66663 16H25.3333" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M20 21.3333L25.3333 16" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M20 10.6667L25.3333 16" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </button>
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row jusitfy-center items-center sm:space-x-5 xl:space-x-8 space-y-4 sm:space-y-0">
                        <div>
                            <img className="hidden lg:block object-cover w-full h-52" src="/images/home/category/img2.png" alt="prodimg" />
                            <img className="w-80 sm:w-auto lg:hidden h-52" src="/images/home/category/img2.png" alt="prodimg" />
                        </div>
                        <div className="flex flex-col justify-center items-center space-y-4 sm:space-y-0  lg:space-y-5 xl:space-y-8">
                            <div>
                                <img className="hidden lg:block h-52" src="/images/home/category/img1.png" alt="prodimg" />
                                <img className="w-80 sm:w-auto lg:hidden h-52" src="/images/home/category/img1.png" alt="prodimg" />
                            </div>
                            <div>
                                <img className="hidden lg:block h-52" src="/images/home/category/img3.png" alt="prodimg" />
                                <img className="w-80 sm:w-auto lg:hidden h-52" src="/images/home/category/img3.png" alt="prodimg" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Categories */}
            {/* <div className="bg-white">
                <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900">Popular Categories</h2>

                    <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                        {categoryData?.map((value, index) => (
                            <div
                                onClick={() => {
                                    navigate('/product', { state: { category: value._id } });
                                }}
                                key={index} className="group relative" role='button'>
                                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                                    <img
                                        src={`${import.meta.env.VITE_APP_BASE_URI}${value.image}`}
                                        alt={value.imageAlt}
                                        className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                                    />
                                </div>
                                <div className="mt-4 flex justify-between">
                                    <div>
                                        <h3 className="text-gray-700 capitalize">
                                            <span aria-hidden="true" className="absolute inset-0" />
                                            {value.name}
                                        </h3>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div> */}

        </div>
    )
}
