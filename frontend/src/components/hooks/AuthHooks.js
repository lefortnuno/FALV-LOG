import { useContext } from "react";
import { AuthContext } from "../auth/AuthContext";

const AuthHooks = () => {
    return useContext(AuthContext);
}

export default AuthHooks;