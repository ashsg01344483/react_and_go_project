import { useNavigate } from "react-router-dom";

export default function NavBar() {
    const navigate = useNavigate();
    return (
        <nav className="bg-gray-800 text-white p-4 w-full flex items-center">
            <div className="ml-4">  {/* 👈 左寄せ用の div を追加 */}
                <button
                    onClick={() => navigate("/")}
                    className="bg-gray-500 text-white px-3 py-1 rounded h-8 mr-2 hover:bg-gray-600">
                    ユーザーリスト
                </button>
                <button
                    onClick={() => navigate("/create")}
                    className="bg-gray-500 text-white px-3 py-1 rounded h-8 hover:bg-gray-600">
                    新規作成
                </button>
            </div>
        </nav>
    );
}
