import { LogOut } from 'lucide-react'
import { useAuthStore } from '../store/authStore'
import { useNavigate } from 'react-router-dom'

function Navbar() {
  const { user, logout } = useAuthStore()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <nav className="bg-white shadow-sm px-6 py-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold text-blue-600">Loan Dashboard</h1>
      <div className="flex items-center gap-4">
        <span className="text-gray-600">{user?.name || user?.email}</span>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </nav>
  )
}

export default Navbar