import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { UserModel } from "../../../Models/UserModel";
import { VacationModel } from "../../../Models/VacationModel";
import { vacationService } from "../../../Services/VacationService";
import { notify } from "../../../Utils/Notify";
import { AppState } from "../../../redux/Store";
import { VacationCard } from "../VacationCard/VacationCard";
import "./Vacations.css";
const vacationsPerPage = 9

export function Vacations(): JSX.Element {
    const [vacations, setVacations] = useState<VacationModel[]>([]);
    const user = useSelector<AppState, UserModel>(store => store.user);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [originalVacations, setOriginalVacations] = useState<VacationModel[]>([])
    const [likesMap, setLikesMap] = useState<Record<number, boolean>>({});


    const indexOfLastVacation = currentPage * vacationsPerPage;
    const indexOfFirstVacation = indexOfLastVacation - vacationsPerPage;
    const currentVacations = vacations.slice(indexOfFirstVacation, indexOfLastVacation);
    const totalPages = Math.ceil(vacations.length / vacationsPerPage)

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
        async function fetchVacationsAndLikes() {
            try {
                const vacations = await vacationService.getAllVacations();
                setOriginalVacations(vacations);
                setVacations(vacations);

                const newLikesMap: Record<number, boolean> = {};

                if (user?.roleId === 2) {
                    await Promise.all(
                        vacations.map(async (vac) => {
                            const { isLikedByUser } = await vacationService.showLikes(vac.id);
                            newLikesMap[vac.id] = isLikedByUser;
                        })
                    );
                    setLikesMap(newLikesMap);
                }
            } catch (err) {
                notify.error(err);
            }
        }

        fetchVacationsAndLikes();
    }, []);



    function sortingVacation(event: React.ChangeEvent<HTMLSelectElement>) {
        const sort = event.target.value;
        let filteredVacations: VacationModel[] = [];

        const now = new Date();

        if (sort === "likes") {
            filteredVacations = originalVacations.filter(v => likesMap[v.id]);
        } else if (sort === "current") {
            filteredVacations = originalVacations.filter(v => {
                const start = new Date(v.startDate);
                const end = new Date(v.endDate);
                return start <= now && end >= now;
            });
        } else if (sort === "future") {
            filteredVacations = originalVacations.filter(v => new Date(v.startDate) > now);
        } else {
            filteredVacations = [...originalVacations];
        }

        setVacations(filteredVacations);
        setCurrentPage(1);
    }




    return (
        <div className="Vacations">
            {user?.roleId === 2 &&
                <div className="sorting-by">
                    <label>Sort By: </label>
                    <div className="vacation-select">
                        <select onChange={sortingVacation}>
                            <option value="all">All Vacations</option>
                            <option value="likes">Liked Vacations</option>
                            <option value="current">Current Vacations</option>
                            <option value="future">Future Vacations</option>
                        </select>
                    </div>
                </div>
            }

            {user?.roleId === 1 && <NavLink to={"/add-vacation"}>Add Vacation</NavLink>}


            {user ? (
                <>

                    <div className="pagination">
                        <button disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}>Prev</button>
                        {[...Array(totalPages)].map((_, i) => {
                            const page = i + 1;
                            return (
                                <button
                                    key={page}
                                    className={page === currentPage ? "active" : ""}
                                    onClick={() => setCurrentPage(page)}
                                >
                                    {page}
                                </button>
                            );
                        })}
                        <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(currentPage + 1)}>Next</button>
                    </div>

                    <div className="vacations-grid">
                        {currentVacations.map(v => (
                            <VacationCard deleteMe={deleteVacation} key={v.id} vacation={v} user={user} />
                        ))}
                    </div>

                    <div className="pagination">
                        <button disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}>Prev</button>
                        {[...Array(totalPages)].map((_, i) => {
                            const page = i + 1;
                            return (
                                <button key={page} className={page === currentPage ? "active" : ""} onClick={() => setCurrentPage(page)}> {page} </button>
                            );
                        })}
                        <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(currentPage + 1)}>Next</button>
                    </div>
                </>
            ) : (
                <div className="notRegistered">
                    <h2>Please login to see vacations</h2>
                    <NavLink to="/login">Login</NavLink>
                    <NavLink to="/register">Register</NavLink>
                </div>
            )}
        </div>

    );
}