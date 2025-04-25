"use client"
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  UserRound, Calendar, MessageSquare, Ambulance, 
  Menu, X 
} from 'lucide-react';
import { useState } from 'react';

const Sidebar = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const navItems = [
    { href: '/home/doctors', label: 'Doctors', icon: <UserRound size={20} /> },
    { href: '/home/appointments', label: 'Scheduled Calls', icon: <Calendar size={20} /> },
    { href: '/home/ai-chat', label: 'AI Chat', icon: <MessageSquare size={20} /> },
    { href: '/home/emergency', label: 'Emergency Service', icon: <Ambulance size={20} /> },
  ];

  return (
    <>
      {/* Mobile toggle button */}
      <button 
        onClick={toggleSidebar} 
        className="fixed top-4 left-4 z-50 p-2 rounded-md bg-blue-600 text-white md:hidden"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <div className={`
        fixed top-0 left-0 h-full bg-white shadow-lg transition-all duration-300 z-40
        ${isOpen ? 'translate-x-0' : '-translate-x-full'} 
        md:translate-x-0 md:w-64 w-3/4
      `}>
        <div className="p-5 border-b">
          <h1 className="text-2xl font-bold text-blue-600">Health App</h1>
        </div>

        <nav className="p-4">
          <ul className="space-y-2">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link 
                  href={item.href}
                  className={`
                    flex items-center gap-3 p-3 rounded-md transition-colors
                    ${pathname === item.href 
                      ? 'bg-blue-100 text-blue-600' 
                      : 'hover:bg-gray-100 text-black'
                    }
                  `}
                  onClick={() => setIsOpen(false)}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  );
};

export default Sidebar;