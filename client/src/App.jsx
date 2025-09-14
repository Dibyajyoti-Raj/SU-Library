import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import { useAuth } from "./Context";
import MainLayout from './layout/mainLayout';
import Home from "./pages/Home";
import CreateBook from "./pages/CreateBook";
import Category from './components/home/Category';
import UpdateBook from "./pages/UpdateBook";
import ShowBook from "./pages/ShowBook";
import DeleteBook from "./pages/DeleteBook";
import SearchBook from './pages/SearchBook';
import LibraryLogin from './pages/LibraryLogin';

const App = () => {
  const { isAuthenticated } = useAuth();

  const router = createBrowserRouter([
    {
      path: "/login",
      element: <LibraryLogin />,
    },
    {
      path: "/",
      element: (
        <ProtectedRoute>
          <MainLayout />
        </ProtectedRoute>
      ),
      children: [
        {path: "/", element: <Home/>},
        {path: "/login", element: <LibraryLogin />},
        {path: "/create", element: <CreateBook />},
        {path: "/category", element: <Category />},
        {path: "/search", element: <SearchBook /> },
        {path: "/book/:id", element: <ShowBook />},
        {path: "/update/:id", element: <UpdateBook />},
        {path: "/delete/:id", element: <DeleteBook />}
      ]
    },
  ]);

  return <RouterProvider router={router} />;
};

  // return (
  //   <>
  //     <Routes>
  //       <Route path="/" element={<Home />} />
  //       <Route path="/create" element={<CreateBook />} />
  //       <Route path="/book/:id" element={<ShowBook />} />
  //       <Route path="/update/:id" element={<UpdateBook />} />
  //       <Route path="/delete/:id" element={<DeleteBook />} />
  //     </Routes>
  //   </>
  // )
export default App