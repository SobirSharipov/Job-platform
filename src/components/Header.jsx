"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Button } from "antd";

const Header = () => {
    const pathname = usePathname();

    if (pathname === "/login" || pathname === "/registor") {
        return null;
    }

    return (
        <div className="flex justify-around items-center py-[10px]">
            <p className="font-bold text-3xl text-blue-600">JobFinder</p>
            <div className="flex items-center gap-[20px]">
                <Link href="/">
                    <p className={pathname === "/" ? "text-blue-600 font-bold border-blue-600 border-b-2" : ""}>
                        Home
                    </p>
                </Link>
                <Link href="/About">
                    <p className={pathname === "/About" ? "text-blue-600 font-bold border-blue-600 border-b-2" : ""}>
                        About
                    </p>
                </Link>
                <Link href="/Contact">
                    <p
                        className={
                            pathname === "/Contact" ? "text-blue-600 border-blue-600 border-b-2 font-bold" : ""
                        }
                    >
                        Contact
                    </p>
                </Link>
            </div>
            <div className="flex gap-[20px] items-center">
                <Link href="/login">
                    <Button>Log in</Button>
                </Link>
                <Link href={'/Profile'}>
                <button>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-10">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    </svg>

                </button>
                </Link>
            </div>
        </div>
    );
};

export default Header;
