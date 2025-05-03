// src/components/Navbar.tsx

import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ShoppingCart, User, Search, Menu, X, Sun, Moon } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useCart } from '@/contexts/CartContext';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useDarkMode } from '../hooks/userDarkMode';

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const { totalItems, toggleCart } = useCart();
  const { isDark, toggleDarkMode } = useDarkMode(); // ✅ You forgot to include this line
  const location = useLocation();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Track scroll position for navbar transparency
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Close mobile menu when changing routes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Shop', path: '/shop' },
    { name: 'Fruits', path: '/category/fruit' },
    { name: 'Vegetables', path: '/category/vegetable' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  const avatarFallback = user?.name
    ? user.name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .slice(0, 2)
        .toUpperCase()
    : 'UU';

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/90 dark:bg-gray-900/90 shadow-md backdrop-blur-sm py-2'
          : 'bg-transparent py-4'
      }`}
    >
      <div className="container flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <span className="relative inline-flex h-8 w-8 animate-bounce">
            <span className="h-full w-full rounded-full bg-fruity-red"></span>
            <span className="absolute top-0 right-0 h-3 w-3 rounded-full bg-fruity-green"></span>
          </span>
          <span className="text-2xl font-bold text-gradient">FruityFlow</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-6">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`transition-colors hover:text-fruity-green ${
                location.pathname === item.path
                  ? 'font-semibold text-fruity-green'
                  : 'text-gray-700 dark:text-gray-200'
              }`}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Desktop Action Buttons */}
        <div className="hidden md:flex items-center space-x-4">
          <Link to="/search">
            <Button variant="ghost" size="icon" className="rounded-full">
              <Search className="h-5 w-5" />
            </Button>
          </Link>

          <Button
            onClick={toggleCart}
            variant="ghost"
            size="icon"
            className="rounded-full relative"
          >
            <ShoppingCart className="h-5 w-5" />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 flex items-center justify-center h-5 w-5 bg-fruity-red text-white rounded-full text-xs animate-scale">
                {totalItems}
              </span>
            )}
          </Button>

          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="rounded-full h-9 w-9 p-0">
                  <Avatar>
                    <AvatarImage src={user?.avatar} alt={user?.name} />
                    <AvatarFallback>{avatarFallback}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <div className="flex items-center gap-2 p-2">
                  <div className="flex flex-col leading-none">
                    <p className="font-medium">{user?.name}</p>
                    <p className="text-sm text-muted-foreground">{user?.email}</p>
                  </div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/dashboard" className="w-full cursor-pointer">
                    Dashboard
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/orders" className="w-full cursor-pointer">
                    My Orders
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/profile" className="w-full cursor-pointer">
                    Profile Settings
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="cursor-pointer text-red-500 focus:text-red-500"
                  onClick={logout}
                >
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Link to="/login">
                <Button className="btn-bounce bg-gradient-to-r from-fruity-green to-fruity-lightGreen">
                  <User className="mr-2 h-4 w-4" />
                  Login
                </Button>
              </Link>

              <Button
                variant="ghost"
                size="icon"
                onClick={toggleDarkMode}
                className="rounded-full"
              >
                {isDark ? (
                  <Sun className="h-5 w-5 text-yellow-400" />
                ) : (
                  <Moon className="h-5 w-5 text-gray-700 dark:text-gray-200" />
                )}
              </Button>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center space-x-3">
          <Button
            onClick={toggleCart}
            variant="ghost"
            size="icon"
            className="rounded-full relative"
          >
            <ShoppingCart className="h-5 w-5" />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 flex items-center justify-center h-5 w-5 bg-fruity-red text-white rounded-full text-xs animate-scale">
                {totalItems}
              </span>
            )}
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="rounded-full"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white dark:bg-gray-900 shadow-lg animate-fade-in">
          <nav className="flex flex-col space-y-3 p-6">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`py-2 px-4 rounded-md transition-colors ${
                  location.pathname === item.path
                    ? 'font-semibold text-white bg-fruity-green'
                    : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              >
                {item.name}
              </Link>
            ))}
            <div className="border-t border-gray-200 dark:border-gray-700 my-2 pt-2">
              <Link
                to="/search"
                className="flex items-center py-2 px-4 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <Search className="h-5 w-5 mr-3" />
                Search
              </Link>

              {isAuthenticated ? (
                <>
                  <Link
                    to="/dashboard"
                    className="flex items-center py-2 px-4 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
                  >
                    <User className="h-5 w-5 mr-3" />
                    Dashboard
                  </Link>
                  <button
                    onClick={logout}
                    className="flex items-center w-full text-left py-2 px-4 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 text-red-500"
                  >
                    <X className="h-5 w-5 mr-3" />
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="flex items-center py-2 px-4 rounded-md bg-fruity-green text-white hover:bg-fruity-lightGreen"
                  >
                    <User className="h-5 w-5 mr-3" />
                    Login / Register
                  </Link>

                  <button
                    onClick={toggleDarkMode}
                    className="flex items-center w-full text-left py-2 px-4 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
                  >
                    {isDark ? (
                      <Sun className="h-5 w-5 mr-3 text-yellow-400" />
                    ) : (
                      <Moon className="h-5 w-5 mr-3" />
                    )}
                    {isDark ? 'Light Mode' : 'Dark Mode'}
                  </button>
                </>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
