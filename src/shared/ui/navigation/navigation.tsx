import { Link, useLocation } from "react-router";
import { UserButton } from "@/entities/user";
import { useUserStore } from "@/entities/user/model";

const Navigation = () => {
  const location = useLocation();
  const { isAuth } = useUserStore();

  return (
    <nav className="flex h-16 w-full items-center justify-between px-4 bg-base-200">
      <div className="flex items-center gap-6">
        <Link 
          to="/" 
          className={`px-4 py-2 rounded-lg ${
            location.pathname === "/" 
              ? "bg-primary text-primary-content" 
              : "text-white hover:bg-base-300"
          }`}
        >
          Главная
        </Link>
        {isAuth && (
          <>
          <Link 
            to="/reports" 
            className={`px-4 py-2 rounded-lg ${
              location.pathname === "/reports" 
                ? "bg-primary text-primary-content" 
                : "text-white hover:bg-base-300"
            }`}
          >
            Аналитика
          </Link>
          <Link 
            to="/stats" 
            className={`px-4 py-2 rounded-lg ${
              location.pathname === "/stats" 
                ? "bg-primary text-primary-content" 
                : "text-white hover:bg-base-300"
            }`}
          >
            Статистика
          </Link>
          </>
        )}
      </div>
      
      <UserButton />
    </nav>
  );
};

export { Navigation };