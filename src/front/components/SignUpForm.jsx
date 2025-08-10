import React, { useEffect, useState } from "react";
import { signup } from "../services/userServices.js";
import { useNavigate } from "react-router-dom";

export const SignUpForm = () => {

    //declaracion de estados
    const [username, setUsername] = useState("")
    const [name, setName] = useState("")
    const [surname, setSurname] = useState("")
    const [signupDate, setSignupDate] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [checkBox, setCheckBox] = useState(false)


    // hooks de react router para redireccionar
    const navigate = useNavigate()

    //funcion de manejo de informacion sobre el login
    async function handleSubmit(e) {
        e.preventDefault()

        let signupSucceed = await signup(username, name, surname, signupDate, email, password, checkBox);
        console.log(signupSucceed);

        if (signupSucceed) {
            navigate("/login")
        }

    }

    useEffect(() => { document.getElementById("is_active").indeterminate = true }, [])

    return (
        <form role="form" className="w-50 mx-auto text-start" onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="username" className="form-label ms-1 mb-0 ms-1 mb-0">Username<strong style={{ color: "red" }}>*</strong></label>
                <input className="form-control mb-3" id="username" maxLength="120" name="username" required type="text" value={username} onChange={(e) => setUsername(e.target.value)} />

                <label htmlFor="name" className="form-label ms-1 mb-0">Name<strong style={{ color: "red" }}>*</strong></label>
                <input className="form-control mb-3" id="name" maxLength="120" name="name" required type="text" value={name} onChange={(e) => setName(e.target.value)} />

                <label htmlFor="surname" className="form-label ms-1 mb-0">Surname<strong style={{ color: "red" }}>*</strong></label>
                <input className="form-control mb-3" id="surname" maxLength="120" name="surname" required type="text" value={surname} onChange={(e) => setSurname(e.target.value)} />

                <label htmlFor="signupDate" className="form-label ms-1 mb-0">Signup Date<strong style={{ color: "red" }}>*</strong></label>
                <input className="form-control mb-3" id="signupDate" maxLength="120" name="signupDate" required type="text" value={signupDate} onChange={(e) => setSignupDate(e.target.value)} />

                <label htmlFor="email" className="form-label ms-1 mb-0">Email<strong style={{ color: "red" }}>*</strong></label>
                <input className="form-control mb-3" id="email" maxLength="120" name="email" required type="text" placeholder="name@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />

                <label htmlFor="password" className="form-label ms-1 mb-0">Password<strong style={{ color: "red" }}>*</strong></label>
                <input className="form-control mb-3" id="password" name="password" required type="password" value={password} onChange={(e) => setPassword(e.target.value)} />

                <label htmlFor="is_active" className="form-check-label">Is Active</label>
                <input className="form-check-input ms-3 mb-3 mx-auto" id="is_active" name="is_active" type="checkbox" value={checkBox} onChange={(e) => setCheckBox(e.target.checked)} />
            </div>
            <hr />
            <div className="form-group text-center">
                <div className="submit-row">
                    <input type="submit" className="btn btn-primary mx-2" value="Submit" />
                    <a href="/" className="btn btn-danger mx-2" role="button">Cancel</a>
                </div>
            </div>
        </form>
    )
}; 