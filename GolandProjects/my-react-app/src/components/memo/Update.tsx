import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Memo } from "../../models/memo";
import { ListApi, UpdateApi } from "../../services/memo/api";

export default function MemoUpdate() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [memo, setMemo] = useState<Memo | null>(null);
    const [content, setContent] = useState("");

    useEffect(() => {
        if (id) {
            ListApi().then((memos) => {
                const found = memos.find((m) => m.ID === Number(id));
                if (found) {
                    setMemo(found);
                    setContent(found.Memo);
                } else {
                    alert("メモが見つかりませんでした");
                    navigate("/memos");
                }
            }).catch((err) => {
                console.error("取得エラー:", err);
                navigate("/memos");
            });
        }
    }, [id, navigate]);

    const handleUpdate = async () => {
        if (!memo) return;
        try {
            await UpdateApi(memo.ID, content);
            alert("メモを更新しました！");
            navigate("/memos");
        } catch (error) {
            console.error("メモの更新に失敗:", error);
        }
    };

    return (
        <div className="bg-gray-100 min-h-screen flex items-center justify-center p-6">
            <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
                <h1 className="text-2xl font-bold text-center mb-6">メモ編集</h1>
                <textarea
                    className="w-full p-2 border rounded mb-4"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    rows={5}
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
                        onClick={() => navigate("/memos")}
                    >
                        キャンセル
                    </button>
                </div>
            </div>
        </div>
    );
}
