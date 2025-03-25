import axios from "axios";
import { User } from "../../models/user";

const API_URL = "http://localhost:8080/users/";

export const ListApi = async (): Promise<User[]> => {
    const res = await axios.get<User[]>(API_URL);
    return res.data;
};

export const CreateApi = async (name: string, email: string): Promise<void> => {
    await axios.post(API_URL, { Name: name, Email: email });
};

export const UpdateApi = async (id: number, name: string, email: string): Promise<void> => {
    await axios.put(`${API_URL}/${id}`, { Name: name, Email: email });
};

export const DeleteApi = async (id: number): Promise<void> => {
    await axios.delete(`${API_URL}/${id}`);
};
