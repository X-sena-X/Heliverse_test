import "./App.css";
import { Route, Routes, useNavigate } from "react-router-dom";
import Homepage from "./pages/Homepage";

import ThemeToggler from "@/components/themeToggler";
import TeamsPage from "./pages/TeamsPage";
function App() {
    const navigate = useNavigate();
    return (
        <div className="flex flex-col h-fit overflow-hidden items-center gap-y-2">
            <div className="navbar fixed top-3 w-[90%] lg:w-[80%] opacity-80 z-10 rounded-full dark:bg-slate-700 bg-gray-200 px-10">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div
                            tabIndex={0}
                            role="button"
                            className="btn btn-ghost lg:hidden"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h8m-8 6h16"
                                />
                            </svg>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content mt-3 z-[10] p-2 shadow rounded-box w-52 opacity-100"
                        >
                            <li className="dark:bg-black dark:text-white">
                                <button
                                    onClick={() => navigate("/")}
                                    className="hover:text-slate-500"
                                >
                                    Dashboard
                                </button>
                            </li>
                            <li className="dark:bg-black dark:text-white">
                                <button
                                    onClick={() => navigate("/teams")}
                                    className="hover:text-slate-500"
                                >
                                    Teampage
                                </button>
                            </li>
                        </ul>
                    </div>
                    <a
                        className="btn btn-ghost text-lg lg:text-2xl font-semibold text-violet-600 hover:text-black"
                        href="/"
                    >
                        Helverse
                    </a>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        <li>
                            <button onClick={() => navigate("/")}>
                                Dashboard
                            </button>
                        </li>
                        <li>
                            <button onClick={() => navigate("/teams")}>
                                Teampage
                            </button>
                        </li>
                    </ul>
                </div>
                <div className="navbar-end">
                    <ThemeToggler />
                </div>
            </div>
            <Routes>
                <Route path="/" element={<Homepage />} />
                <Route path="/teams" element={<TeamsPage />} />
            </Routes>
        </div>
    );
}

export default App;

/**
 * 
 * <nav className="hidden lg:flex fixed top-3 w-[80%] z-10 justify-between rounded-full dark:bg-slate-700 bg-gray-200 px-10 py-4">
                <div className=" text-lg lg:text-2xl font-semibold text-violet-600 hover:text-black">
                    <a href="/">Helverse</a>
                </div>
                <div className="flex flex-row gap-x-8 text-sm ">
                    <button
                        onClick={() => navigate("/")}
                        className="hover:text-slate-500"
                    >
                        DashBoard
                    </button>
                    <button
                        onClick={() => navigate("/teams")}
                        className="hover:text-slate-500"
                    >
                        TeamPage
                    </button>
                    <ThemeToggler />
                </div>
            </nav>
 */
