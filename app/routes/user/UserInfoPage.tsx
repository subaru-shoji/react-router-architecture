import { serverInjector } from "~/di/server_di";
import { UserCard } from "./component/UserCard";
import type { DBStorageContext } from "~/infrastructure/db/db_storage";
import { db } from "~/infrastructure/db/db";
import type { Route } from "./+types/UserInfoPage";

export async function loader({ params, request }: Route.LoaderArgs) {
    const userId = Number(params.id);

    const dbStorage = serverInjector.resolve("dbStorage");
    const dbContext: DBStorageContext = {
        request,
        db
    }

    const userInfo = await dbStorage.run(dbContext, async () => {
        const getUserInfoUseCase = serverInjector.resolve("userInfo/GetUserInfoUseCase")
        return await getUserInfoUseCase.execute(userId);
    })

    return { userInfo };
}

// /usersを表示するページコンポーネント
export default function UserListPage({ loaderData }: Route.ComponentProps) {
    return (
        <div className="container mx-auto py-8">
            <h1 className="text-2xl font-bold mb-6">User Detail</h1>
            <div className="space-y-4">
                <UserCard key={loaderData.userInfo.user.id} user={loaderData.userInfo.user} />
            </div>
            <div className="space-y-4">
                <pre>
                    {JSON.stringify(loaderData.userInfo, null, 2)}
                </pre>
            </div>
        </div>
    );
}