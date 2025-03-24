import axios from "axios";
import { Memo } from "../../models/memo";

const API_URL = "http://localhost:8080/memos";

// メモ一覧取得
export const ListApi = async (): Promise<Memo[]> => {
    const res = await axios.get<Memo[]>(API_URL);
    return res.data;
};

// メモ作成
export const CreateApi = async (memoText: string, userId: number): Promise<void> => {
    await axios.post(API_URL, { Memo: memoText, UserID: userId });
};

// メモ更新
export const UpdateApi = async (id: number, memoText: string, userId: number): Promise<void> => {
    await axios.put(`${API_URL}/${id}`, { Memo: memoText, UserID: userId });
};

// メモ削除
export const DeleteApi = async (id: number): Promise<void> => {
    await axios.delete(`${API_URL}/${id}`);
};
