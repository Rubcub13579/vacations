const baseUrl = "http://localhost:4000/api/"
class AppConfig {
	public readonly VacationsUrl = `${baseUrl}vacations/`
	public readonly allLikesUrl = `${baseUrl}all-likes/`
	public readonly LikesUrl = `${baseUrl}vacations/like/`
	public readonly registerUrl = `${baseUrl}register/`
	public readonly loginUrl = `${baseUrl}login/`
}

export const appConfig = new AppConfig();
