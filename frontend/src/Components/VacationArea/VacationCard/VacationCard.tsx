import { useEffect, useState } from "react";
import { FaEdit, FaHeart, FaRegHeart, FaTrash } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { UserModel } from "../../../Models/UserModel";
import { VacationModel } from "../../../Models/VacationModel";
import { vacationService } from "../../../Services/VacationService";
import "./VacationCard.css";

type VacationCardProps = {
    vacation: VacationModel;
    user: UserModel | null;
    deleteMe: (vacationId: number) => void
};

export function VacationCard(props: VacationCardProps): JSX.Element {
    const [liked, setLiked] = useState<boolean>(false);
    const [likesCount, setLikesCount] = useState(0);

    useEffect(() => {
        async function fetchLikeStatus() {
            try {
                if (props.user?.roleId === 2) {
                    const { likesCount, isLikedByUser } = await vacationService.showLikes(props.vacation.id);
                    setLiked(isLikedByUser);
                    setLikesCount(likesCount);
                }
            } catch (err) {
                console.error("Failed to fetch likes info", err);
            }
        }

        fetchLikeStatus();
    }, []);

    async function toggleLike(): Promise<void> {
        try {
            if (!props.user) return;

            if (liked) {
                await vacationService.unlike(props.vacation.id);
                setLikesCount((prev) => prev - 1);
            } else {
                await vacationService.like(props.vacation.id);
                setLikesCount((prev) => prev + 1);
            }
            setLiked(!liked);
        } catch (err) {
            console.error("Like/unlike failed", err);
        }
    }

    function handleDeleteVacation():void{
        const id = props.vacation.id;
        props.deleteMe(id)
    }


    return (
        <div className="VacationCard">
            <div className="card-content">
                <div className="card-header">
                    <h3>{props.vacation.destination}</h3>
                    {props.user?.roleId === 1 && (
                        <div className="button-group">
                            <NavLink to={"/edit-vacation/" + props.vacation.id} className="edit-button">
                                <FaEdit className="edit-icon" />
                                Edit
                            </NavLink>
                            <button onClick={handleDeleteVacation} className="delete-button">
                                <FaTrash className="delete-icon" />
                                Delete
                            </button>
                        </div>
                    )}
                </div>

                <p>{props.vacation.description}</p>
                <p>Price: ${props.vacation.price}</p>
                <span>
                    {new Date(props.vacation.startDate).toLocaleDateString("he-IL")} -{" "}
                    {new Date(props.vacation.endDate).toLocaleDateString("he-IL")}
                </span>

                {props.user?.roleId === 2 && (
                    <div className="like-section" onClick={toggleLike}>
                        {liked ? <FaHeart className="heart filled" /> : <FaRegHeart className="heart" />}
                        <span>{likesCount}</span>
                    </div>
                )}
            </div>

            <div className="card-image">
                <img
                    src={props.vacation.imageUrl}
                    alt={props.vacation.destination}
                    crossOrigin="anonymous"
                />
            </div>
        </div>
    );
}