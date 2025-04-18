import axios from "axios";
import { Memo } from "@/models/memo";

const API_URL = "http://localhost:8080/memos";

// メモ一覧取得
export const ListApi = async (userId: number): Promise<Memo[]> => {
    const response = await axios.get<Memo[]>(`${API_URL}?userId=${userId}`);
    return response.data;
};

// メモ取得
export const GetByIdApi = async (id: number): Promise<Memo> => {
    const response = await axios.get<Memo>(`${API_URL}/${id}`);
    return response.data;
};

// メモ作成
export const CreateApi = async (memoText: string, userId: number): Promise<void> => {
    await axios.post(API_URL, { Memo: memoText, UserID: userId });
};

// メモ更新
export const UpdateApi = async (id: number, memoText: string): Promise<void> => {
    await axios.put(`${API_URL}/${id}`, { Memo: memoText });
};

// メモ削除
export const DeleteApi = async (id: number): Promise<void> => {
    await axios.delete(`${API_URL}/${id}`);
};
