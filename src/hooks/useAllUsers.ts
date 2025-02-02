import { useState } from "react";
import { UserProfile } from "../types/userProfile";
import { User } from "../types/api/user";
import axios from "axios";

//　全ユーザー一覧を取得するカスタムフック
export const useAllUsers = () => {
    const [userProfiles, setUserProfiles] = useState<Array<UserProfile>>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const getUsers = async () => {
        setLoading(true);
        setError(false); // ここでエラーをリセット
    
        try {
            const res = await axios.get<Array<User>>("https://jsonplaceholder.typicode.com/users");
            const data = res.data.map((user) => ({
                id: user.id,
                name: `${user.name}(${user.username})`,
                email: user.email,
                address: `${user.address.city}${user.address.suite}${user.address.street}`,
            }));
            setUserProfiles(data);
        } catch {
            // console.error("API request failed:", error);
            setError(true);
        } finally {
            setLoading(false);
        }
    };
    //　オブジェクトでgetUsersとステート情報を返す
    return { getUsers, userProfiles, loading, error};
};