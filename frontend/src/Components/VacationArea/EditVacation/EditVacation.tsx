import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { UserModel } from "../../../Models/UserModel";
import { VacationModel } from "../../../Models/VacationModel";
import { AppState } from "../../../redux/Store";
import { vacationService } from "../../../Services/VacationService";
import { notify } from "../../../Utils/Notify";
import "./EditVacation.css";

const date = new Date;
const day = String(date.getDate()).padStart(2, '0');
const month = String(date.getMonth() + 1).padStart(2, '0');
const year = String(date.getFullYear());

const currentDate = `${year}-${month}-${day}`

export function EditVacation(): JSX.Element {

    const params = useParams()
    const id = +params.vacationId

    const navigate = useNavigate()
    const { register, handleSubmit, setValue } = useForm<VacationModel>()
    const user = useSelector<AppState, UserModel>(store => store.user)
    const [previewImageUrl, setPreviewImageUrl] = useState<string>("")

    function toInputDateFormat(dateString: string): string {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = ("0" + (date.getMonth() + 1)).slice(-2);
        const day = ("0" + date.getDate()).slice(-2);
        return `${year}-${month}-${day}`;
    }


    useEffect(() => {
        vacationService.getOneVacation(id)
            .then(vacation => {
                setValue("destination", vacation.destination);
                setValue("description", vacation.description);
                setValue("startDate", toInputDateFormat(vacation.startDate));
                setValue("endDate", toInputDateFormat(vacation.endDate));
                setValue("price", vacation.price);
                setPreviewImageUrl(vacation.imageUrl);
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
            if (vacation.startDate > vacation.endDate) {
                notify.error("Please enter correct date");
                return;
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
                    <input type="date" min={currentDate} required {...register("endDate")} />

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
                    <NavLink to="/vacations">Cancel</NavLink>
                </form>)
                :
                (<p>You are not an admin</p>)}
        </div>
    );
}