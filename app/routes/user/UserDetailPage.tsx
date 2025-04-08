import { serverInjector } from "~/di/server_di";
import { UserCard } from "./component/UserCard";
import type { DBStorageContext } from "~/infrastructure/db/db_storage";
import { db } from "~/infrastructure/db/db";
import type { Route } from "./+types/UserDetailPage";
import { User } from "~/domain/model/user";
import { useSubmit } from "react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMemo, useState } from "react";
import { clientInjector } from "~/di/client_di";

export async function loader({ params, request }: Route.LoaderArgs) {
    const userId = Number(params.id);

    const dbStorage = serverInjector.resolve("dbStorage");
    const dbContext: DBStorageContext = {
        request,
        db
    }

    const user = await dbStorage.run(dbContext, async () => {
        const getUserUseCase = serverInjector.resolve("user/GetUserUseCase")
        return await getUserUseCase.execute(userId);
    })

    return { user };
}

export async function action({ request }: Route.ActionArgs) {
    console.log("action data", "hello");

    const data = await request.json();

    const parseResult = User.userSchema.safeParse(data)

    if (!parseResult.success) {
        return parseResult.error;
    }

    await serverInjector.resolve("dbStorage").run({ request, db }, async () => {
        const updateUserUseCase = serverInjector.resolve("user/UpdateUserUseCase")
        await updateUserUseCase.execute(parseResult.data);
    })

    return {};
}


// /usersを表示するページコンポーネント
export default function UserDetailPage({ loaderData, actionData }: Route.ComponentProps) {
    const [point, setPoint] = useState(0);
    const calculatePoint = useMemo(() => {
        const pointCalculationService = clientInjector.resolve("pointCalculateService");
        const result = pointCalculationService.calculatePoints(loaderData.user, { amount: point });
        return result;
    }, [point, loaderData.user]);

    const submit = useSubmit();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: loaderData.user,
        resolver: zodResolver(User.userSchema),
    });

    const onSubmit = handleSubmit((d) => submit(d, {
        method: "post",
        encType: "application/json",
    }))

    return (
        <div className="container mx-auto py-8">
            <h1 className="text-2xl font-bold mb-6">User Detail</h1>
            <div className="space-y-4">
                <UserCard key={loaderData.user.id} user={loaderData.user} />

                <div className="flex flex-col items-center my-4">
                    <label htmlFor="point" className="mb-2">ポイント</label>
                    <input
                        type="number"
                        value={point}
                        onChange={(e) => setPoint(Number(e.target.value))}
                        className="border p-2 rounded w-48 text-right mb-2"
                    />
                    <p className="font-medium">計算結果: {calculatePoint}</p>
                </div>

                <form onSubmit={onSubmit} className="max-w-md mx-auto p-6 rounded-lg shadow-md">
                    <div className="text-center mb-4">
                        <span className="font-bold">User ID: {loaderData.user.id}</span>
                        <input type="hidden" {...register("id")} />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="firstName" className="block text-sm font-medium mb-1">First Name</label>
                        <input
                            className="w-full p-2 border rounded focus:ring focus:ring-blue-300"
                            {...register("firstName")}
                        />
                        {errors.firstName?.message &&
                            <p className="text-red-500 text-sm mt-1">{errors.firstName?.message}</p>
                        }
                    </div>

                    <div className="mb-4">
                        <label htmlFor="lastName" className="block text-sm font-medium mb-1">Last Name</label>
                        <input
                            className="w-full p-2 border rounded focus:ring focus:ring-blue-300"
                            {...register("lastName")}
                        />
                        {errors.lastName?.message &&
                            <p className="text-red-500 text-sm mt-1">{errors.lastName?.message}</p>
                        }
                    </div>

                    <div className="mb-4">
                        <label htmlFor="userType" className="block text-sm font-medium mb-1">User Type</label>
                        <select
                            className="w-full p-2 border rounded focus:ring focus:ring-blue-300"
                            {...register("userType")}
                        >
                            <option value="normal">Normal</option>
                            <option value="special">Special</option>
                        </select>
                    </div>

                    <div className="text-center">
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded focus:outline-none focus:ring focus:ring-blue-300"
                        >
                            送信
                        </button>
                    </div>
                </form>
                <div>
                    <pre>
                        {JSON.stringify(actionData, null, 2)}
                    </pre>
                </div>
            </div>
        </div>
    );
}