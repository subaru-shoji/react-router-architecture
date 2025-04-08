import { Link, NavLink } from "react-router";


export default function Home() {
  return <div>
    <Link to="/user/" className="text-blue-500 hover:underline">user list</Link>
  </div>;
}
