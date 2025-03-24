export type User = {
    ID: number;
    Name: string;
    Email: string;
    CreatedAt: string;
    UpdatedAt: string;
    DeletedAt?: string | null; // 削除フラグは null になる可能性がある
};
