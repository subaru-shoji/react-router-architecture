# Page Rules

以下の例のように実装する

```typescript
import { serverInjector } from "~/di/server_di";
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

    await serverInjector.resolve("dbStorage").run({ request, db }, async () => {
        const createUserUseCase = serverInjector.resolve("user/CreateUserUseCase")
        await createUserUseCase.execute(parseResult.data);
    })

    return redirect("/user");
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
        method: "post",
        encType: "application/json",
    }))

    return (
        <div className="container mx-auto py-8">
            <h1 className="text-2xl font-bold mb-6">Create New User</h1>
            <div className="space-y-4">
                <form onSubmit={onSubmit} className="space-y-4">
                    <div className="flex flex-col">
                        <label htmlFor="firstName" className="mb-1 font-medium">First Name</label>
                        <input
                            id="firstName"
                            {...register("firstName")}
                            className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {errors.firstName?.message && (
                            <p className="text-red-500 text-sm mt-1">{errors.firstName?.message.toString()}</p>
                        )}
                    </div>

                    <div className="flex flex-col">
                        <label htmlFor="lastName" className="mb-1 font-medium">Last Name</label>
                        <input
                            id="lastName"
                            {...register("lastName")}
                            className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {errors.lastName?.message && (
                            <p className="text-red-500 text-sm mt-1">{errors.lastName?.message.toString()}</p>
                        )}
                    </div>

                    <div className="flex flex-col">
                        <label htmlFor="userType" className="mb-1 font-medium">User Type</label>
                        <select
                            id="userType"
                            {...register("userType")}
                            className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="normal">Normal</option>
                            <option value="special">Special</option>
                        </select>
                    </div>

                    <button
                        type="submit"
                        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
                    >
                        Create User
                    </button>
                </form>

                {actionData && (
                    <div className="mt-6 p-4 bg-gray-100 rounded-md">
                        <h2 className="font-medium mb-2">Form Result:</h2>
                        <pre className="text-sm overflow-auto">
                            {JSON.stringify(actionData, null, 2)}
                        </pre>
                    </div>
                )}
            </div>
        </div>
    );
}
```