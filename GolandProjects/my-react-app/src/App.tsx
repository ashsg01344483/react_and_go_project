import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserList from "./components/user/List";
import UserCreate from "./components/user/Create";
import UserUpdate from "./components/user/Update";
import MemoList from "./components/memo/List";
import MemoCreate from "./components/memo/Create";
import MemoUpdate from "./components/memo/Update";
import NavBar from "./components/NavBar";

export default function App() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <Router>
                <NavBar />
                <div className="w-full max-w-4xl p-6 bg-white shadow-md rounded-md">
                    <Routes>
                        <Route path="/" element={<UserList />} />
                        <Route path="/create" element={<UserCreate />} />
                        <Route path="/update/:id" element={<UserUpdate />} />
                        <Route path="/memos" element={<MemoList />} />
                        <Route path="/memos/create" element={<MemoCreate />} />
                        <Route path="/memos/update/:id" element={<MemoUpdate />} />
                    </Routes>
                </div>
            </Router>
        </div>
    );
}
