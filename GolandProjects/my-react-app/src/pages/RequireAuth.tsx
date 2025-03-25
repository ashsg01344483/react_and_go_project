import { Navigate } from "react-router-dom";

type Props = {
    // @ts-ignore
    children: JSX.Element;
};

export default function RequireAuth({ children }: Props) {
    const userId = localStorage.getItem("userId");

    if (!userId) {
        return <Navigate to="/login" replace />;
    }

    return children;
}
