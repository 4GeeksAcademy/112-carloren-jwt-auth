import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { SignUpForm } from "../components/SignUpForm.jsx";

export const SignUp = () => {

    const { store, dispatch } = useGlobalReducer()

    return (
        <div className="text-center mt-5">
            <h1>Sign Up</h1>
            <SignUpForm />
        </div>
    );
}; 