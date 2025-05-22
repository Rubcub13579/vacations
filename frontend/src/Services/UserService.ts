import { jwtDecode } from "jwt-decode";
import { UserModel } from "../Models/UserModel";
import { userSlice } from "../redux/UserSlice";
import { store } from "../redux/Store";
import axios from "axios";
import { appConfig } from "../Utils/AppConfig";
import { CredentialsModel } from "../Models/CredentialsModel";
import { jwtUtils } from "../Utils/JwtUtils";


class UserService {

    public constructor() {
        
        const token = localStorage.getItem("token");
        if (!token || jwtUtils.isTokenExpired(token)){
            localStorage.removeItem("token")
            return;
        } 
            
        const userContainer = jwtDecode<{ user: UserModel }>(token);
        const dbUser = userContainer.user;

        const action = userSlice.actions.initUser(dbUser);
        store.dispatch(action);

    }

    public async register(user: UserModel): Promise<void> {

        const response = await axios.post<string>(appConfig.registerUrl, user);

        const token = response.data;

        const userContainer = jwtDecode<{ user: UserModel }>(token);
        const dbUser = userContainer.user;

        const action = userSlice.actions.initUser(dbUser);
        store.dispatch(action);

        localStorage.setItem("token", token);
    }

    public async login(credentials: CredentialsModel): Promise<void> {

        const response = await axios.post<string>(appConfig.loginUrl, credentials);

        const token = response.data;

        const userContainer = jwtDecode<{ user: UserModel }>(token);
        const dbUser = userContainer.user;

        const action = userSlice.actions.initUser(dbUser);
        store.dispatch(action);

        localStorage.setItem("token", token);

    }

    public logout():void{

        const action = userSlice.actions.logoutUser();
        store.dispatch(action);

        localStorage.removeItem("token");
    }


}

export const userService = new UserService();
