import { navigation } from "../../data/local/navigation";
import NavItem from "../atoms/NavItem";

export default function NavList() {
  return (
    <div>
      {navigation.map(({ name, path, icon }, index) => (
        <NavItem key={index} name={name} path={path} icon={icon} />
      ))}
    </div>
  );
}
