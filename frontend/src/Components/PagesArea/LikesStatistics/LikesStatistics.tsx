import { useEffect, useState } from "react";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { LikesModel } from "../../../Models/LikesModel";
import { vacationService } from "../../../Services/VacationService";
import { notify } from "../../../Utils/Notify";
import "./LikesStatistics.css";
import { Tooltip } from "recharts";


export function LikesStatistics(): JSX.Element {


    const [likes, setLikes] = useState<LikesModel[]>([]);

    useEffect(() => {
        vacationService.getAllLikes()
            .then(likes => setLikes(likes))
            .catch(err => notify.error(err))
    }, []);


    function handleDownload(likes: LikesModel[]) {
        let csvContent = "Vacation,Likes\n";
        for (const item of likes) {
            const safeName = item.vacationName.replace(/, /g, "-");
            csvContent += `${safeName},${item.likes}\n`;
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
        <div className="LikesStatistics">
            <h2>Vacations Likes Statistics</h2>
            <ResponsiveContainer width="100%" height={400}>
                <BarChart data={likes} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="vacationName" />
                    <YAxis allowDecimals={false} interval={0} tickFormatter={(value) => value} />
                    <Tooltip />
                    <Bar dataKey="likes" fill="#8884d8" radius={[8, 8, 0, 0]} />
                </BarChart>
            </ResponsiveContainer>

            <button onClick={() => { handleDownload(likes) }}>Download CSV</button>

        </div>



    );
}
