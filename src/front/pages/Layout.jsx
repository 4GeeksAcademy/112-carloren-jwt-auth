import React, { useEffect } from "react"
import { Outlet } from "react-router-dom/dist"
import ScrollToTop from "../components/ScrollToTop"
import { Navbar } from "../components/Navbar"
import { Footer } from "../components/Footer"
import { validAuth } from "../services/userServices"
import useGlobalReducer from "../hooks/useGlobalReducer"

// Base component that maintains the navbar and footer throughout the page and the scroll to top functionality.
export const Layout = () => {
    const { store, dispatch } = useGlobalReducer()

    // llamamos a validAuth para que le indica a toda la aplicacion si seguimos logueados
    useEffect(() => {
        validAuth().then((value) => { if (value) { dispatch({ type: 'LOGIN' }) } else { localStorage.removeItem("token"); localStorage.removeItem("user_logged") } })

    }, [])

    return (
        <ScrollToTop>
            <Navbar />
            <Outlet />
            <Footer />
        </ScrollToTop>
    )
}