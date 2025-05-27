import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const toggleMenu = () => setIsOpen(!isOpen);

  const navItems = [
    { name: 'Home', link: '#home' },
    { name: 'About Us', link: '#about' },
    { name: 'Guidelines', link: '#guidelines' },
    { name: 'Award Categories', link: '#awards' },
    { name: 'Winners', link: '/winners' },
    { name: 'Nominee Register', link: '/register' },
    { name: 'Admin Login', link: '/AdminLogin' },
    { name: 'Contact Us', link: '#contact' },
    { name: 'News', link: '#news' },
    { name: 'FAQ', link: '#faq' },
    { name: 'Gallery', link: '#gallery' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100;
      navItems.forEach((item) => {
        if (item.link.startsWith('#')) {
          const section = document.querySelector(item.link);
          if (section) {
            const { offsetTop, offsetHeight } = section;
            if (
              scrollPosition >= offsetTop &&
              scrollPosition < offsetTop + offsetHeight
            ) {
              setActiveSection(item.link);
            }
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [navItems]);

  return (
    <header className="navbar">
      <div className="nav-container">
        <div className="logo">
          <h1>Bravery Awards</h1>
        </div>

        <nav className={`nav-menu ${isOpen ? 'open' : ''}`}>
          {navItems.map((item, index) =>
            item.link.startsWith('#') ? (
              <a
                key={index}
                href={item.link}
                className={`nav-link ${activeSection === item.link ? 'active' : ''}`}
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </a>
            ) : (
              <Link
                key={index}
                to={item.link}
                className="nav-link"
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            )
          )}
        </nav>

        <div className="hamburger" onClick={toggleMenu}>
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
