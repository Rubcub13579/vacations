import { useEffect, useState } from "react";
import { UserModel } from "../../../Models/UserModel";
import { VacationModel } from "../../../Models/VacationModel";
import { vacationService } from "../../../Services/VacationService";
import "./VacationCard.css";
import { FaHeart, FaRegHeart } from "react-icons/fa";

type VacationCardProps = {
    vacation: VacationModel;
    user: UserModel | null;
};

export function VacationCard(props: VacationCardProps): JSX.Element {
    const [liked, setLiked] = useState(false);
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
    }, [props.vacation.id, props.user]);

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


    return (
        <div className="VacationCard">
            <div className="card-content">
                <h3>{props.vacation.destination}</h3>
                <p>{props.vacation.description}</p>
                <p>Price: ${props.vacation.price}</p>
                <span>
                    {new Date(props.vacation.startDate).toLocaleDateString()} -{" "}
                    {new Date(props.vacation.endDate).toLocaleDateString()}
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
