import { useEffect, useState } from "react";
import { VacationCard } from "../VacationCard/VacationCard";
import "./Vacations.css";
import { VacationModel } from "../../../Models/VacationModel";
import { vacationService } from "../../../Services/VacationService";
import { notify } from "../../../Utils/Notify";

export function Vacations(): JSX.Element {

    const [vacations, setVacations] = useState<VacationModel[]>([]);

    useEffect(() => {
        vacationService.getAllVacations()
            .then(vacations => setVacations(vacations))
            .catch(err => notify.error(err))
    }, [])

    return (
        <div className="Vacations">
            {vacations.map(v => <VacationCard key={v.id} vacation={v} />)}
        </div>
    );
}
