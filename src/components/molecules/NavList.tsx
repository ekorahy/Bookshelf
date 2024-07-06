import { navigation } from "../../data/local/navigation";
import NavItem from "../atoms/NavItem";

export default function NavList() {
  return (
    <div>
      {navigation.map((nav, index) => (
        <NavItem key={index} name={nav.name} path={nav.path} icon={nav.icon} />
      ))}
    </div>
  );
}
