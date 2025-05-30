import { useState } from "react"

export function FormLogicRegister() {
    const [formDataR, setFormDataR] = useState({ "email": "", "password": "", "name": "" })
    const [errorR, setErrorR] = useState("")
    const [sucessR, setSuccessR] = useState("")

    const handleChangeR = (e) => {
        const { name, value } = e.target
        setFormDataR(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmitR = (e) => {
        e.preventDefault()

        if (!formDataR.email) {
            setErrorR("Email is required")
            return
        } else if (!formDataR.password) {
            setErrorR("Password is required")
            return
        } else if (!formDataR.name) {
            setErrorR("Name is required")
            return
        } else {
            setErrorR("")
        }

        const storeUser = JSON.parse(localStorage.getItem("users")) || []

        const userExists = storeUser.find(u => u.email === formDataR.email)

        if (!userExists) {
            setErrorR("")
            setSuccessR("User created successfully")
            setTimeout(() => {
                setSuccessR("")
            }, 3000)
        } else {
            setErrorR("User already exists")
            setTimeout(() => {
                setErrorR("")
            }, 3000)
            return
        }

        const newUser = {
            email: formDataR.email,
            password: formDataR.password,
            name: formDataR.name
        }

        localStorage.setItem("users", JSON.stringify([...storeUser, newUser]))

        setFormDataR({ email: "", password: "", name: "" })
        setErrorR("")

    }

    return { handleChangeR, handleSubmitR, formDataR, errorR, sucessR }
}
