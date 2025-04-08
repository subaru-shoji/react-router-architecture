export namespace User {
    export interface User {
        id: number;
        firstName: string;
        lastName: string;
        userType: UserType;
    }

    export function fullName(user: User): string {
        return `${user.firstName} ${user.lastName}`;
    }

    export type UserType = 'normal' | 'special';

    // TODO zodのスキーマを定義する
}

