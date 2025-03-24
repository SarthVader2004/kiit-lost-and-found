
import { useState, useEffect } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Search, User, LogOut } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const { user, signOut } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchValue.trim()) {
      console.log('Searching for:', searchValue);
      // Implement search functionality here
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      toast.success('Signed out successfully');
      navigate('/');
    } catch (error) {
      toast.error('Error signing out');
    }
  };

  const getInitials = (name?: string) => {
    if (!name) return 'U';
    return name.split(' ').map(part => part[0]).join('').toUpperCase().substring(0, 2);
  };

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/lost', label: 'Lost Items' },
    { path: '/found', label: 'Found Items' },
    { path: '/submit', label: 'Report Item' },
  ];

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled ? "py-2 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-sm" : "py-4 bg-transparent"
      )}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        <NavLink 
          to="/" 
          className="flex items-center gap-2"
          aria-label="KIIT Lost and Found"
        >
          <img 
            src="/lovable-uploads/d849df61-aa8c-4eff-b202-94645c6f1e46.png" 
            alt="KIIT Logo" 
            className="h-10 w-auto"
          />
          <span className={cn(
            "font-semibold text-lg transition-opacity duration-300",
            isScrolled ? "opacity-100" : "opacity-0 md:opacity-100"
          )}>
            Lost & Found
          </span>
        </NavLink>
        
        <div className="hidden md:flex items-center space-x-1">
          <form onSubmit={handleSearch} className="relative mr-4">
            <Input
              type="search"
              placeholder="Search items..."
              className="w-44 pl-9 h-9 focus:w-64 transition-all duration-300"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
            <Search className="absolute left-2.5 top-2 h-4.5 w-4.5 text-muted-foreground" />
          </form>
          
          <nav className="flex items-center space-x-1">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) => cn(
                  "px-3 py-2 rounded-md text-sm font-medium transition-all duration-200",
                  isActive 
                    ? "text-kiit-green bg-kiit-green/10" 
                    : "text-foreground/80 hover:text-kiit-green hover:bg-kiit-green/5"
                )}
              >
                {item.label}
              </NavLink>
            ))}

            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="ml-2 rounded-full h-9 w-9 p-0">
                    <Avatar className="h-9 w-9">
                      <AvatarImage src={user.user_metadata?.avatar_url} />
                      <AvatarFallback>{getInitials(user.user_metadata?.full_name)}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <div className="flex items-center justify-start gap-2 p-2">
                    <div className="flex flex-col space-y-1 leading-none">
                      {user.user_metadata?.full_name && (
                        <p className="font-medium">{user.user_metadata.full_name}</p>
                      )}
                      <p className="text-xs text-muted-foreground truncate">
                        {user.email}
                      </p>
                    </div>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem 
                    className="cursor-pointer"
                    onClick={handleSignOut}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center space-x-2">
                <Button 
                  variant="ghost" 
                  onClick={() => navigate('/auth/login')}
                >
                  Login
                </Button>
                <Button 
                  variant="default"
                  onClick={() => navigate('/auth/signup')}
                >
                  Sign Up
                </Button>
              </div>
            )}
          </nav>
        </div>
        
        {/* Mobile menu button */}
        <Button 
          variant="ghost" 
          size="icon"
          className="md:hidden"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </Button>
      </div>
      
      {/* Mobile menu */}
      <div className={cn(
        "fixed inset-x-0 top-[57px] bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-md p-4 transition-all duration-300 ease-in-out transform md:hidden",
        isMobileMenuOpen ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
      )}>
        <form onSubmit={handleSearch} className="relative mb-4">
          <Input
            type="search"
            placeholder="Search items..."
            className="w-full pl-9 h-10"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        </form>
        
        <nav className="flex flex-col space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => cn(
                "px-4 py-3 rounded-md text-base font-medium transition-all duration-200",
                isActive 
                  ? "text-kiit-green bg-kiit-green/10" 
                  : "text-foreground/80 hover:text-kiit-green hover:bg-kiit-green/5"
              )}
            >
              {item.label}
            </NavLink>
          ))}
          
          {user ? (
            <>
              <div className="px-4 py-3 flex items-center space-x-3">
                <Avatar className="h-9 w-9">
                  <AvatarImage src={user.user_metadata?.avatar_url} />
                  <AvatarFallback>{getInitials(user.user_metadata?.full_name)}</AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  {user.user_metadata?.full_name && (
                    <span className="font-medium">{user.user_metadata.full_name}</span>
                  )}
                  <span className="text-xs text-muted-foreground truncate">
                    {user.email}
                  </span>
                </div>
              </div>
              <Button 
                variant="ghost"
                className="justify-start px-4 py-3 h-auto font-medium text-base"
                onClick={handleSignOut}
              >
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </Button>
            </>
          ) : (
            <>
              <Button 
                variant="ghost"
                className="justify-start px-4 py-3 h-auto font-medium text-base"
                onClick={() => navigate('/auth/login')}
              >
                <User className="mr-2 h-4 w-4" />
                <span>Login</span>
              </Button>
              <Button 
                variant="default"
                className="justify-start text-base"
                onClick={() => navigate('/auth/signup')}
              >
                Sign Up
              </Button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
