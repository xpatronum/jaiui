import { Link, useLocation } from "react-router";
import { UserButton } from "@/entities/user";
import { useUserStore } from "@/entities/user/model";
import Label from '../../assets/images/background-removed.png';

const Navigation = () => {
  const location = useLocation();
  const { isAuth } = useUserStore();

  return (
    <nav className="flex h-16 w-full items-center justify-between px-4 bg-base-200">
      <div className="flex items-center gap-6">
        <Link 
          to="/" 
          style={{
            width: '96px',
            height: '48px'
          }}
        >
          <img 
            src={Label}
          />
        </Link>
        <Link 
          to="/reports" 
          className={`px-4 py-2 rounded-lg ${
            location.pathname === "/reports" 
              ? "bg-[#0fe4ea] text-base-200" 
              : "text-white hover:bg-base-300"
          }`}
        >
          Аналитика
        </Link>
        <Link 
          to="/stats" 
          className={`px-4 py-2 rounded-lg ${
            location.pathname === "/stats" 
              ? "bg-[#0fe4ea] text-base-200" 
              : "text-white hover:bg-base-300"
          }`}
        >
          Статистика
        </Link>
      </div>
      
      <UserButton />
    </nav>
  );
};

export { Navigation };