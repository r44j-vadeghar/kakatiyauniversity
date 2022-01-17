import { signOut, useSession } from "next-auth/react";
import { LogoutIcon, UserCircleIcon } from "@heroicons/react/outline";
import { useRouter } from "next/router";

function Navbar() {
  const { data: session } = useSession();
  const router = useRouter();

  return (
    <div className="h-20 border-b-2 shadow-md">
      <div className="w-screen px-5 md:px-0 md:max-w-screen-2xl xl:max-w-screen-xl mx-auto flex items-center justify-between h-full">
        <div>
          <h1
            onClick={() => router.replace(`/${session.user.id}`)}
            className="hidden md:inline-block font-Dongle text-4xl before:block before:absolute before:-inset-1 before:-skew-y-3 before:bg-indigo-500 relative hover:cursor-pointer"
          >
            <span className="relative text-white font-bold">
              Hieee, {session?.user?.id || session?.user.name || ""}
            </span>
          </h1>
        </div>
        <ul className="flex items-center space-x-7">
          <li
            onClick={() => router.push("/assignments")}
            className={`link text-slate-800 ${
              router.pathname === "/assignments" && "active"
            }`}
          >
            Assignments
          </li>
          <li
            onClick={() => router.push("/dashboard")}
            className={`link text-slate-800 ${
              router.pathname === "/dashboard" && "active"
            }`}
          >
            Class Links
          </li>
          <li
            onClick={() => router.push(`/${session?.user.id}`)}
            className={`link text-slate-800 ${
              router.pathname === "/profile" && "active"
            }`}
          >
            <div className="h-9">
              <UserCircleIcon className="h-full" />
            </div>
          </li>
          <li onClick={signOut} className="link text-slate-800">
            <div className="h-9">
              <LogoutIcon className="h-full" />
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Navbar;
