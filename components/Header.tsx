import { Briefcase } from 'lucide-react';
import Link from 'next/link';
export default function Header() {
    return (
        <header className="bg-white shadow-md sticky top-0 z-10">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
      <div className="flex items-center space-x-2">
        <Briefcase className="w-8 h-8 text-indigo-600" />
        <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">
          BizFinder
        </h1>
      </div>
      <nav className="hidden md:flex space-x-8">
        <a href="/#search" className="text-gray-600 hover:text-indigo-600 font-medium transition duration-150">Search</a>
        <a href="/promotions" className="text-gray-600 hover:text-indigo-600 font-medium transition duration-150">Promotions</a>
        <a href="/company" className="text-gray-600 hover:text-indigo-600 font-medium transition duration-150">Companies</a>
        <a href="/#posts" className="text-gray-600 hover:text-indigo-600 font-medium transition duration-150">Posts</a>
        {/*If user connected <a>Manage your companies<a> */}
      </nav>
      <div className="space-x-4">
        <Link href="/connexion">
          <button className="text-gray-600 hover:text-indigo-600 font-medium">
            Sign In  {/*If user connected user profile there */}
          </button>
        </Link>
        <Link href="/company/new">
          <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition duration-150 shadow-md">
            Create Company
          </button>
        </Link>
      </div>
    </div>
  </header>
    );
}


