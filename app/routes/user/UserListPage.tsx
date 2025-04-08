import { appInjector } from "~/di";
import type { Route } from "./+types/UserListPage";
import { UserCard } from "./component/UserCard";
import type { DBStorageContext } from "~/infrastructure/db/db_storage";
import { db } from "~/infrastructure/db/db";
import { Link } from "react-router";

export async function loader({ request }: Route.LoaderArgs) {
    const dbStorage = appInjector.resolve("dbStorage");
    const dbContext: DBStorageContext = {
        request,
        db
    }

    const users = await dbStorage.run(dbContext, async () => {
        const getAllUserUseCase = appInjector.resolve("user/GetAllUserUseCase")
        return await getAllUserUseCase.execute();
    })

    return { users };
}

// /usersを表示するページコンポーネント
export default function UserListPage({ loaderData }: Route.ComponentProps) {
    return (
        <div className="container mx-auto py-8">
            <h1 className="text-2xl font-bold mb-6">User List</h1>
            <div>
                <Link to="/user/create" className="text-blue-500 hover:underline">
                    Create New User
                </Link>
            </div>
            <div className="space-y-4">
                {loaderData.users.map(user => (
                    <div key={user.id}>
                        <UserCard user={user} />
                        <div className="flex justify-center mt-2">
                            <Link to={`./${user.id}`} className="text-blue-500 hover:underline">
                                View Details
                            </Link>
                            <Link to={`./${user.id}/info`} className="text-blue-500 hover:underline ml-4">
                                View Info
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}