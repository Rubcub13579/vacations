import { useEffect, useState } from "react";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { LikesModel } from "../../../Models/LikesModel";
import { vacationService } from "../../../Services/VacationService";
import { notify } from "../../../Utils/Notify";
import "./LikesStatistics.css";
import { Tooltip } from "recharts";
import { useSelector } from "react-redux";
import { AppState } from "../../../redux/Store";
import { UserModel } from "../../../Models/UserModel";


export function LikesStatistics(): JSX.Element {

    const user = useSelector<AppState, UserModel>(store => store.user);
    const [likes, setLikes] = useState<LikesModel[]>([]);

    useEffect(() => {
        vacationService.getAllLikes()
            .then(likes => setLikes(likes))
            .catch(err => notify.error(err))
    }, []);


    function handleDownload(likes: LikesModel[]) {
        let csvContent = "Vacation,Likes\n";
        for (const l of likes) {
            const safeName = l.vacationName.replace(/, /g, "-");
            csvContent += `${safeName},${l.likesAmount}\n`;
        }
        const blob = new Blob([csvContent], { type: "text/csv" });
        const url = URL.createObjectURL(blob);

        const a = document.createElement("a");
        a.href = url;
        a.download = "vacation-likes.csv";
        a.click();

        URL.revokeObjectURL(url)
    }


    return (


        <div className="LikesStatistics" >
            { user?.roleId === 1 ?
                <div>
                    <h2>Vacations Likes Statistics</h2>
                    <ResponsiveContainer width="100%" height={400}>
                        <BarChart data={likes} margin={{ top: 20, right: 30, left: 20, bottom: 130 }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="vacationName" interval={0} angle={-45} textAnchor="end" />
                            <YAxis allowDecimals={false} interval={0} tickFormatter={(value) => value} />
                            <Tooltip />
                            <Bar dataKey="likes" fill="#8884d8" radius={[8, 8, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                    <button onClick={() => { handleDownload(likes) }}>Download CSV</button>
                </div>
                :
                    <p> You are not admin! </p>
                }

        </div >



    );
}
