import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react'

const pages = [
    { id:1, title:"Home", url:"/admin/dashboard"},
    { id:2, title:"Trainer Assignment", url:"/admin/trainer-assignment"},
    { id:3, title:"Trainer Payment", url:"/admin/trainer-payment"},
    { id:4, title:"Fee Management", url:"/admin/user-fee"},
    { id:5, title:"Complaint Handling", url:"/admin/complaint-handling"},
]

const AdminMenu = () => {

    const [open, setOpen] = useState(false);

    return (
        <div>
            {
                !open ?
                (<Image src="/menu/openMenu.png" alt="compressed menu" width={50} height={50} onClick={()=>setOpen(true)}/>) 
                : 
                (<Image src="/menu/closeMenu.png" alt="compressed menu" width={50} height={50} onClick={()=>setOpen(false)} />)
            }
            
            {open &&        
                <div className="text-black absolute left-0 top-24 md:top-35 w-full h-[calc(100vh-6rem)] flex flex-col gap-8 items-center justify-center text-2xl z-10" style={{ backgroundColor: '#fefed5' }}>
                    {pages.map(item=>(
                        <div key={item.id} className="hover:font-bold px-6 py-3 rounded-lg hover:bg-black group">
                            <Link 
                                href={item.url} 
                                onClick={()=>setOpen(false)}
                                className="group-hover:text-[#fefed5]"
                            >
                                {item.title}
                            </Link>
                        </div>
                    ))}
                </div>
            }
        </div>
    )
}

export default AdminMenu