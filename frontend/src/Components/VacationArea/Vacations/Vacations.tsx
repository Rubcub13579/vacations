import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { UserModel } from "../../../Models/UserModel";
import { VacationModel } from "../../../Models/VacationModel";
import { vacationService } from "../../../Services/VacationService";
import { notify } from "../../../Utils/Notify";
import { AppState } from "../../../redux/Store";
import { VacationCard } from "../VacationCard/VacationCard";
import "./Vacations.css";

export function Vacations(): JSX.Element {

    const [vacations, setVacations] = useState<VacationModel[]>([]);
    const user = useSelector<AppState, UserModel>(store => store.user)



    useEffect(() => {
        vacationService.getAllVacations()
            .then(vacations => setVacations(vacations))
            .catch(err => notify.error(err))
    }, [])



    return (
        <div className="Vacations">
            {vacations.map(v => <VacationCard key={v.id} vacation={v} user={user} />)}
        </div>
    );
}
