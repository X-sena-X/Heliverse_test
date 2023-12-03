import "./App.css";
import { Route, Routes, useNavigate } from "react-router-dom";
import Homepage from "./pages/Homepage";

import ThemeToggler from "@/components/themeToggler";
import TeamsPage from "./pages/TeamsPage";
function App() {
    const navigate = useNavigate();
    return (
        <div className="flex flex-col h-fit overflow-hidden items-center gap-y-2">
            <nav className="hidden lg:flex fixed top-3 w-[80%] z-10 justify-between rounded-full dark:bg-slate-700 bg-gray-200 px-10 py-4">
                <div className=" text-lg lg:text-2xl font-semibold text-violet-600 ">
                    Helverse
                </div>
                <div className="flex flex-row gap-x-4">
                    <button onClick={() => navigate("/")}>DashBoard</button>
                    <button onClick={() => navigate("/teams")}>TeamPage</button>
                    <ThemeToggler />
                </div>
            </nav>
            <Routes>
                <Route path="/" element={<Homepage />} />
                <Route path="/teams" element={<TeamsPage />} />
            </Routes>
        </div>
    );
}

export default App;
