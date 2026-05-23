import { Link } from "react-router";

export default function NavBar() {
    return (
        <nav>
            <ul>
                <li>
                    <Link to={'/'}>Home</Link>
                </li>
                <li>
                    <Link to={'#'}>Home2</Link>
                </li>
                <li>
                    <Link to={'#'}>Home3</Link>
                </li>
            </ul>
        </nav>
    )
};
