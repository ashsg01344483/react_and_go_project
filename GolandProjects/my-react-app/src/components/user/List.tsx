import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { User } from "@/models/user";
import { ListApi, DeleteApi } from "@/services/user/api"; // APIをインポート

export default function UserList() {
    const [users, setUsers] = useState<User[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = () => {
        ListApi()
            .then(setUsers)
            .catch((err) => console.error("Error fetching users:", err));
    };

    const handleDelete = async (id: number) => {
        const confirmDelete = window.confirm("このユーザーを削除しますか？");
        if (!confirmDelete) return; // キャンセルされた場合、削除を実行しない

        try {
            await DeleteApi(id);
            alert("ユーザーが削除されました！");
            fetchUsers(); // 削除後に一覧を更新
        } catch (error) {
            console.error("Error deleting user:", error);
            alert("削除に失敗しました");
        }
    };

    return (
        <div className="bg-gray-100 p-6">
            <h1 className="text-3xl font-bold text-center mb-6">ユーザーリスト</h1>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-300 shadow-md rounded-lg">
                    <thead className="bg-gray-300 text-gray-700 uppercase text-sm">
                    <tr>
                        <th className="px-4 py-2 border border-gray-400 text-center">ID</th>
                        <th className="px-4 py-2 border border-gray-400">名前</th>
                        <th className="px-4 py-2 border border-gray-400">メールアドレス</th>
                        <th className="px-4 py-2 border border-gray-400">作成日</th>
                        <th className="px-4 py-2 border border-gray-400">アクション</th>
                    </tr>
                    </thead>
                    <tbody>
                    {users.length === 0 ? (
                        <tr>
                            <td colSpan={5} className="text-center py-4">データがありません</td>
                        </tr>
                    ) : (
                        users.map((user) => (
                            <tr key={user.ID} className="odd:bg-gray-100 even:bg-white hover:bg-gray-200">
                                <td className="px-4 py-2 border border-gray-300 text-center">{user.ID}</td>
                                <td className="px-4 py-2 border border-gray-300">{user.Name}</td>
                                <td className="px-4 py-2 border border-gray-300">{user.Email}</td>
                                <td className="px-4 py-2 border border-gray-300">
                                    {new Date(user.CreatedAt).toLocaleDateString()}
                                </td>
                                <td className="px-4 py-2 border border-gray-300 text-center">
                                    <button
                                        onClick={() => navigate(`/update/${user.ID}`)}
                                        className="bg-yellow-500 text-white px-3 py-1 rounded h-8 mr-2 hover:bg-yellow-600"
                                    >
                                        編集
                                    </button>
                                    <button
                                        className="bg-red-500 text-white px-3 py-1 rounded h-8 hover:bg-red-600"
                                        onClick={() => handleDelete(user.ID)}
                                    >
                                        削除
                                    </button>
                                </td>
                            </tr>
                        ))
                    )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
