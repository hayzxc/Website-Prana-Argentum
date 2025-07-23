interface CompanyLogoProps {
  size?: "sm" | "md" | "lg"
  className?: string
  showText?: boolean
}

export function CompanyLogo({ size = "md", className, showText = true }: CompanyLogoProps) {
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-10 h-10",
    lg: "w-16 h-16",
  }

  const textSizes = {
    sm: "text-lg",
    md: "text-xl",
    lg: "text-2xl",
  }

  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <div className={`${sizeClasses[size]} bg-blue-600 rounded-lg flex items-center justify-center`}>
        <span className="text-white font-bold text-sm">PA</span>
      </div>
      {showText && <span className={`${textSizes[size]} font-semibold text-white`}>Prana Argentum</span>}
    </div>
  )
}
