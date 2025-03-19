import React, { useContext, useEffect } from 'react'
import { Check, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from './button'
import { GameContext } from '@/context/gameContext'
const difficulties = [
  {
    value: "easy",
    label: "Easy",
  },
  {
    value: "medium",
    label: "Medium",
  },
  {
    value: "hard",
    label: "Hard",
  },
]
function DifficultyDropdown({ setDifficulty }: { setDifficulty: React.Dispatch<React.SetStateAction<"easy" | "medium" | "hard">> }) {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState('easy')
  const game = useContext(GameContext)
  useEffect(() => {
    game.difficulty = value as "easy" | "medium" | "hard"
  }, [value])
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {value
            ? difficulties.find((item) => item.value === value)?.label
            : "Difficulty"}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search Difficulty..." />
          <CommandList>
            <CommandEmpty>Invalid Difficulty</CommandEmpty>
            <CommandGroup>
              {difficulties.map((item) => (
                <CommandItem
                  key={item.value}
                  value={item.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "easy" : currentValue)
                    setDifficulty((currentValue as "easy" | "medium" | "hard"))
                    setOpen(false)
                  }}
                >
                  {item.label}
                  <Check
                    className={cn(
                      "ml-auto",
                      value === item.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

export default DifficultyDropdown