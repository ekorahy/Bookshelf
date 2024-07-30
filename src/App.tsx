import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Navigation from "./components/molecules/Navigation";
import NavSide from "./components/molecules/NavSide";
import BookDetail from "./pages/BookDetail";

export default function App() {
  return (
    <>
      <header className="fixed top-0 z-30 w-full border-b bg-white sm:hidden">
        <Navigation />
      </header>
      <main className="mb-10 mt-20 w-full p-4 sm:container sm:relative sm:mx-auto sm:mt-0 sm:flex sm:gap-4 sm:p-8">
        <NavSide />
        <div className="w-full sm:ml-52">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/detail/:id" element={<BookDetail />} />
          </Routes>
        </div>
      </main>
    </>
  );
}
