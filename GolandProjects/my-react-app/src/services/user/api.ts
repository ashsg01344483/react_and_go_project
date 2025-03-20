import { User } from "../../models/user";

const API_URL = "http://localhost:8080/users";

/**
 * ユーザー一覧を取得
 */
export const ListApi = async (): Promise<User[]> => {
    const response = await fetch(API_URL);
    if (!response.ok) {
        throw new Error("ユーザーの取得に失敗しました");
    }
    return response.json();
};

/**
 * 新規ユーザーを作成
 */
export const CreateApi = async (name: string, email: string): Promise<void> => {
    const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ Name: name, Email: email }),
    });

    if (!response.ok) {
        throw new Error("ユーザーの作成に失敗しました");
    }
};

/**
 * ユーザーを更新
 */
export const UpdateApi = async (id: number, name: string, email: string): Promise<void> => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ Name: name, Email: email }),
    });

    if (!response.ok) {
        throw new Error("ユーザーの更新に失敗しました");
    }
};

/**
 * ユーザーを削除
 */
export const DeleteApi = async (id: number): Promise<void> => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
    });

    if (!response.ok) {
        throw new Error("ユーザーの削除に失敗しました");
    }
};
