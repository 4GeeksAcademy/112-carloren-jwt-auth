import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const Navbar = () => {
	const { store, dispatch } = useGlobalReducer()

	console.log(store);


	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				<Link to="/">
					<span className="navbar-brand mb-0 h1">React Boilerplate</span>
				</Link>
				<div className="ml-auto">
					{/* conditional rendering para mostrar el boton de logout si esta logueado o no */}
					{store.isAuth ? <button className="btn btn-primary">Logout</button> : null}


				</div>
			</div>
		</nav>
	);
};