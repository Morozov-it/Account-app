import React, { useEffect, useState } from "react"

type Theme = "light" | "dark"

const getSystemTheme = () =>
    window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light"

export const useTheme = (): [
    Theme,
    React.Dispatch<React.SetStateAction<Theme>>,
    () => Theme
] => {
    const [theme, setTheme] = useState<Theme>(getSystemTheme())

    useEffect(() => {
        theme === 'dark'
            ? document.documentElement.classList.add('dark')
            : document.documentElement.classList.remove('dark')
    }, [theme])

    return [theme, setTheme, getSystemTheme]
}

/* Into component:
    const [ theme, setTheme, getSystem ] = useTheme()

    <button onClick={() => setTheme('dark')}>dark</button>
    <button onClick={() => setTheme('light')}>light</button>
    <button onClick={() => setTheme(getSystem())}>system</button>
*/