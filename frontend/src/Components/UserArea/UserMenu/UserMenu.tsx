import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { UserModel } from "../../../Models/UserModel";
import { AppState } from "../../../redux/Store";
import { userService } from "../../../Services/UserService";
import { notify } from "../../../Utils/Notify";
import "./UserMenu.css";

export function UserMenu(): JSX.Element {

    const user = useSelector<AppState, UserModel>(store => store.user);

    function logOut() {
        userService.logout();
        notify.success("See You Later.")
    }


    return (
        <div className="UserMenu">


            {!user && <div>
                <span>Hello Guest</span>
                <NavLink to="/register">Register</NavLink>
                <NavLink to="/login">Login</NavLink>
            </div>}             


            {user && <div>
                {user?.roleId === 1 && <NavLink to="/statistics">Likes statistics</NavLink>}
                <span>Hello {user.firstName} {user.lastName} </span>
                <NavLink to="/" onClick={logOut}>Logout</NavLink>
            </div>}

        </div>

    );
}
