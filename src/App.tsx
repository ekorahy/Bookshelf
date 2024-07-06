import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Navigation from "./components/molecules/Navigation";
import NavSide from "./components/molecules/NavSide";
import DetailBook from "./pages/DetailBook";

export default function App() {
  return (
    <>
      <header className="fixed top-0 z-30 w-full border-b bg-white sm:hidden">
        <Navigation />
      </header>
      <main className="mt-24 w-full p-4 sm:relative sm:mx-auto sm:flex sm:max-w-7xl sm:gap-4 sm:p-4 sm:mt-0">
        <NavSide />
        <div className="w-full sm:ml-52">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/detail/:id" element={<DetailBook />} />
          </Routes>
        </div>
      </main>
    </>
  );
}
