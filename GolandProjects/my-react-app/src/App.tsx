import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Login from "./components/auth/Login";
import NavBar from "./components/NavBar";
import MemoList from "./components/memo/List";
import MemoCreate from "./components/memo/Create";
import MemoUpdate from "./components/memo/Update";
import UserCreate from "./components/user/Create";

export default function App() {
    return (
        <Router>
            <AppContent />
        </Router>
    );
}

function AppContent() {
    const location = useLocation();

    // NavBarを表示させたいパス一覧（/create は除く）
    const showNavBarPaths = [
        "/memos",
        "/memos/create",
        "/memos/update",
        // 必要があれば "/users" なども追加可能
    ];

    // 現在のパスが上記のいずれかに該当すれば NavBar を表示
    const showNavBar = showNavBarPaths.some((path) =>
        location.pathname.startsWith(path)
    );

    return (
        <>
            {showNavBar && <NavBar />}

            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/create" element={<UserCreate />} />
                <Route path="/memos" element={<MemoList />} />
                <Route path="/memos/create" element={<MemoCreate />} />
                <Route path="/memos/update/:id" element={<MemoUpdate />} />
            </Routes>
        </>
    );
}
