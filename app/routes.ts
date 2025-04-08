import {
	type RouteConfig,
	index,
	prefix,
	route,
} from "@react-router/dev/routes";

export default [
	index("routes/home.tsx"),
	...prefix("user", [
		index("routes/user/UserListPage.tsx"),
		route("new", "routes/user/UserCreatePage.tsx"),
		route(":id", "routes/user/UserDetailPage.tsx"),
		route(":id/info", "routes/user/UserInfoPage.tsx"),
	]),
] satisfies RouteConfig;
