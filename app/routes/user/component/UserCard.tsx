import { User } from "~/domain/model/user";

interface UserCardProps {
    user: User.User;
}

export const UserCard: React.FC<UserCardProps> = ({ user }) => {
    return (
        <div className="bg-white rounded-lg shadow-md p-4 max-w-sm mx-auto">
            <div className="flex items-center space-x-4">

                <div>
                    <h3 className="text-lg font-medium text-gray-900">{User.fullName(user)}</h3>
                    <p className="text-sm text-gray-500">{user.userType}</p>
                    <p className="text-xs text-gray-400">ID: {user.id}</p>
                </div>
            </div>
        </div>
    );
};

