import { OkPacketParams } from "mysql2";
import { cyber } from "../2-utils/cyber";
import { UserModel } from "../3-models/user-Model";
import { dal } from "../2-utils/dal";
import { CredentialsModel } from "../3-models/credential-model";
import { ClientError } from "../3-models/client-error";
import { StatusCode } from "../3-models/enums";
import { RoleModel } from "../3-models/role-model";


class UserService {


    public async register(user: UserModel): Promise<string> {

        user.password = cyber.hash(user.password);

        const sql = "insert into users( firstName, lastName, email, password, roleId) values(?,?,?,?,?)";
        const values = [user.firstName, user.lastName, user.email, user.password, RoleModel.user];

        const info: OkPacketParams = await dal.execute(sql, values) as OkPacketParams;

        user.id = info.insertId;

        const token = cyber.getNewToken(user);

        return token;
    }

    public async login(credentials: CredentialsModel): Promise<string> {

        credentials.password = cyber.hash(credentials.password);

        const sql = "select * from users where email = ? and password = ?";
        const values = [credentials.email, credentials.password];

        const users = await dal.execute(sql, values) as UserModel[];
        const user = users[0];

        if (!user) throw new ClientError(StatusCode.Unauthorized, "Incorrect email or password");

        const token = cyber.getNewToken(user);

        return token;

    }
}

export const userService = new UserService();
