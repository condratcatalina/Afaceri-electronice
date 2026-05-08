import { Link, NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store/slices/userSlice';

export default function Navbar() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);

  return (
    <nav className="bg-white border-b border-stone-100 shadow-sm p-5 flex justify-between items-center sticky top-0 z-50">
      <div className="flex items-center space-x-10">
        <Link to="/" className="text-3xl font-serif italic tracking-tighter text-[#2D2926]">
          L'Éternel
        </Link>
        <div className="hidden md:flex space-x-8 text-sm uppercase tracking-widest font-medium text-stone-500">
          <NavLink to="/" className={({ isActive }) => isActive ? 'text-[#C5A059] border-b border-[#C5A059]' : 'hover:text-[#C5A059]'}>
            Acasă
          </NavLink>
          <NavLink to="/products" className={({ isActive }) => isActive ? 'text-[#C5A059] border-b border-[#C5A059]' : 'hover:text-[#C5A059]'}>
            Boutique
          </NavLink>
          <NavLink to="/community" className={({ isActive }) => isActive ? 'text-[#C5A059]' : 'hover:text-[#C5A059]'}>
            Comunitate
          </NavLink>
          <NavLink to="/journal" className={({ isActive }) => isActive ? 'text-[#C5A059]' : 'hover:text-[#C5A059]'}>
            File de Jurnal
          </NavLink>
        </div>
      </div>

      <div className="flex items-center space-x-8 text-sm uppercase tracking-widest font-medium text-stone-500">
        <NavLink to="/favorites" className={({ isActive }) => isActive ? 'text-[#C5A059]' : 'hover:text-[#C5A059]'}>
          Favorite
        </NavLink>
        <NavLink to="/cart" className={({ isActive }) => isActive ? 'text-[#C5A059]' : 'hover:text-[#C5A059]'}>
          Coș
        </NavLink>
        {user ? (
          <button onClick={() => dispatch(logout())} className="border border-stone-200 px-4 py-1 hover:bg-stone-50 transition">
            Logout
          </button>
        ) : (
          <Link to="/login" className="bg-[#2D2926] text-white px-5 py-1 hover:bg-stone-800 transition">
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}