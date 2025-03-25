import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Login() {
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        try {
            const response = await axios.get(`http://localhost:8080/users/search?email=${email}`);

            if (response.data) {
                localStorage.setItem("user", JSON.stringify(response.data)); // ユーザー情報保存
                alert("ログイン成功！");
                navigate("/memos");
            } else {
                setError("ログイン失敗：ユーザーが見つかりません");
            }

        } catch (err) {
            console.error(err);
            setError("ログインに失敗しました。メールアドレスを確認してください。");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <form onSubmit={handleLogin} className="bg-white p-6 rounded shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold mb-4 text-center">ログイン</h2>

                <label className="block text-gray-700">メールアドレス</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-2 border rounded mb-4"
                    required
                />

                {error && <p className="text-red-500 mb-2">{error}</p>}

                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 mb-3"
                >
                    ログイン
                </button>

                <button
                    type="button"
                    onClick={() => navigate("/create")}
                    className="w-full bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600"
                >
                    新規ユーザー登録
                </button>
            </form>
        </div>
    );
}
