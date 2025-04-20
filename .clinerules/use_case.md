# UseCase Rules

# 以下の例のように実装する

```typescript
// ユーザー作成ユースケース

import type {
	IUserCommandRepository,
	NewUser,
} from "~/domain/repository/i_user_command_repository";

export class CreateUserUseCase {
	constructor(private userCommandRepository: IUserCommandRepository) {}

	static inject = ["userCommandRepository"] as const;

	async execute(newUser: NewUser): Promise<void> {
		await this.userCommandRepository.create(newUser);
	}
}
```