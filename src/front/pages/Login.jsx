import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { LoginForm } from "../components/LoginForm.jsx";

export const Login = () => {

    const { store, dispatch } = useGlobalReducer()

    return (
        <div className="text-center mt-5">
            <h1>Login</h1>
            <LoginForm />
        </div>
    );
}; 