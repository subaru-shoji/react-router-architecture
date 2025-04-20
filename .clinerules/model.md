# Domain Model Rules

以下の例のように実装する

```typescript
import { use } from "react";
import { z } from "zod";
import { users } from "~/infrastructure/db/schema";

export namespace User {
	export const userSchema = z.object({
		id: z.number().int().positive(),
		firstName: z.string().min(1).max(10),
		lastName: z.string().min(1).max(10),
		userType: z.enum(users.userType.enumValues),
	});

	export const newUserScehama = userSchema.omit({ id: true });

	export type User = z.infer<typeof userSchema>;

	export function fullName(user: User): string {
		return `${user.firstName} ${user.lastName}`;
	}
}
```