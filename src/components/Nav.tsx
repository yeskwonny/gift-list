import { useLocation, useNavigate } from "react-router-dom";

const NavBar = () => {
  const navigate = useNavigate();

  const { pathname } = useLocation();
  let title = "Gift App";
  if (pathname === "/gifts/list") title = "My Wishlists";
  else if (pathname === "/gifts/new") title = "New Gift";
  else if (pathname.startsWith("/gifts/list/")) title = "Gift Items";

  return (
    <header className="sticky top-0 z-10 h-14 border-b bg-white mb-2">
      <div className="grid h-full grid-cols-[48px_1fr_auto] items-center px-2">
        {/* Left: Back */}
        <button
          onClick={() => navigate(-1)}
          className="ml-1 flex h-10 w-10 items-center justify-center rounded-xl hover:bg-gray-100"
        >
          ←
        </button>

        {/* Center: Title */}
        <h1 className="truncate text-center text-base font-semibold">
          {title}
        </h1>

        {/* Right: User / Logout */}
        <div className="mr-2 flex items-center gap-2 text-sm">
          <span className="max-w-20 truncate text-gray-600">user1</span>

          <button className="text-red-500 hover:underline">Logout</button>
        </div>
      </div>
    </header>
  );
};

export default NavBar;
