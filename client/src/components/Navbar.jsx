import { Link, NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store/slices/userSlice';

export default function Navbar() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <nav className="bg-gradient-to-r from-purple-700 via-purple-600 to-purple-500 shadow p-4 flex justify-between items-center text-white">
      {/* Stânga: Logo + Home + Products */}
      <div className="flex items-center space-x-6">
        <Link to="/" className="text-2xl font-bold tracking-wide">
          BookStore
        </Link>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? 'font-semibold underline' : 'hover:underline'
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/products"
          className={({ isActive }) =>
            isActive ? 'font-semibold underline' : 'hover:underline'
          }
        >
          Products
        </NavLink>
      </div>

      {/* Dreapta: Favorites + Cart + User */}
      <div className="flex items-center space-x-6">
        <NavLink
          to="/favorites"
          className={({ isActive }) =>
            isActive ? 'font-semibold underline' : 'hover:underline'
          }
        >
          Favorites
        </NavLink>

        <NavLink
          to="/cart"
          className={({ isActive }) =>
            isActive ? 'font-semibold underline' : 'hover:underline'
          }
        >
          Cart
        </NavLink>

        {user ? (
          <button
            onClick={handleLogout}
            className="bg-white text-purple-700 px-3 py-1 rounded hover:bg-gray-100"
          >
            Logout
          </button>
        ) : (
          <div className="flex space-x-4">
            <NavLink
              to="/login"
              className={({ isActive }) =>
                isActive ? 'font-semibold underline' : 'hover:underline'
              }
            >
              Login
            </NavLink>
            <NavLink
              to="/register"
              className={({ isActive }) =>
                isActive ? 'font-semibold underline' : 'hover:underline'
              }
            >
              Register
            </NavLink>
          </div>
        )}
      </div>
    </nav>
  );
}
