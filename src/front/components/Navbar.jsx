import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { useNavigate } from "react-router-dom";

export const Navbar = () => {
	const { store, dispatch } = useGlobalReducer()


	// hooks de react router para redireccionar
	const navigate = useNavigate()

	console.log(store);


	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				<Link to="/">
					<span className="navbar-brand mb-0 h1">React Boilerplate</span>
				</Link>
				<div className="ml-auto">
					{/* conditional rendering para mostrar el boton de logout si esta logueado o no */}
					{store.isAuth ?
						<button className="btn btn-danger" onClick={() => {
							dispatch({ type: 'LOGOUT', payload: "isLogged" });
							localStorage.removeItem("token");
							localStorage.removeItem("user_logged");
							window.location.reload()
						}}>Logout</button>
						:
						<button className="btn btn-primary" onClick={() => navigate("/login")}>Login</button>
					}
					<button className="btn btn-success ms-2" onClick={() => navigate("/signup")}>Signup</button>
				</div>
			</div>
		</nav>
	);
};