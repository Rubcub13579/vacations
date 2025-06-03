import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { UserModel } from "../../../Models/UserModel";
import { userService } from "../../../Services/UserService";
import { notify } from "../../../Utils/Notify";
import "./Register.css";

export function Register(): JSX.Element {

    const navigate = useNavigate();
    const { register, handleSubmit } = useForm<UserModel>()

    const send = async (user: UserModel) => {
        try {
            await userService.register(user);
            notify.success("Welcome " + user.firstName);
            navigate("/vacations");
        }
        catch (err: any) {
            notify.error(err)
        }
    }

    return (
        <div className="Register">

            <form onSubmit={handleSubmit(send)}>

                <label>First Name: </label>
                <input type="text" required {...register("firstName")} />

                <label>Last Name: </label>
                <input type="text" required {...register("lastName")} />

                <label>Password: </label>
                <input type="password" required minLength={4} {...register("password")} />

                <label>Email: </label>
                <input type="email" required {...register("email")} />

                <button>Register</button>

            </form>

        </div>
    );
}
