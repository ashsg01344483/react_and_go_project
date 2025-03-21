import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ListComponent from "./components/user/List";
import CreateComponent from "./components/user/Create";
import UpdateComponent from "./components/user/Update";
import NavBar from "./components/NavBar";

export default function App() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <Router>
                <NavBar />
                <div className="w-full max-w-4xl p-6 bg-white shadow-md rounded-md">
                    <Routes>
                        <Route path="/" element={<ListComponent />} />
                        <Route path="/create" element={<CreateComponent />} />
                        <Route path="/update/:id" element={<UpdateComponent />} />
                    </Routes>
                </div>
            </Router>
        </div>
    );
}
