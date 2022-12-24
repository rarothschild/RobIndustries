import { createSignal, createEffect } from "solid-js";

export default function ThemeSwitcher(props) {
    const [theme,setTheme] = createSignal(localStorage.getItem("theme"))

    createEffect(() => {
        if (theme()) {
            document.documentElement.setAttribute("data-theme", theme());
            localStorage.setItem("theme", theme());
        } else {
            setTheme("dark")
        }
      });

    function themeClick() {
        if (theme() == "dark") {
            setTheme("light")
        } else {
            setTheme("dark")
        }
    }

    return (
        <div class="grid justify-center overflow-hidden w-14 absolute md:bottom-0 left-0">
            <svg onClick={()=>themeClick()} width="120" height="50" viewBox="0 0 120 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g id="themePicker">
                <path id="Vector 1" d="M81.0026 25.6856C80.6542 5.43189 115.251 1.72092 103.79 7.41611C92.3294 13.1113 89.7638 35.3976 103.79 41.8171C117.817 48.2367 81.351 45.9392 81.0026 25.6856Z" fill="#5D5F61" stroke="#405377" stroke-opacity="0.39"/>
                <circle id="Ellipse 1" cx="28" cy="25" r="10" fill="#F5E761" stroke="#405377" stroke-opacity="0.39"/>
                <path id="Polygon 1" d="M28 6L31.4641 12.75H24.5359L28 6Z" fill="#F5E761" stroke="#405377" stroke-opacity="0.39"/>
                <path id="Polygon 2" d="M43.409 13.4403L40.5569 20.3314L36.3845 14.3726L43.409 13.4403Z" fill="#F5E761" stroke="#405377" stroke-opacity="0.39"/>
                <path id="Polygon 6" d="M46.1724 29.3517L39.1927 31.9795L40.6909 24.8611L46.1724 29.3517Z" fill="#F5E761" stroke="#405377" stroke-opacity="0.39"/>
                <path id="Polygon 8" d="M36.2803 42.1463L30.3622 37.6079L37.1979 35.1199L36.2803 42.1463Z" fill="#F5E761" stroke="#405377" stroke-opacity="0.39"/>
                <path id="Polygon 9" d="M20.9466 42.4854L19.3303 35.2047L26.166 37.6927L20.9466 42.4854Z" fill="#F5E761" stroke="#405377" stroke-opacity="0.39"/>
                <path id="Polygon 5" d="M12.409 13.4403L19.4334 14.3726L15.261 20.3314L12.409 13.4403Z" fill="#F5E761" stroke="#405377" stroke-opacity="0.39"/>
                <path id="Polygon 7" d="M9.95746 29.5182L15.3363 24.9051L16.9946 31.988L9.95746 29.5182Z" fill="#F5E761" stroke="#405377" stroke-opacity="0.39"/>
                </g>
            </svg>
        </div>
    )
}
