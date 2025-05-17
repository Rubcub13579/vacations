import { Notyf } from "notyf";


class Notify {

    private notyf = new Notyf({
        duration: 3000,
        dismissible: true,
        position: { x: "center", y: "top" }
    });

    public success(message: string): void {
        this.notyf.success(message);
    }

    public error(err: any): void {
        const message = this.getMessage(err);
        this.notyf.error(message);
    }

    private getMessage(err: any): string {

        if (typeof err === "string") return err;

        if (typeof err?.response?.data === "string") return err.response.data;

        if (typeof err?.response?.data?.error === "string") return err.response.data.error;

        if (typeof err.message === "string") return err.message;

        return "Some Error, Please Try Again"

    }

}

export const notify = new Notify();
