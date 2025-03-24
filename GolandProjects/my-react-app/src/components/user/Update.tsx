import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { User } from "../../models/user";
import { ListApi, UpdateApi } from "../../services/user/api"; // APIをインポート

export default function UserUpdate() {
    const { id } = useParams<{ id: string }>(); // URL から id を取得
    const navigate = useNavigate();
    const [user, setUser] = useState<User | null>(null);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");

    // 初回レンダリング時にユーザー情報を取得
    useEffect(() => {
        if (id) {
            ListApi().then((users) => {
                const foundUser = users.find((u) => u.ID === Number(id));
                if (foundUser) {
                    setUser(foundUser);
                    setName(foundUser.Name);
                    setEmail(foundUser.Email);
                } else {
                    alert("ユーザーが見つかりませんでした");
                    navigate("/");
                }
            }).catch((err) => {
                console.error("Error fetching user:", err);
                navigate("/");
            });
        }
    }, [id, navigate]);

    const handleUpdate = async () => {
        if (!user) return;
        try {
            await UpdateApi(user.ID, name, email);
            alert("ユーザーが更新されました！");
            navigate("/"); // ユーザーリストページへリダイレクト
        } catch (error) {
            console.error("Error updating user:", error);
        }
    };

    return (
        <div className="bg-gray-100 min-h-screen flex items-center justify-center p-6">
            <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
                <h1 className="text-2xl font-bold text-center mb-6">ユーザー編集</h1>

                <label className="block text-gray-700">名前:</label>
                <input
                    type="text"
                    className="w-full p-2 border rounded mb-4"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />

                <label className="block text-gray-700">メールアドレス:</label>
                <input
                    type="email"
                    className="w-full p-2 border rounded mb-4"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <div className="flex justify-between">
                    <button
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full mr-2"
                        onClick={handleUpdate}
                    >
                        更新
                    </button>
                    <button
                        className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500 w-full"
                        onClick={() => navigate("/")}
                    >
                        キャンセル
                    </button>
                </div>
            </div>
        </div>
    );
}
