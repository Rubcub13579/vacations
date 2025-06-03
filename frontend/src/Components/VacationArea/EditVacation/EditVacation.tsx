import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { VacationModel } from "../../../Models/VacationModel";
import { vacationService } from "../../../Services/VacationService";
import { notify } from "../../../Utils/Notify";
import "./EditVacation.css";
import { useSelector } from "react-redux";
import { AppState } from "../../../redux/Store";
import { UserModel } from "../../../Models/UserModel";

export function EditVacation(): JSX.Element {

    const params = useParams()
    const id = +params.vacationId

    const navigate = useNavigate()
    const { register, handleSubmit, setValue } = useForm<VacationModel>()
    const user = useSelector<AppState, UserModel>(store => store.user)
    const [previewImageUrl, setPreviewImageUrl] = useState<string>("")

    function toInputDateFormat(dateString: string): string {
        return new Date(dateString).toISOString().split("T")[0]; // Extract just the date
    }

    useEffect(() => {
        vacationService.getOneVacation(id)
            .then(vacation => {
                setValue("destination", vacation.destination)
                setValue("description", vacation.description)
                setValue("startDate", toInputDateFormat(vacation.startDate))
                setValue("endDate", toInputDateFormat(vacation.endDate))
                setValue("price", vacation.price)
                setPreviewImageUrl(vacation.imageUrl)
            })
            .catch(err => notify.error(err))
    }, [])

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            const url = URL.createObjectURL(file)
            setPreviewImageUrl(url)
        }
    }

    async function send(vacation: VacationModel) {
        try {
            vacation.id = id;

            // Check if a new image was selected
            const fileInput = vacation.image as unknown as FileList;
            if (fileInput && fileInput.length > 0 && fileInput[0]) {
                // New image selected
                vacation.image = fileInput[0];
            } else {
                // No new image selected, remove the image property entirely
                // so the backend knows not to update the image
                delete vacation.image;
            }

            await vacationService.updateVacation(vacation);
            notify.success("Vacation has been updated");
            navigate("/vacations");
        } catch (err: any) {
            notify.error(err);
        }
    }

    return (
        <div className="EditVacation">
            {user?.roleId === 1 ? (
                <form onSubmit={handleSubmit(send)}>
                    <label>Destination</label>
                    <input type="text" required {...register("destination")} />

                    <label>Description</label>
                    <input type="text" required {...register("description")} />

                    <label>Start Of Vacation</label>
                    <input type="date" required {...register("startDate")} />

                    <label>End Of Vacation</label>
                    <input type="date" required {...register("endDate")} />

                    <label>Price</label>
                    <input type="number" required {...register("price")} />

                    <label>Image</label>
                    {previewImageUrl && (
                        <div className="current-image">
                            <img
                                src={previewImageUrl}
                            />
                            <p>
                                Current image (leave empty to keep this image)
                            </p>
                        </div>
                    )}
                    <input
                        type="file"
                        accept="image/*"
                        {...register("image")}
                        onChange={handleImageChange}
                    />

                    <button type="submit">Update</button>
                    <button onClick={() => navigate("/vacations")}>Cancel</button>
                </form>
            )
                :
                (<p>You are not an admin</p>)}
        </div>
    );
}