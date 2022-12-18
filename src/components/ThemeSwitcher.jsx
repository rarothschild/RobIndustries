import { createSignal, createEffect } from "solid-js";

export default function ThemeSwitcher() {
    const [theme,setTheme] = createSignal(localStorage.getItem("theme"))

    createEffect(() => {
        if (theme()) {
            document.documentElement.setAttribute("data-theme", theme());
            localStorage.setItem("theme", theme());
        } else {
            setTheme("dark")
        }
      });

    return (
        <div class="flex gap-2 p-2 absolute bottom-0 bg-gray-300">
            <button onClick={()=>setTheme("light")}>Light</button>
            <button onClick={()=>setTheme("dark")}>Dark</button>
        </div>
    )
}
