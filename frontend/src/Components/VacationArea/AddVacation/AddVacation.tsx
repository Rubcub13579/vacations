import { useForm } from "react-hook-form";
import { VacationModel } from "../../../Models/VacationModel";
import { vacationService } from "../../../Services/VacationService";
import { notify } from "../../../Utils/Notify";
import "./AddVacation.css";
import { useNavigate } from "react-router-dom";

export function AddVacation(): JSX.Element {

    const { register, handleSubmit } = useForm<VacationModel>();
    const navigate = useNavigate()

    async function send(vacation: VacationModel) {
        try {
            vacation.image = (vacation.image as unknown as FileList)[0];
            await vacationService.addVacation(vacation);
            notify.success("Vacation was successfully added");
            navigate("/vacations")
        } catch (err: any) {
            notify.error(err)
        }
    }

    return (
        <div className="AddVacation">


            <form onSubmit={handleSubmit(send)}>

                <label>Destination</label>
                <input type="text" required {...register("destination")}></input>

                <label>Description</label>
                <input type="text" required {...register("description")}></input>

                <label>Start Of Vacation</label>
                <input type="date" required {...register("startDate")}></input>

                <label>End Of Vacation</label>
                <input type="date" required {...register("endDate")}></input>

                <label>Price</label>
                <input type="number" required {...register("price")}></input>

                <label>Image</label>
                <input type="file" accept="image/*" required {...register("image")}></input>

                <button>Add Vacation</button>
            </form>

        </div>
    );
}
