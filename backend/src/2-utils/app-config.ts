import dotenv from "dotenv";

dotenv.config();


class AppConfig{


    public readonly isDevelopment = process.env.ENVIRONMENT = "development";
    public readonly isTest = process.env.ENVIRONMENT = "test";
    public readonly isStage = process.env.ENVIRONMENT = "stage";
    public readonly isProduction = process.env.ENVIRONMENT = "production";

    public readonly port = process.env.PORT
    public readonly host = process.env.MYSQL_HOST
    public readonly user = process.env.MYSQL_USER
    public readonly password = process.env.MYSQL_PASSWORD
    public readonly database = process.env.MYSQL_DATABASE
    public readonly imagesUrl = process.env.IMAGES_URL;
    public readonly hashSalt = process.env.HASH_SALT;

}


export const appConfig = new AppConfig()