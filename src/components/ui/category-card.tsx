import { cn } from "@/lib/utils"
import { useNavigate } from "react-router-dom"

interface CategoryCardProps {
  id: number
  name: string
  image: string
  category: number
  className?: string
}

export function CategoryCard({ id, name, image, category, className }: CategoryCardProps) {
  const navigate = useNavigate()

  const handleNavigate = () => {
    navigate(`/${name}`)
  }

  return (
    <div
      className={cn("group relative overflow-hidden rounded-xl bg-white shadow-md transition-all hover:shadow-lg", className)}
      onClick={handleNavigate}
    >
      <div className="aspect-[16/9] overflow-hidden">
        <img
          src={image}
          alt={name}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="p-6">
        <h3 className="mb-4 text-2xl font-semibold text-gray-800">{name}</h3>
      </div>
    </div>
  )
}
