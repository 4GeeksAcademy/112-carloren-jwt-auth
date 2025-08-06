//funciones que tienen que ver con el sistema de autenticacion

export async function login(email, password) {
    console.log("Soy un console log del servicio");
    console.log(email, password);



    try {
        const response = await fetch('https://turbo-winner-vq65p4559jghxp4w-3000.app.github.dev/login', {
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