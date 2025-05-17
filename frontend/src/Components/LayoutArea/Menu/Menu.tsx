import { NavLink } from "react-router-dom";
import "./Menu.css";
import { UserMenu } from "../../UserArea/UserMenu/UserMenu";

export function Menu(): JSX.Element {
    return (
        <div className="Menu">

            <NavLink to="/home">Home</NavLink>
            <NavLink to="/vacations">Vacations</NavLink>
            <NavLink to="/about">About</NavLink>
            <UserMenu/>

        </div>
    );
}
