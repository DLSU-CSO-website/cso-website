import { useAuth } from "@/hooks/useAuth";
import { Button } from "@mantine/core";
import { useRouter } from "next/navigation";
import AdminNavLinks from "./AdminNavLinks";
import Link from "next/link";

interface ILinkTypes {
  name: string;
  link: string;
}

const LINKS: Array<ILinkTypes> = [
  {
    name: "Announcements",
    link: "/secretadmin/dashboard/announcements",
  },
  {
    name: "Organizations",
    link: "/secretadmin/dashboard/organizations",
  },
  {
    name: "Dashboard",
    link: "/secretadmin/dashboard",
  },
  { name: "Pertinent Links", link: "/secretadmin/dashboard/pertinentlinks" },
];

export default function AdminNav() {
  const { dispatch } = useAuth();
  const router = useRouter();
  const logout = () => {
    if (dispatch) {
      dispatch({ type: "LOGOUT" });
      router.push("/secretadmin");
    }
  };

  return (
    <>
      <div className="w-full flex justify-between items-center py-1 px-20  bg-green-800/15">
        <Link href={"/secretadmin/dashboard"}>
          <img src="/cso-logo-green.png" className="w-20 h-20 object-fill" />
        </Link>
        <div className="flex justify-center items-center">
          {LINKS.map((link, index) => (
            <AdminNavLinks key={index} name={link.name} link={link.link} />
          ))}
        </div>
        <Button
          className="bg-green-700 hover:bg-green-600 transition ease-in duration-200"
          onClick={logout}
        >
          Logout
        </Button>
      </div>
    </>
  );
}
