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

    function themeClick() {
        if (theme() == "dark") {
            setTheme("light")
        } else {
            setTheme("dark")
        }
    }

    return (
        <div class="grid justify-center overflow-hidden h-20 w-24 absolute bottom-0 bg-gray-300">
            <svg onClick={()=>themeClick()} width="194" height="80" viewBox="0 0 194 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g id="themePicker">
                <rect id="Rectangle 8" x="98" width="96" height="80" fill="#474545"/>
                <ellipse id="Ellipse 2" opacity="0.5" cx="147" cy="40.5" rx="35" ry="34.5" fill="#D9D9D9"/>
                <path id="Vector 1" d="M112.005 41.5214C111.481 6.5896 153.784 0.547793 146.287 10.0118C138.79 19.4758 135.388 57.8962 146.287 69.3438C157.186 80.7915 112.529 76.4532 112.005 41.5214Z" fill="#F5EC94" stroke="black" stroke-opacity="0.39"/>
                <ellipse id="Ellipse 1" cx="48.5" cy="52" rx="19.5" ry="21" fill="#EDE763"/>
                <rect id="Rectangle 1" width="5.90182" height="16.9988" transform="matrix(0.819152 -0.573576 0.532784 0.846251 22.9264 17.8842)" fill="#EDE763"/>
                <rect id="Rectangle 4" width="5.90182" height="16.9988" transform="matrix(0.819152 0.573576 -0.532784 0.846251 69.779 14.3611)" fill="#EDE763"/>
                <rect id="Rectangle 6" width="6.11522" height="16.3968" transform="matrix(0.32525 0.945628 -0.933177 0.359417 85.524 33.0246)" fill="#EDE763"/>
                <rect id="Rectangle 7" width="6.11522" height="16.3968" transform="matrix(0.32525 -0.945628 0.933177 0.359417 10.2919 38.6559)" fill="#EDE763"/>
                <rect id="Rectangle 3" x="45" y="8" width="7" height="18" fill="#EDE763"/>
                <rect id="Rectangle 2" x="89" y="51" width="6" height="16" transform="rotate(90 89 51)" fill="#EDE763"/>
                <rect id="Rectangle 5" x="24" y="51" width="6" height="16" transform="rotate(90 24 51)" fill="#EDE763"/>
                </g>
            </svg>
        </div>
    )
}
