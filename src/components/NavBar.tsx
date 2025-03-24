
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Logo } from "./Logo";
import { Container } from "./ui/container";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  GraduationCap,
  FileText,
  Settings,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { useAuth } from "@/context/AuthContext";

interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
}

const NavBar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isMobile = useIsMobile();
  const { signOut } = useAuth();

  const isActive = (path: string) => location.pathname === path;

  // Detect scroll position to change navbar appearance
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const navItems: NavItem[] = [
    {
      label: "Dashboard",
      href: "/dashboard",
      icon: <LayoutDashboard size={18} />,
    },
    {
      label: "Grades",
      href: "/grades",
      icon: <GraduationCap size={18} />,
    },
    {
      label: "Reports",
      href: "/reports",
      icon: <FileText size={18} />,
    },
    {
      label: "Settings",
      href: "/settings",
      icon: <Settings size={18} />,
    },
  ];

  return (
    <div
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-4",
        isScrolled
          ? "bg-white/80 dark:bg-black/50 backdrop-blur-xl shadow-sm"
          : "bg-transparent"
      )}
    >
      <Container>
        <div className="flex items-center justify-between">
          <Link to="/" className="z-50">
            <Logo />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Link to={item.href} key={item.href}>
                <Button
                  variant={isActive(item.href) ? "default" : "ghost"}
                  size="sm"
                  className={cn(
                    "gap-2 transition-all",
                    isActive(item.href)
                      ? ""
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {item.icon}
                  {item.label}
                </Button>
              </Link>
            ))}
            <Button
              variant="ghost"
              size="sm"
              className="gap-2 text-muted-foreground hover:text-foreground"
              onClick={signOut}
            >
              <LogOut size={18} />
              Logout
            </Button>
          </div>

          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </Button>
        </div>
      </Container>

      {/* Mobile Navigation */}
      {isMobile && (
        <div
          className={cn(
            "fixed inset-0 bg-white/95 dark:bg-black/95 backdrop-blur-xl z-40 pt-20 pb-6 px-4 transition-all duration-300 ease-in-out",
            mobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          )}
        >
          <div className="flex flex-col gap-2">
            {navItems.map((item, index) => (
              <Link to={item.href} key={item.href}>
                <Button
                  variant={isActive(item.href) ? "default" : "ghost"}
                  size="lg"
                  className={cn(
                    "w-full justify-start gap-3 text-lg animate-in-delay-1",
                    isActive(item.href)
                      ? ""
                      : "text-muted-foreground hover:text-foreground",
                    `animate-in-delay-${index + 1}`
                  )}
                >
                  {item.icon}
                  {item.label}
                </Button>
              </Link>
            ))}
            <Button
              variant="ghost"
              size="lg"
              className="w-full justify-start gap-3 text-lg text-muted-foreground hover:text-foreground animate-in-delay-4"
              onClick={signOut}
            >
              <LogOut size={18} />
              Logout
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export { NavBar };
