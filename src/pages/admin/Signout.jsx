import { useContext } from "react";
import { useHistory } from "react-router";
import { UserContext } from "../../useContext";

export const Signout = () => {
    let [isAuth, setIsAuth ] = useContext(UserContext);
    let history = useHistory();
    return(
        <>
            <h2> are you sure you want to exit the site?!</h2>

            <button onClick = { () => {
                setIsAuth(false);
                localStorage.removeItem("auth_token");
                history.push("/signin")
            }}>signout</button>
        </>
    )
};