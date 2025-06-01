import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { VacationModel } from "../../../Models/VacationModel";
import { vacationService } from "../../../Services/VacationService";
import { notify } from "../../../Utils/Notify";
import "./EditVacation.css";

export function EditVacation(): JSX.Element {

    const params = useParams()
    const id = +params.vacationId

    const navigate = useNavigate()
    const { register, handleSubmit, setValue } = useForm<VacationModel>()

    function toInputDateFormat(dateString: string): string {
        return new Date(dateString).toISOString().split("T")[0]; // Extract just the date
    }
    

    useEffect(() => {
        vacationService.getOneVacation(id)
            .then(vacation => {
                console.log(vacation.imageUrl);
                // fix
                setValue("destination", vacation.destination)
                setValue("description", vacation.description)
                setValue("startDate", toInputDateFormat(vacation.startDate))
                setValue("endDate", toInputDateFormat(vacation.endDate))
                setValue("price", vacation.price)
                setValue("price", vacation.price)
            })
            .catch(err => notify.error(err))
    }, [])

    async function send(vacation: VacationModel) {
        try {
            vacation.id = id;
            vacation.image = (vacation.image as unknown as FileList)[0];
            await vacationService.updateVacation(vacation);
            notify.success("Vacation has been updated")
            navigate("/vacations")
        } catch
        (err: any) {
            notify.error(err)
        }
    }


    return (
        <div className="EditVacation">


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

                <button>Update</button>
            </form>


        </div>
    );
}
