"use client"

import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import AdminMenu from './AdminMenu'

const NavBar = () => {

  const admin = true;
  const user = false;
  const trainer = false;

  return (
        <div>
            {
                (!admin && !user && !trainer)? 
                    (
                        <div className='bg-black text-white'>
                            <div className='flex justify-center align-center'>
                                <Image src='/gym/gymLogo.png' width={120} height={30} alt='Organization Logo' className='py-5 w-[120px] h-[30px] md:w-[100px] md:h-[25px] sm:w-[80px] sm:h-[20px]'/>
                            </div>
                        </div>
                    )
                :
                    (!admin && !user && trainer)?
                    (
                        //Trainer Navbar
                        <div className='bg-black text-white'>
                            <div className='flex justify-center align-center'>
                                <Image src='/gym/gymLogo.png' width={120} height={30} alt='Organization Logo' className='py-5 w-[120px] h-[30px] md:w-[100px] md:h-[25px] sm:w-[80px] sm:h-[20px]'/>
                            </div>
                        </div>
                    )
                    :
                        (!admin && user)?
                        (
                            //User Navbar
                            <div className='bg-black text-white'>
                                NavbarUser
                            </div>
                        )
                        :
                        (
                            //Admin Navbar
                            <div className='bg-black flex px-5 py-5 md:px-10 lg:px-25' style={{ color: '#fefed5' }}>
                                <div className='flex-1 justify-start items-center'>
                                    <Link href='/admin/dashboard'>
                                        <Image src='/gym/gymLogo.png' width={100} height={25} alt='Organization Logo' className='w-[60px] h-[60px] md:w-[100px] md:h-[100px]'/>
                                    </Link>
                                </div>
                                <div className="lg:hidden flex items-center justify-center">
                                    <AdminMenu/>
                                </div>
                                <div className='hidden lg:flex lg:flex-5 space-x-10 justify-center items-center'>
                                    <div className='flex hover:font-bold hover:mb-1.5'>
                                        <Link href='/admin/dashboard'>Home</Link>
                                    </div>
                                    <div className='flex space-x-10 hover:font-bold hover:mb-1.5'>
                                        <Link href='/admin/trainer-assignment'>Trainer Assignment</Link>
                                    </div>
                                    <div className='flex space-x-10 hover:font-bold hover:mb-1.5'>
                                        <Link href='/admin/trainer-payment'>Trainer Payment</Link>
                                    </div>
                                    <div className='flex space-x-10 hover:font-bold hover:mb-1.5'>
                                        <Link href='/admin/user-fee'>Fee Management</Link>
                                    </div>
                                    <div className='flex space-x-10 hover:font-bold hover:mb-1.5'>  
                                        <Link href='/admin/complaint-handling'>Complaint Handling</Link>
                                    </div>
                                </div>
                            </div>
                        )
            }
        </div>
  )
}

export default NavBar