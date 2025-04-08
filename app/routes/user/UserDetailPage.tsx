import { appInjector } from "~/di";
import { UserCard } from "./component/UserCard";
import type { DBStorageContext } from "~/infrastructure/db/db_storage";
import { db } from "~/infrastructure/db/db";
import type { Route } from "./+types/UserDetailPage";
import { User } from "~/domain/model/user";
import { useSubmit } from "react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMemo, useState } from "react";

export async function loader({ params, request }: Route.LoaderArgs) {
    const userId = Number(params.id);

    const dbStorage = appInjector.resolve("dbStorage");
    const dbContext: DBStorageContext = {
        request,
        db
    }

    const user = await dbStorage.run(dbContext, async () => {
        const getUserUseCase = appInjector.resolve("user/GetUserUseCase")
        return await getUserUseCase.execute(userId);
    })

    return { user };
}

export async function action({ request }: Route.ActionArgs) {
    const data = await request.json();

    const parseResult = User.userSchema.safeParse(data)

    if (!parseResult.success) {
        return parseResult.error;
    }

    await appInjector.resolve("dbStorage").run({ request, db }, async () => {
        const updateUserUseCase = appInjector.resolve("user/UpdateUserUseCase")
        await updateUserUseCase.execute(parseResult.data);
    })

    return {};
}


// /usersを表示するページコンポーネント
export default function UserDetailPage({ loaderData, actionData }: Route.ComponentProps) {
    const [point, setPoint] = useState(0);
    const calculatePoint = useMemo(() => {
        const pointCalculationService = appInjector.resolve("pointCalculateService");
        return pointCalculationService.calculatePoints(loaderData.user, { amount: point });
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
        encType: "application/json",
    }))

    return (
        <div className="container mx-auto py-8">
            <h1 className="text-2xl font-bold mb-6">User Detail</h1>
            <div className="space-y-4">
                <UserCard key={loaderData.user.id} user={loaderData.user} />

                <div>
                    <label htmlFor="point">ポイント</label>
                    <input
                        type="number"
                        value={point}
                        onChange={(e) => setPoint(Number(e.target.value))}
                    />
                    <p>計算結果: {calculatePoint}</p>
                </div>

                <form onSubmit={onSubmit}>
                    <span>{ }</span>
                    <input type="hidden" {...register("id")} />
                    <input {...register("firstName")} />
                    {errors.firstName?.message && <p>{errors.firstName?.message}</p>}
                    <input {...register("lastName")} />
                    {errors.lastName?.message && <p>{errors.lastName?.message}</p>}
                    <select {...register("userType")}>
                        <option value="normal">normal</option>
                        <option value="special">special</option>
                    </select>
                    <button type="submit">送信</button>
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