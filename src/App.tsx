import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Navigation from "./components/molecules/Navigation";
import NavSide from "./components/molecules/NavSide";

export default function App() {
  return (
    <>
      <header className="sm:hidden">
        <Navigation />
      </header>
      <main className="w-full sm:relative sm:mx-auto sm:flex sm:max-w-7xl sm:gap-4 sm:p-4">
        <NavSide />
        <div className="w-full sm:ml-40">
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </div>
      </main>
    </>
  );
}
