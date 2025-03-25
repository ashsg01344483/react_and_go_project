import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CreateApi } from "../../services/memo/api";

export default function MemoCreate() {
    const [memo, setMemo] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // ログインユーザーの ID を取得
        const userData = localStorage.getItem("user");
        if (!userData) {
            alert("ログイン情報が見つかりません。再度ログインしてください。");
            navigate("/login");
            return;
        }

        const user = JSON.parse(userData);
        const userId = user.ID;

        try {
            await CreateApi(memo, userId); // ← userId を送信
            alert("メモを追加しました！");
            setMemo("");
            navigate("/memos");
        } catch (error) {
            console.error("メモの作成に失敗:", error);
        }
    };

    return (
        <div className="bg-gray-100 p-6">
            <h1 className="text-3xl font-bold text-center mb-6">新規メモ作成</h1>
            <form className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md" onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">メモ内容</label>
                    <textarea
                        className="w-full px-3 py-2 border rounded-md"
                        value={memo}
                        onChange={(e) => setMemo(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
                    追加
                </button>
            </form>
        </div>
    );
}
