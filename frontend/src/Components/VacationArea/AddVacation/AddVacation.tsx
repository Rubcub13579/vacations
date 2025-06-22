import { useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { UserModel } from "../../../Models/UserModel";
import { VacationModel } from "../../../Models/VacationModel";
import { AppState } from "../../../redux/Store";
import { vacationService } from "../../../Services/VacationService";
import { notify } from "../../../Utils/Notify";
import "./AddVacation.css";


const date = new Date;
const day = String(date.getDate()).padStart(2, '0');
const month = String(date.getMonth() + 1).padStart(2, '0');
const year = String(date.getFullYear());

const currentDate = `${year}-${month}-${day}`

export function AddVacation(): JSX.Element {

    const { register, handleSubmit } = useForm<VacationModel>();
    const navigate = useNavigate();
    const user = useSelector<AppState, UserModel>(store => store.user);
    const [previewImageUrl, setPreviewImageUrl] = useState<string>("");


    async function send(vacation: VacationModel) {
        try {
            if (vacation.startDate > vacation.endDate) {
                notify.error("Please enter correct date");
                return;
            }
            vacation.image = (vacation.image as unknown as FileList)[0];
            await vacationService.addVacation(vacation);
            notify.success("Vacation was successfully added");
            navigate("/vacations");
        } catch (err: any) {
            notify.error(err);
        }
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const url = URL.createObjectURL(file);
            setPreviewImageUrl(url);
        }
    };

    return (
        <div className="AddVacation">

            {user?.roleId === 1 ? (<form onSubmit={handleSubmit(send)}>

                <label>Destination</label>
                <input type="text" required {...register("destination")}></input>

                <label>Description</label>
                <input type="text" required {...register("description")}></input>

                <label>Start Of Vacation</label>
                <input type="date" required {...register("startDate")}></input>

                <label>End Of Vacation</label>
                <input type="date" min={currentDate} required {...register("endDate")}></input>

                <label>Price</label>
                <input type="number" required {...register("price")}></input>

                <label>Image</label>
                {previewImageUrl && (
                    <div className="current-image">
                        <img src={previewImageUrl} />
                        <p>Current image (leave empty to keep this image)</p>
                    </div>
                )}
                <input
                    type="file"
                    accept="image/*"
                    {...register("image")}
                    onChange={handleImageChange}
                />

                <button type="submit">Add Vacation</button>
                <NavLink to="/vacations">Cancel</NavLink>
                
            </form>)
                :
                (<p> You are not admin! </p>)
            }

        </div>
    );
}
