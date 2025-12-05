export default function Footer() {  
    return (
        <footer className="bg-gray-800 text-white mt-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 text-center">
                <p className="text-sm text-gray-400">
                    &copy; {new Date().getFullYear()} BizFinder Directory. All rights reserved.
                </p>
                <div className="flex justify-center space-x-6 mt-4">
                    <a href="#" className="text-gray-400 hover:text-white text-sm">Privacy Policy</a>
                    <a href="#" className="text-gray-400 hover:text-white text-sm">Terms of Service</a>
                    <a href="#" className="text-gray-400 hover:text-white text-sm">Contact Us</a>
                </div>
            </div>
        </footer>
    );
}