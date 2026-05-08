import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import HomePage from "./pages/HomePage";
import ProductsPage from "./pages/ProductsPage";
import Register from "./pages/Register";
import Login from "./pages/Login";
import CreateProductPage from "./pages/CreateProductPage";
import EditProductPage from "./pages/EditProductPage";
import { ProtectedLayout, AuthLayout } from "./components/ProtectedRoute";
import { AdminRoute } from "./components/AdminRoute";
import ProductDetailsPage from './pages/ProductDetailsPage';
import CartPage from './pages/CartPage';
import FavoritesPage from "./pages/FavoritesPage";
import CommunityPage from "./pages/CommunityPage";
import BlogPage from "./pages/BlogPage";
import ArticleDetailsPage from "./pages/ArticleDetailsPage";
import BlindDatePage from './pages/BlindDatePage';

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "products",
        element: <ProductsPage />,
      },
      {
        path: "products/:id",
        element: <ProductDetailsPage />,
      },
      {
        path: "cart",
        element: <CartPage />,
      },
      {
        path: "favorites",
        element: <FavoritesPage />,
      },
      {
        path: "community",
        element: <CommunityPage />,
      },
       {
        path: "blind-date", 
        element: <BlindDatePage />,
      },
      {
        path: "journal",
        element: <BlogPage />,
      },
      {
        path: "journal/:slug",
        element: <ArticleDetailsPage />,
      },

      // Protected routes - require authentication
      {
        element: <ProtectedLayout />,
        children: [],
      },
      // Admin routes - require authentication AND admin role
      {
        element: <AdminRoute />,
        children: [
          {
            path: "products/create",
            element: <CreateProductPage />,
          },
          {
            path: "products/edit/:id",
            element: <EditProductPage />,
          },
        ],
      },
      // Auth routes - require the user to NOT be authenticated
      {
        element: <AuthLayout />,
        children: [
          {
            path: "register",
            element: <Register />,
          },
          {
            path: "login",
            element: <Login />,
          },
        ],
      },
    ],
  },
]);