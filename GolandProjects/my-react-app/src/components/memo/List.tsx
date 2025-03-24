import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Memo } from "../../models/memo";
import { ListApi, DeleteApi } from "../../services/memo/api";

export default function MemoList() {
    const [memos, setMemos] = useState<Memo[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchMemos();
    }, []);

    const fetchMemos = () => {
        ListApi()
            .then(setMemos)
            .catch((err) => console.error("メモの取得に失敗:", err));
    };

    const handleDelete = async (id: number) => {
        if (!window.confirm("このメモを削除しますか？")) return;
        try {
            await DeleteApi(id);
            alert("メモを削除しました！");
            fetchMemos();
        } catch (error) {
            console.error("削除に失敗:", error);
        }
    };

    return (
        <div className="bg-gray-100 p-6">
            <h1 className="text-3xl font-bold text-center mb-6">メモ一覧</h1>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-300 shadow-md rounded-lg">
                    <thead className="bg-gray-300 text-gray-700 uppercase text-sm">
                    <tr>
                        <th className="px-4 py-2 border border-gray-400 text-center">ID</th>
                        <th className="px-4 py-2 border border-gray-400">メモ</th>
                        <th className="px-4 py-2 border border-gray-400">作成日</th>
                        <th className="px-4 py-2 border border-gray-400">操作</th>
                    </tr>
                    </thead>
                    <tbody>
                    {memos.length === 0 ? (
                        <tr>
                            <td colSpan={4} className="text-center py-4">データがありません</td>
                        </tr>
                    ) : (
                        memos.map((memo) => (
                            <tr key={memo.ID} className="odd:bg-gray-100 even:bg-white hover:bg-gray-200">
                                <td className="px-4 py-2 border border-gray-300 text-center">{memo.ID}</td>
                                <td className="px-4 py-2 border border-gray-300">{memo.Memo}</td>
                                <td className="px-4 py-2 border border-gray-300 text-center">
                                    {new Date(memo.CreatedAt).toLocaleDateString()}
                                </td>
                                <td className="px-4 py-2 border border-gray-300 text-center">
                                    <button
                                        onClick={() => navigate(`/memos/update/${memo.ID}`)}
                                        className="bg-yellow-500 text-white px-3 py-1 rounded h-8 mr-2 hover:bg-yellow-600"
                                    >
                                        編集
                                    </button>
                                    <button
                                        className="bg-red-500 text-white px-3 py-1 rounded h-8 hover:bg-red-600"
                                        onClick={() => handleDelete(memo.ID)}
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
