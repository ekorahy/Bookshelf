import NavList from "./NavList";

export default function NavSide() {
  return (
    <aside className="hidden sm:absolute sm:block">
      <div className="border-b pb-4 text-center">
        <img src="/logo.png" className="mx-auto mb-2 w-20" alt="logo image" />
        <h1 className="text-lg font-bold">Bookshelf</h1>
      </div>
      <div className="border-b py-4">
        <NavList />
      </div>
    </aside>
  );
}
