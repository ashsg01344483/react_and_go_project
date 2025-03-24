import React, {useState} from "react";
import {CreateApi} from "../../services/user/api"; // 修正！
import {useNavigate} from "react-router-dom";

export default function UserCreate() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            await CreateApi(name, email); // createUser → create に変更
            alert("ユーザーが作成されました！");
            setName("");
            setEmail("");
            navigate("/"); // ユーザーリストページへリダイレクト
        } catch (error) {
            console.error("Error creating user:", error);
        }
    };

    return (
        <div className="bg-gray-100 p-6">
            <h1 className="text-3xl font-bold text-center mb-6">新規ユーザー作成</h1>
            <form className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md" onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">名前</label>
                    <input type="text" className="w-full px-3 py-2 border rounded-md" value={name}
                           onChange={(e) => setName(e.target.value)} required/>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">メールアドレス</label>
                    <input type="email" className="w-full px-3 py-2 border rounded-md" value={email}
                           onChange={(e) => setEmail(e.target.value)} required/>
                </div>
                <button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
                    追加
                </button>
            </form>
        </div>
    );
}
