"use client";

import React, { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useTheme } from "./ThemeContext";
import { useGetUserQuery } from "@/services/userApi";

const Header = () => {
    const pathname = usePathname();
    const { darkMode, toggleTheme } = useTheme();
    let [menu, setMenu] = useState(false);
    const { data, refetch } = useGetUserQuery();
    const token = JSON.parse(localStorage.getItem("Userid"));
    const currentUser = data?.find(el => el.userId == token);

    if (pathname === "/login" || pathname === "/registor") {
        return null;
    }

    return (
        <div
            className={`flex justify-between lg:justify-around items-center py-3 px-6 transition-colors duration-300
            ${darkMode ? "bg-gray-900 text-gray-100" : "bg-white text-gray-900"}`}
        >
            <p
                className={`font-bold text-2xl sm:text-3xl transition-colors duration-300 ${darkMode ? "text-blue-400" : "text-blue-600"
                    }`}
            >
                JobFinder
            </p>

            <div className="lg:flex hidden items-center gap-8">
                <Link href="/">
                    <p
                        className={`font-bold border-b-2 transition-colors duration-300 ${pathname === "/"
                            ? darkMode
                                ? "text-blue-400 border-blue-400"
                                : "text-blue-600 border-blue-600"
                            : "border-transparent"
                            }`}
                    >
                        Home
                    </p>
                </Link>
                <Link href="/About">
                    <p
                        className={`font-bold border-b-2 transition-colors duration-300 ${pathname === "/About"
                            ? darkMode
                                ? "text-blue-400 border-blue-400"
                                : "text-blue-600 border-blue-600"
                            : "border-transparent"
                            }`}
                    >
                        About
                    </p>
                </Link>
                <Link href="/Contact">
                    <p
                        className={`font-bold border-b-2 transition-colors duration-300 ${pathname === "/Contact"
                            ? darkMode
                                ? "text-blue-400 border-blue-400"
                                : "text-blue-600 border-blue-600"
                            : "border-transparent"
                            }`}
                    >
                        Contact
                    </p>
                </Link>
            </div>

            <div className="lg:flex hidden gap-6 items-center">
                <Link href="/login">
                    <p
                        className={`font-bold border-b-2 transition-colors duration-300 ${pathname === "/login"
                            ? darkMode
                                ? "text-blue-400 border-blue-400"
                                : "text-blue-600 border-blue-600"
                            : "border-transparent"
                            }`}
                    >
                        Log in
                    </p>
                </Link>
                <Link href={"/Profile"}>
                    <button
                        className={`p-2 rounded-full transition-colors duration-300 ${darkMode
                            ? "bg-gray-700 text-gray-100 hover:bg-gray-600"
                            : "bg-gray-200 text-gray-900 hover:bg-gray-300"
                            }`}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="size-6"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                            />
                        </svg>
                    </button>
                </Link>
                <button
                    onClick={toggleTheme}
                    className={`p-2 rounded-full transition-colors duration-300 ${darkMode
                        ? "bg-gray-700 text-yellow-300 hover:bg-gray-600"
                        : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                        }`}
                >
                    {darkMode ? (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="size-6"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
                            />
                        </svg>
                    ) : (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="size-6"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z"
                            />
                        </svg>
                    )}
                </button>
            </div>

            <div className="lg:hidden">
                <button onClick={() => setMenu(true)}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="size-7"
                    >
                        <path
                            fillRule="evenodd"
                            d="M3 6.75A.75.75 0 0 1 3.75 6h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 6.75ZM3 12a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 12Zm0 5.25a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75a.75.75 0 0 1-.75-.75Z"
                            clipRule="evenodd"
                        />
                    </svg>
                </button>
            </div>

            {menu && (
                <div
                    className={`fixed inset-0 z-50 flex justify-end bg-black/40`}
                    onClick={() => setMenu(false)}
                >
                    <div
                        className={`w-64 h-full p-6 flex flex-col gap-6 shadow-lg transform transition-transform duration-300 ${darkMode
                            ? "bg-gray-900 text-gray-100"
                            : "bg-white text-gray-900"
                            }`}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex justify-between items-center">
                            <div className="flex items-center">

                            <Link href={"/Profile"}>
                                <button
                                    className={`p-2 rounded-full transition-colors duration-300 ${darkMode
                                        ? "bg-gray-700 text-gray-100 hover:bg-gray-600"
                                        : "bg-gray-200 text-gray-900 hover:bg-gray-300"
                                        }`}
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke="currentColor"
                                        className="size-6"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                                        />
                                    </svg>
                                </button>
                            </Link>
                                {currentUser && <span className="ml-2 font-semibold">{currentUser.name}</span>}
                            </div>
                          
                        <button
                            className="self-end mb-4"
                            onClick={() => setMenu(false)}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="size-6"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>
                        </div>

                        <Link href="/" onClick={() => setMenu(false)}>
                            <p className="font-bold hover:text-blue-500">Home</p>
                        </Link>
                        <Link href="/About" onClick={() => setMenu(false)}>
                            <p className="font-bold hover:text-blue-500">About</p>
                        </Link>
                        <Link href="/Contact" onClick={() => setMenu(false)}>
                            <p className="font-bold hover:text-blue-500">Contact</p>
                        </Link>
                        <Link href="/login" onClick={() => setMenu(false)}>
                            <p className="font-bold hover:text-blue-500">Log in</p>
                        </Link>
                      

                        <button
                            onClick={toggleTheme}
                            className={`mt-6 w-full py-2 rounded-lg transition-colors duration-300 ${darkMode
                                ? "bg-gray-700 text-yellow-300 hover:bg-gray-600"
                                : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                                }`}
                        >
                            {darkMode ? "Switch to Light" : "Switch to Dark"}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Header;
