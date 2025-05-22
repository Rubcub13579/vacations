import { useEffect, useState } from "react";
import { VacationModel } from "../../../Models/VacationModel";
import "./VacationCard.css";
import { vacationService } from "../../../Services/VacationService";


type VacationCardProps = {
    vacation: VacationModel
}

export function VacationCard(props: VacationCardProps): JSX.Element {



    return (
        <div className="VacationCard">
            <div>
                <button></button>
                <span>{props.vacation.destination}</span>
                <span>{props.vacation.description}</span>
                <span>{props.vacation.price}</span>
            </div>
            <div>
                <img src={props.vacation.imageUrl} crossOrigin="anonymous" />
            </div>

        </div>
    );
}
