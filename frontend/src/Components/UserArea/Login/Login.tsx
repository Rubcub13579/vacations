import { useNavigate } from "react-router-dom";
import "./Login.css";
import { useForm } from "react-hook-form";
import { CredentialsModel } from "../../../Models/CredentialsModel";
import { notify } from "../../../Utils/Notify";
import { userService } from "../../../Services/UserService";
import { store } from "../../../redux/Store";
import { NavLink } from "react-router-dom";

export function Login(): JSX.Element {

    const navigate = useNavigate();
    const { register, handleSubmit } = useForm<CredentialsModel>();


    const send = async (credential: CredentialsModel) => {
        try {
            await userService.login(credential);
            notify.success("Welcome Back " + store.getState().user.firstName);
            navigate("/vacations");
        }
        catch (err: any) {
            notify.error(err)
        }
    }

    return (
        <div className="Login">

            <form onSubmit={handleSubmit(send)}>

                <label>Email: </label>
                <input type="email" required placeholder="yourmail@mail.com" {...register("email")} />

                <label>Password: </label>
                <input type="password" required placeholder="123qweasd" {...register("password")} />

                <button>Login</button>

                <NavLink to="/register">Don't have an account?</NavLink>

            </form>

        </div>
    );
}
