import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { UserModel } from "../../../Models/UserModel";
import { VacationModel } from "../../../Models/VacationModel";
import { vacationService } from "../../../Services/VacationService";
import { notify } from "../../../Utils/Notify";
import { AppState } from "../../../redux/Store";
import { VacationCard } from "../VacationCard/VacationCard";
import "./Vacations.css";
import { NavLink } from "react-router-dom";

export function Vacations(): JSX.Element {
    const [vacations, setVacations] = useState<VacationModel[]>([]);
    const user = useSelector<AppState, UserModel>(store => store.user)


    async function deleteVacation(vacationId: number): Promise<void> {

        try {
            const id = vacationId;
            const sure = confirm("Are you sure?")
            if (!sure) return
            await vacationService.deleteVacation(id)
            notify.success("Vacation Deleted")
            const remaining = vacations.filter(v => v.id !== id)
            setVacations(remaining);
        }
        catch (err) {
            notify.error(err)
        }
    }


    useEffect(() => {
        vacationService.getAllVacations()
            .then(vacations => setVacations(vacations))
            .catch(err => notify.error(err))
    }, [])



    return (
        <div className="Vacations">
            {user.roleId === 1 && <NavLink to={"/add-vacation"}>Add Vacation</NavLink>}
            {user ?
                vacations.map(v => <VacationCard deleteMe={deleteVacation} key={v.id} vacation={v} user={user} />) :
                <div className="notRegistered">
                    <h2>Please login to see vacations</h2>
                    <NavLink to="/login">Login</NavLink>
                    <NavLink to="/register">Register</NavLink>
                </div>
            }
        </div>
    );
}
