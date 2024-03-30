import React from "react";
import { Outlet, Route, Routes } from "react-router-dom";
import {
  BlogDetails,
  CategoriesPage,
  Home,
  LoginPage,
  SignupPage,
  WriterPage,
} from "./pages/index";
import { Loading, Navbar } from "./components/index";
import { Toaster } from "sonner";
import useStore from "./store";
function Layout() {
  return (
    <div className="w-full flex flex-col min-h-screen px-4 md:px-10 2xl:px-29=8">
      <Navbar />

      <div className="flex-1">
        <Outlet />
      </div>
      {/* <Footer/> */}
    </div>
  );
}

const App = () => {
  const { theme, isLoading } = useStore();
  return (
    <main className={theme}>
      <div className="w-full min-h-screen relative bg-white dark:bg-[#020b19] dark:text-gray-400">
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/category" element={<CategoriesPage />} />
            <Route path="/:slug/:id?" element={<BlogDetails />} />
            <Route path="/writer/:id" element={<WriterPage />} />
          </Route>
          <Route path="/signup" element={<SignupPage />} />{" "}
          <Route path="/signin" element={<LoginPage />} />
        </Routes>
        {isLoading && <Loading />}
        <Toaster richColors position="top-right" />
      </div>
    </main>
  );
};

export default App;
