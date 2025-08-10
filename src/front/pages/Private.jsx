export const Private = () => {

    let greeting = "Esto es una página privada, inicia sesión para verla"

    if (localStorage.getItem("user_logged") != null) {
        greeting = "Bienvenido a la página privada de " + localStorage.getItem("user_logged")
    }

    return (
        <div className="text-center mt-5">
            <h1 className="w-50 mx-auto">{greeting}</h1>
        </div>
    );
}; 