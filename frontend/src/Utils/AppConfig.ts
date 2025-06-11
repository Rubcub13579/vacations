class AppConfig {
	public readonly VacationsUrl = "http://localhost:4000/api/vacations/"
	public readonly allLikesUrl = "http://localhost:4000/api/all-likes/"
	public readonly LikesUrl = "http://localhost:4000/api/vacations/like/"
	public readonly registerUrl = "http://localhost:4000/api/register/"
	public readonly loginUrl = "http://localhost:4000/api/login/"
}

export const appConfig = new AppConfig();
