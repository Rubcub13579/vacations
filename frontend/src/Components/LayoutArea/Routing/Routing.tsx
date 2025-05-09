import { Navigate, Route, Routes } from "react-router-dom";
import { Home } from "../../PagesArea/Home/Home";
import { Page404 } from "../Page404/Page404";
import "./Routing.css";
import { About } from "../../PagesArea/About/About";
import { Vacations } from "../../VacationArea/Vacations/Vacations";

export function Routing(): JSX.Element {
    return (
        <div className="Routing">
            <Routes>
                <Route path="/" element={<Navigate to="/home" />} />
                <Route path="/home" element={<Home />} />
                <Route path="/vacations" element={<Vacations/>} />
                <Route path="/about" element={<About />} />
                <Route path="*" element={<Page404 />} />
            </Routes>
        </div>
    );
}
