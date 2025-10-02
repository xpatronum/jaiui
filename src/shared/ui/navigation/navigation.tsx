import { Link, useLocation } from "react-router";
import { UserButton } from "@/entities/user";
import Label from "../../assets/images/background-removed.png";

interface NavigationProps {
  isPolling?: boolean;
}

const Navigation = ({ isPolling = false }: NavigationProps) => {
  const location = useLocation();

  return (
    <nav className="bg-base-200 flex h-16 w-full items-center justify-between px-4">
      <div className="flex items-center gap-6">
        <Link
          to="/"
          style={{
            width: "96px",
            height: "48px",
          }}
          className={isPolling ? "pointer-events-none opacity-50" : ""}
        >
          <img src={Label} draggable="false" />
        </Link>
        <Link
          to="/reports"
          className={`rounded-lg px-4 py-2 ${
            location.pathname === "/reports"
              ? "text-base-200 bg-[#0fe4ea]"
              : "hover:bg-base-300 text-white"
          } ${
            isPolling 
              ? "pointer-events-none cursor-not-allowed opacity-50" 
              : ""
          }`}
        >
          Аналитика
        </Link>
        <Link
          to="/stats"
          className={`rounded-lg px-4 py-2 ${
            location.pathname === "/stats"
              ? "text-base-200 bg-[#0fe4ea]"
              : "hover:bg-base-300 text-white"
          } ${
            isPolling 
              ? "pointer-events-none cursor-not-allowed opacity-50" 
              : ""
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