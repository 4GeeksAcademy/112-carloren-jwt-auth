//funciones que tienen que ver con el sistema de autenticacion

export async function login(email, password) {
    console.log("Soy un console log del servicio");
    console.log(email, password);

    try {
        const response = await fetch(import.meta.env.VITE_BACKEND_URL + "/login", {
            method: 'POST',
            body: JSON.stringify({ email: email, password: password }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const data = await response.json()
        console.log(data);

        if (response.status === 200) {
            localStorage.setItem('token', data.access_token)
            return true
        }
        if (response.status === 404) {
            return false
        }


    } catch (error) {
        console.log(error)
        return false
    }

}
export async function getUserFavorites() {

    let token = localStorage.getItem("token")
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`)

    const requestOptions = {
        method: "GET",
        headers: myHeaders
    };

    try {
        const response = await fetch(import.meta.env.VITE_BACKEND_URL + "/favorites", requestOptions);
        const result = await response.json();
        console.log(result)
    } catch (error) {
        console.error(error);
    };
}

//declaracion de funcion para validar la autenticacion
export async function validAuth() {
    let token = localStorage.getItem("token")
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`)

    const requestOptions = {
        method: "GET",
        headers: myHeaders
    };

    const response = await fetch(import.meta.env.VITE_BACKEND_URL + "/valid-auth", requestOptions);

    return response.ok
}