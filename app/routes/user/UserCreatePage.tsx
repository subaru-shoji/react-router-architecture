import { appInjector } from "~/di";
import { db } from "~/infrastructure/db/db";
import type { Route } from "./+types/UserCreatePage";
import { User } from "~/domain/model/user";
import { redirect, useSubmit } from "react-router";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export async function action({ request }: Route.ActionArgs) {
    const data = await request.json();

    const parseResult = User.newUserScehama.safeParse(data)

    if (!parseResult.success) {
        return parseResult.error;
    }

    await appInjector.resolve("dbStorage").run({ request, db }, async () => {
        const createUserUseCase = appInjector.resolve("user/CreateUserUseCase")
        await createUserUseCase.execute(parseResult.data);
    })

    redirect("/user");
}

// /usersを表示するページコンポーネント
export default function UserCreatePage({ actionData }: Route.ComponentProps) {
    const submit = useSubmit();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(User.newUserScehama),
    });

    const onSubmit = handleSubmit((d) => submit(d, {
        encType: "application/json",
    }))

    return (
        <div className="container mx-auto py-8">
            <h1 className="text-2xl font-bold mb-6">User Detail</h1>
            <div className="space-y-4">
                <form onSubmit={onSubmit}>
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
