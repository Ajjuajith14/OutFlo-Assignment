import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="border-t mt-auto">
      <div className="container mx-auto px-4 py-6">
        <p className="text-center text-muted-foreground text-sm">
          © {new Date().getFullYear()} OutFlo Campaign Management System
        </p>
      </div>
    </footer>
  );
};

export default Footer;