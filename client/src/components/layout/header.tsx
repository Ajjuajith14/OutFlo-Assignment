import React from "react";
import { Link, useLocation } from "react-router-dom";

const Header: React.FC = () => {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname.startsWith(path) ? "text-primary font-medium" : "text-muted-foreground";
  };

  return (
    <header className="border-b">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold">
          OutFlo
        </Link>

        <nav className="flex items-center space-x-6">
          <Link to="/campaigns" className={`${isActive("/campaigns")} hover:text-primary transition-colors`}>
            Campaigns
          </Link>
          <Link
            to="/message-generator"
            className={`${isActive("/message-generator")} hover:text-primary transition-colors`}
          >
            Message Generator
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;