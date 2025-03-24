import { Moon, Sun } from "lucide-react"
import { useTheme } from "../theme-provider"
import { Button } from "./button"

function Themetoggle() {
  const { theme, setTheme } = useTheme()
  return (
    <div>
      <Button
        variant="outline"
        className="p-2 rounded-full bg-gray-800 text-white"
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      >
        {theme === "dark" ? <Sun size={24} /> : <Moon size={24} />}
      </Button>
    </div>
  )
}

export default Themetoggle