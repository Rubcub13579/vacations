import { VacationModel } from "../Models/VacationModel";

class VacationsUtils {

    public sortVacations(
        vacations: VacationModel[],
        sortBy: string,
        likesMap: Record<number, boolean>
    ): VacationModel[] {
        const now = new Date();

        switch (sortBy) {
            case "likes":
                return vacations.filter(v => likesMap[v.id]);
            case "current":
                return vacations.filter(v => {
                    const start = new Date(v.startDate);
                    const end = new Date(v.endDate);
                    return start <= now && end >= now;
                });
            case "future":
                return vacations.filter(v => new Date(v.startDate) > now);
            default:
                return [...vacations];
        }

    }

    public paginate<T>(items: T[], currentPage: number, itemsPerPage: number): T[] {
        const startIndex = (currentPage - 1) * itemsPerPage;
        return items.slice(startIndex, startIndex + itemsPerPage);
    }

    public getTotalPages(totalItems: number, itemsPerPage: number): number {
        return Math.ceil(totalItems / itemsPerPage);
    }

}

export const vacationsUtils = new VacationsUtils()