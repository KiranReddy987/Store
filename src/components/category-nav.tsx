import {
  Utensils,
  LayoutGrid,
  Cigarette,
  Wine,
  CupSoda,
  HeartPulse,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

type Category = {
  id: number;
  name: string;
  icon: React.ElementType;
  href?: string;
};

const categories: Category[] = [
  { id: 0, name: "All", icon: LayoutGrid },
  { id: 1, name: "Food & Meals", icon: Utensils },
  { id: 2, name: "Tobacco & Smoking 🔞", icon: Cigarette },
  { id: 3, name: "Beer & Wine", icon: Wine },
  { id: 4, name: "Snacks & Beverages", icon: CupSoda },
  { id: 5, name: "Essentials & Care", icon: HeartPulse },
];

type Props = {
  selectedCategory: string;
  setselectedCategory: (category: string) => void;
};

export function CategoryNav({ selectedCategory, setselectedCategory }: Props) {
  return (
    <div className="border-b bg-white shadow-sm">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ul className="flex flex-nowrap items-center justify-start gap-6 overflow-x-auto py-4 md:justify-center">
          {categories.map((category) => {
            const Icon = category.icon;
            const isActive = selectedCategory === category.name;

            return (
              <Link
                to={`/classify/${category.id}`}
                key={category.id}
                onClick={() => setselectedCategory(category.name)}
                className={cn(
                  "flex items-center gap-2 px-3 py-2 text-sm font-medium transition-colors duration-200 whitespace-nowrap rounded-full cursor-pointer text-gray-600 hover:text-purple-600 hover:bg-gray-100",
                  isActive
                    ? "bg-purple-100 text-purple-700"
                    : "text-gray-600 hover:text-purple-600 hover:bg-gray-100"
                )}
              >
                <Icon className="h-5 w-5 shrink-0" />
                <span>{category.name}</span>
              </Link>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}
