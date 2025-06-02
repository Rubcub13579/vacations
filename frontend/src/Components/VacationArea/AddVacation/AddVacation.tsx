import { useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { UserModel } from "../../../Models/UserModel";
import { VacationModel } from "../../../Models/VacationModel";
import { AppState } from "../../../redux/Store";
import { vacationService } from "../../../Services/VacationService";
import { notify } from "../../../Utils/Notify";
import "./AddVacation.css";

export function AddVacation(): JSX.Element {

    const { register, handleSubmit } = useForm<VacationModel>();
    const navigate = useNavigate();
    const user = useSelector<AppState,UserModel>(store => store.user);
    const [previewImageUrl, setPreviewImageUrl] = useState<string>("");


    async function send(vacation: VacationModel) {
        try {
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
                <input type="date" required {...register("endDate")}></input>

                <label>Price</label>
                <input type="number" required {...register("price")}></input>

                <label>Image</label>
                {previewImageUrl && (
                    <div className="current-image">
                        <img
                            src={previewImageUrl}
                            alt="Current vacation"
                            style={{
                                maxWidth: "200px",
                                maxHeight: "150px",
                                objectFit: "cover",
                                borderRadius: "8px",
                                marginBottom: "10px",
                                border: "2px solid rgba(102, 126, 234, 0.3)"
                            }}
                        />
                        <p style={{ fontSize: "14px", color: "#666", margin: "5px 0" }}>
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

                <button type="submit">Add Vacation</button>

            </form>) 
            : 
                (<p> You are not an admin </p>)
            }

        </div>
    );
}
