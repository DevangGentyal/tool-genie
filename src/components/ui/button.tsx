import * as React from "react"
import { cn } from "../../lib/utils"

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'ghost'
  size?: "default" | "sm" | "lg" | "icon"
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', ...props }, ref) => {
    const baseStyles = "rounded-md px-4 py-2 font-medium transition-colors"
    const variants = {
      default: "bg-purple-500 text-white hover:bg-purple-600",
      outline: "border border-current bg-transparent",
      ghost: "bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800"
    }

    return (
      <button
        className={cn(baseStyles, variants[variant], className)}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button } 