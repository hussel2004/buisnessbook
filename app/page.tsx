'use client';
import React, { useState } from 'react';
import { Search, MapPin, Tag, Newspaper, ArrowRight, Briefcase, Star } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
// --- Placeholder Components (Internal to this file) ---


// --- Content Section Components ---

const HeroSection = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [location, setLocation] = useState('');

  interface SearchEvent extends React.FormEvent<HTMLFormElement> {}

  const handleSearch = (e: SearchEvent) => {
    e.preventDefault();
    // In a real app, you would navigate or fetch data here
    console.log(`Searching for: ${searchTerm} in ${location}`);
  };

  return (
    <section id="search" className="bg-indigo-50 py-20 lg:py-32 rounded-b-3xl shadow-inner">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">
          Find the Right Local Business, Fast.
        </h2>
        <p className="text-xl text-gray-600 mb-10">
          Explore millions of products, services, and promotions from companies near you.
        </p>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="bg-white p-2 rounded-xl shadow-2xl flex flex-col md:flex-row gap-2">
          <div className="flex items-center flex-grow p-1">
            <Search className="w-5 h-5 text-gray-400 ml-3" />
            <input
              type="text"
              placeholder="e.g., 'Handmade Soap' or 'Plumber'"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-3 border-none focus:ring-0 rounded-l-lg outline-none text-gray-700"
            />
          </div>
          <div className="flex items-center flex-grow p-1 border-t md:border-t-0 md:border-l border-gray-200">
            <MapPin className="w-5 h-5 text-gray-400 ml-3" />
            <input
              type="text"
              placeholder="Location (Optional)"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full p-3 border-none focus:ring-0 rounded-r-lg outline-none text-gray-700"
            />
          </div>
          <button
            type="submit"
            className="bg-indigo-600 text-white font-semibold px-6 py-3 rounded-xl hover:bg-indigo-700 transition duration-300 shadow-lg md:w-auto w-full"
          >
            Search
          </button>
        </form>
      </div>
    </section>
  );
};

// Placeholder for a reusable card structure
type PromoCardProps = {
  title: string;
  discount: string;
  description: string;
  color: string;
};

const PromoCard = ({ title, discount, description, color }: PromoCardProps) => (
  <div className={`p-6 rounded-xl shadow-lg transition duration-300 hover:shadow-xl transform hover:-translate-y-1 ${color}`}>
    <Tag className="w-8 h-8 mb-3 text-white" />
    <h4 className="text-xl font-bold text-white mb-2">{title}</h4>
    <p className="text-3xl font-extrabold text-white mb-3">{discount}</p>
    <p className="text-gray-200 text-sm">{description}</p>
    <a href="#" className="mt-4 inline-flex items-center text-white font-semibold group">
      View Deal
      <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
    </a>
  </div>
);

const PromotionsSection = () => {
  const promotions = [
    { title: "First Time User", discount: "15% OFF", description: "Exclusive discount for new customers on any service.", color: "bg-green-500" },
    { title: "Weekend Flash Sale", discount: "Up to 50%", description: "Deep discounts on selected products every weekend.", color: "bg-red-500" },
    { title: "Local Favorites", discount: "$10 VOUCHER", description: "Get a discount when supporting featured neighborhood businesses.", color: "bg-yellow-500" },
  ];

  return (
    <section id="promotions" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold text-gray-900">Explore Current Promotions</h3>
          <p className="text-gray-600 mt-2">Amazing deals and special offers from businesses near you.</p>
        </div>
        
        {/* Promotion Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {promotions.map((promo, index) => (
            <PromoCard key={index} {...promo} />
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Link href="/promotions" className="text-indigo-600 font-semibold hover:text-indigo-700 transition duration-150 flex items-center justify-center">
            See all promotions <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
        </div>
      </div>
    </section>
  );
};

// NEW: Featured Companies Section Components
type FeaturedCompanyCardProps = {
  name: string;
  category: string;
  description: string;
  rating: number;
};

const FeaturedCompanyCard = ({ name, category, description, rating }: FeaturedCompanyCardProps) => (
  <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 transition duration-300 hover:shadow-lg">
    <div className="flex justify-between items-start mb-3">
      <h4 className="text-xl font-bold text-gray-900">{name}</h4>
      <span className="text-sm font-medium text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">{category}</span>
    </div>
    <p className="text-gray-600 text-sm mb-4 line-clamp-3">{description}</p>
    <div className="flex items-center justify-between">
      <span className="text-yellow-500 font-bold text-lg flex items-center">
        {rating}
        <Star className="w-4 h-4 ml-1 fill-yellow-500 text-yellow-500" />
      </span>
      <a href="#" className="text-indigo-500 hover:text-indigo-600 font-medium text-sm flex items-center">
        View Profile
        <ArrowRight className="w-3 h-3 ml-1" />
      </a>
    </div>
  </div>
);

const FeaturedCompaniesSection = () => {
  const featured = [
    { name: "Artisan Coffee Roasters", category: "Food & Drink", description: "Locally sourced and roasted coffee beans. Serving premium espresso and cold brew since 2018.", rating: 4.9 },
    { name: "Bright Futures Tutoring", category: "Education", description: "Personalized tutoring for K-12 math and science. Certified teachers focused on student success.", rating: 4.7 },
    { name: "Zen Den Yoga Studio", category: "Health & Wellness", description: "Offering beginner to advanced yoga classes, meditation sessions, and weekend retreats.", rating: 4.8 },
    { name: "Urban Tech Repair", category: "Services", description: "Fast and reliable repair services for all smartphones, tablets, and laptops. 90-day guarantee.", rating: 4.6 },
  ];

  return (
    <section id="companies" className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold text-gray-900">Featured Local Businesses</h3>
          <p className="text-gray-600 mt-2">Discover popular companies and top-rated services in your area.</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {featured.map((company, index) => (
            <FeaturedCompanyCard key={index} {...company} />
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Link href="/company" className="text-indigo-600 font-semibold hover:text-indigo-700 transition duration-150 flex items-center justify-center">
            See all companies <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
        </div>
      </div>
    </section>
  );
};

type PostCardProps = {
  title: string;
  company: string;
  date: string;
  summary: string;
};

const PostCard = ({ title, company, date, summary }: PostCardProps) => (
  <article className="bg-white p-6 rounded-xl shadow-md border border-gray-100 transition duration-300 hover:shadow-lg">
    <div className="flex items-center mb-3">
      <Newspaper className="w-5 h-5 text-indigo-500 mr-2" />
      <span className="text-sm font-semibold text-indigo-600">{company}</span>
    </div>
    <h4 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">{title}</h4>
    <p className="text-gray-600 text-sm mb-4 line-clamp-3">{summary}</p>
    <div className="flex justify-between items-center text-xs text-gray-500">
      <span>{date}</span>
      <a href="#" className="text-indigo-500 hover:text-indigo-600 font-medium">Read Post</a>
    </div>
  </article>
);

const CompanyPostsSection = () => {
  const posts = [
    { title: "How We Went Green: Our Sustainable Packaging Journey", company: "EcoPack Solutions", date: "Sept 1, 2025", summary: "We're excited to announce a major shift in our operations: 100% biodegradable and recyclable packaging..." },
    { title: "Meet the Team: Our Head Baker Sarah on Artisan Sourdough", company: "The Daily Loaf Bakery", date: "Aug 28, 2025", summary: "Get to know Sarah, the heart of our kitchen, and learn the secrets behind our award-winning sourdough recipe..." },
    { title: "New Feature Launch: AI-Powered Customer Support is Here!", company: "TechNova Software", date: "Aug 25, 2025", summary: "We've integrated the latest AI technology to provide instant answers and better support for all our users..." },
  ];

  return (
    <section id="posts" className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold text-gray-900">Latest Company Posts</h3>
          <p className="text-gray-600 mt-2">See what local businesses are doing, announcing, and offering.</p>
        </div>
        
        {/* Posts Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post, index) => (
            <PostCard key={index} {...post} />
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Link href="/posts" className="text-indigo-600 font-semibold hover:text-indigo-700 transition duration-150 flex items-center justify-center">
            Explore all posts <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
        </div>
      </div>
    </section>
  );
};

const CreateCompanyCTA = () => (
  <section className="py-16 bg-indigo-600 rounded-xl mx-4 sm:mx-6 lg:mx-8 my-12 shadow-2xl">
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <Briefcase className="w-12 h-12 text-white mx-auto mb-4" />
      <h3 className="text-3xl sm:text-4xl font-extrabold text-white mb-3">
        Are You a Business Owner?
      </h3>
      <p className="text-indigo-200 text-lg mb-8">
        Connect with local customers, post your promotions, and share your company news with the community.
      </p>
      <Link href="/company/new">
      <button className="bg-white text-indigo-600 font-bold px-8 py-3 rounded-full shadow-lg hover:bg-indigo-50 transition duration-300 transform hover:scale-105">
        Create Your Free Company Page
      </button>
      </Link>
    </div>
  </section>
);

// --- Main App Component ---

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white font-sans">
      
      
      <main>
        <HeroSection />
        <PromotionsSection />
        <FeaturedCompaniesSection />
        <CompanyPostsSection />
        <CreateCompanyCTA />
      </main>
      
    </div>
  );
}