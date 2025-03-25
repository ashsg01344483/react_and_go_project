import { useNavigate } from "react-router-dom";

export default function NavBar() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.clear(); // ログイン情報を削除
        navigate("/login");   // ログイン画面へ戻す
    };

    const handleMoveMemoCreate = () => {
        navigate("/memos/create");   // メモ作成画面へ
    };

    return (
        <nav className="bg-gray-800 text-white p-4 w-full flex justify-between items-center">
            {/* 左側 */}
            <div>
                <button
                    onClick={handleMoveMemoCreate}
                    className="bg-blue-500 text-white px-3 py-1 mr-3 rounded hover:bg-blue-600"
                >
                    メモ作成
                </button>
            </div>

            {/* 右側 */}
            <div>
                <button
                    onClick={handleLogout}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                    ログアウト
                </button>
            </div>
        </nav>
    );
}
