import { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import Forbidden from "../../components/Erreur/403";
import instance from "../api/http-common";
export const RequireAuth = ({ children, authorities }) => {
    const [isAuth, setIsAuth] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);
    const [userRoles, setUserRoles] = useState([]);
    const location = useLocation();

    console.log("ROLES :", authorities);

    function hasPermission(grantedAuthorities, roles) {
        let isGranted = false; //if tableau ou *
        /*if (grantedAuthorities === "*" && roles.length === 1) {
            if (roles[0].roleLib === "Public") {
                return false;
            } else {
                return true;
            }
        } else {
            return true;
        }*/
        grantedAuthorities.map((authoritie) => {
            roles.some(function (role) {
                if (!isGranted) isGranted = role.roleLib === authoritie;
                return isGranted;
            });
            return authoritie;
        });
        return isGranted;
    }

    useEffect(() => {
        instance({
            method: "get",
            url: "/auth/isAuthenticated",
            withCredentials: true,
        }).then(
            (response) => {
                console.log(response.data);
                if (response.data.isAuth) {
                    setIsLoaded(true);
                    setUserRoles(response.data.userDetails.siigpeRoleList);
                    setIsAuth(true);
                } else {
                    localStorage.removeItem("token");
                    setIsLoaded(true);
                    setIsAuth(false);
                }
            },
            (error) => {
                localStorage.removeItem("token");
                setIsLoaded(true);
                setIsAuth(false);
            }
        );
    }, []);
    if (isLoaded) {
        return isAuth ? (
            hasPermission(authorities, userRoles) ? (
                children
            ) : (
                <Forbidden />
            )
        ) : (
            <Navigate to={"/login"} state={{ from: location.pathname }}/>
        );
    }
};
