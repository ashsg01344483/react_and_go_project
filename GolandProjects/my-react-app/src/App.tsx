import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import ListComponent from "./components/user/List";
import CreateComponent from "./components/user/Create";
import UpdateComponent from "./components/user/Update";

export default function App() {
    return (
        <Router>
            <nav className="bg-gray-800 text-white p-4">
                <Link to="/" className="mr-4">ユーザーリスト</Link>
                <Link to="/create">新規作成</Link>
            </nav>
            <Routes>
                <Route path="/" element={<ListComponent />} />
                <Route path="/create" element={<CreateComponent />} />
                <Route path="/update/:id" element={<UpdateComponent />} />
            </Routes>
        </Router>
    );
}
