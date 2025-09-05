import React, { useState, useEffect } from 'react';
import { ChevronDown, Mail, Phone, Instagram, MapPin, ExternalLink, Menu, X, Award, Users, Palette, Sparkles, Star, Calendar, Clock, Heart, Camera, Crown, Sun, Moon, MessageCircle } from 'lucide-react';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isVisible, setIsVisible] = useState<{ [key: string]: boolean }>({});
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [showWelcome, setShowWelcome] = useState(true);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  useEffect(() => {
    // Welcome animation timer
    const welcomeTimer = setTimeout(() => {
      setShowWelcome(false);
    }, 2000);

    // Theme management
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setIsDarkMode(savedTheme === 'dark');
    }

    // Ultra Smooth Custom Cursor Implementation
    let cursor: HTMLElement | null = null;
    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;
    let animationId = 0;
    let trailCount = 0;

    const initCursor = () => {
      cursor = document.createElement('div');
      cursor.className = 'custom-cursor';
      cursor.style.opacity = '1';
      cursor.style.pointerEvents = 'none';
      cursor.style.position = 'fixed';
      cursor.style.zIndex = '10000';
      document.body.appendChild(cursor);
      document.body.classList.add('custom-cursor-active');
      return cursor;
    };

    cursor = initCursor();

    // Butter smooth mouse tracking
    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      // Create trail effect (optimized)
      trailCount++;
      if (trailCount % 3 === 0) { // Create trail every 3rd movement
        createTrail(mouseX, mouseY);
      }
    };

    // Optimized trail creation
    const createTrail = (x: number, y: number) => {
      const trail = document.createElement('div');
      trail.className = 'cursor-trail';
      trail.style.left = x + 'px';
      trail.style.top = y + 'px';
      document.body.appendChild(trail);

      setTimeout(() => {
        if (trail.parentNode) {
          document.body.removeChild(trail);
        }
      }, 1200);
    };

    // Silky smooth animation loop
    const animateCursor = () => {
      if (!cursor) return;
      
      const speed = 0.25; // Perfect balance of smoothness and responsiveness
      const dx = mouseX - cursorX;
      const dy = mouseY - cursorY;
      
      // Apply easing
      cursorX += dx * speed;
      cursorY += dy * speed;
      
      // Use transform for optimal performance
      cursor.style.left = cursorX + 'px';
      cursor.style.top = cursorY + 'px';
      
      animationId = requestAnimationFrame(animateCursor);
    };

    // Enhanced hover effects
    const addHoverEffect = (element: Element) => {
      element.addEventListener('mouseenter', () => {
        if (cursor) cursor.classList.add('hover');
      }, { passive: true });
      
      element.addEventListener('mouseleave', () => {
        if (cursor) cursor.classList.remove('hover');
      }, { passive: true });
    };

    // Click effects
    const handleMouseDown = () => {
      if (cursor) cursor.classList.add('click');
    };

    const handleMouseUp = () => {
      if (cursor) cursor.classList.remove('click');
    };

    // Add all event listeners
    document.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mousedown', handleMouseDown, { passive: true });
    document.addEventListener('mouseup', handleMouseUp, { passive: true });

    // Apply hover effects to interactive elements
    const setupInteractivity = () => {
      const selectors = 'button, a, input, textarea, select, [role="button"], .clickable';
      const elements = document.querySelectorAll(selectors);
      elements.forEach(addHoverEffect);
    };

    // Start everything
    setupInteractivity();
    animateCursor();

    const cleanupCursor = () => {
      // Stop animation
      if (animationId) {
        cancelAnimationFrame(animationId);
      }

      // Remove listeners
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);

      // Clean up cursor
      if (cursor && cursor.parentNode) {
        document.body.removeChild(cursor);
        cursor = null;
      }
      
      document.body.classList.remove('custom-cursor-active');
      
      // Clean up trails
      const trails = document.querySelectorAll('.cursor-trail');
      trails.forEach(trail => {
        if (trail.parentNode) {
          document.body.removeChild(trail);
        }
      });
    };

    // Debounced scroll handler for better performance
    let scrollTimeout: NodeJS.Timeout;
    const handleScroll = () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        const sections = ['home', 'about', 'services', 'portfolio', 'testimonials', 'contact'];
        const scrollPosition = window.scrollY + 100;

        for (const section of sections) {
          const element = document.getElementById(section);
          if (element) {
            const offsetTop = element.offsetTop;
            const offsetHeight = element.offsetHeight;

            if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
              setActiveSection(section);
              break;
            }
          }
        }

        // Optimized intersection observer for animations
        sections.forEach(section => {
          const element = document.getElementById(section);
          if (element) {
            const rect = element.getBoundingClientRect();
            const isInView = rect.top < window.innerHeight * 0.8 && rect.bottom > 0;
            setIsVisible(prev => ({ ...prev, [section]: isInView }));
          }
        });
      }, 10);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    // Auto-scroll testimonials - reduced frequency for better performance
    const testimonialInterval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(welcomeTimer);
      clearInterval(testimonialInterval);
      cleanupCursor(); // Clean up cursor functionality
    };
  }, []);

  useEffect(() => {
    // Apply theme to document
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  const services = [
    { 
      name: 'Bridal Makeup', 
      icon: <Crown className="w-8 h-8" />, 
      description: 'Complete bridal look with trial session',
      features: ['Trial session included', 'Long-lasting formula', 'Touch-up kit provided', 'Hair styling available']
    },
    { 
      name: 'Special Events', 
      icon: <Sparkles className="w-8 h-8" />, 
      description: 'Perfect for parties, galas, and celebrations',
      features: ['Custom look design', 'Photo-ready finish', 'Premium products', 'Quick touch-ups']
    },
    { 
      name: 'Editorial/Photoshoot', 
      icon: <Camera className="w-8 h-8" />, 
      description: 'Professional makeup for photography and media',
      features: ['HD makeup techniques', 'Multiple look changes', 'Collaboration with photographers', 'Portfolio building']
    },
    { 
      name: 'Makeup Lessons', 
      icon: <Palette className="w-8 h-8" />, 
      description: 'Learn professional techniques and tips',
      features: ['Personalized instruction', 'Product recommendations', 'Technique practice', 'Take-home guide']
    }
  ];

  const portfolioItems = [
    {
      title: 'Royal Bridal Elegance',
      category: 'Bridal',
      description: 'Traditional bridal makeup with gold accents and flawless finish',
      image: 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=800',
      featured: true
    },
    {
      title: 'Reception Glam',
      category: 'Bridal',
      description: 'Bold and glamorous bridal reception look with dramatic eyes',
      image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=800',
      featured: true
    },
    {
      title: 'Mehendi Ceremony',
      category: 'Bridal',
      description: 'Fresh and vibrant look for pre-wedding mehendi celebration',
      image: 'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=800',
      featured: true
    },
    {
      title: 'Engagement Glow',
      category: 'Special Event',
      description: 'Romantic and radiant makeup for engagement ceremonies',
      image: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=800',
      featured: false
    },
    {
      title: 'Sangeet Night',
      category: 'Special Event',
      description: 'Festive and colorful look perfect for sangeet celebrations',
      image: 'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=800',
      featured: false
    },
    {
      title: 'Cocktail Party Glam',
      category: 'Special Event',
      description: 'Sophisticated evening makeup for cocktail parties and events',
      image: 'https://images.pexels.com/photos/1181677/pexels-photo-1181677.jpeg?auto=compress&cs=tinysrgb&w=800',
      featured: false
    }
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      event: 'Wedding Day',
      rating: 5,
      text: 'Kanika made me feel absolutely stunning on my wedding day. Her attention to detail and ability to enhance my natural beauty was incredible. I felt confident and beautiful all day long!',
      image: 'https://images.pexels.com/photos/1181424/pexels-photo-1181424.jpeg?auto=compress&cs=tinysrgb&w=200'
    },
    {
      name: 'Emily Chen',
      event: 'Photoshoot',
      rating: 5,
      text: 'Working with Kanika for my professional headshots was amazing. She understood exactly what I needed and created a look that was both professional and striking. Highly recommend!',
      image: 'https://images.pexels.com/photos/1181519/pexels-photo-1181519.jpeg?auto=compress&cs=tinysrgb&w=200'
    },
    {
      name: 'Maria Rodriguez',
      event: 'Special Event',
      rating: 5,
      text: 'Kanika transformed me for my anniversary celebration. Her expertise and professionalism are unmatched. I received so many compliments and felt absolutely radiant!',
      image: 'https://images.pexels.com/photos/1181562/pexels-photo-1181562.jpeg?auto=compress&cs=tinysrgb&w=200'
    }
  ];

  return (
    <div className={`min-h-screen transition-colors duration-500 overflow-x-hidden ${
      isDarkMode 
        ? 'bg-black text-white' 
        : 'bg-white text-black'
    }`}>

      {/* Welcome Animation Overlay */}
      {showWelcome && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black">
          <div className="text-center">
            <div className="relative mb-8">
              <div className="w-32 h-32 mx-auto relative">
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full animate-ping"></div>
                <div className="absolute inset-2 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full animate-pulse"></div>
                <div className="absolute inset-4 bg-black rounded-full flex items-center justify-center">
                  <Crown className="w-12 h-12 text-yellow-400 animate-bounce" />
                </div>
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 bg-clip-text text-transparent animate-pulse">
              Amita Makeover
            </h1>
            <p className="text-xl text-gray-300 mt-4 animate-fadeInUp">
              Professional Makeup Artist
            </p>
            <div className="mt-8">
              <div className="w-64 h-1 bg-gray-800 rounded-full mx-auto overflow-hidden">
                <div className="h-full bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full animate-loading-bar"></div>
              </div>
            </div>
          </div>
        </div>
      )}
      

      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 backdrop-blur-sm border-b z-50 transition-all duration-300 ${
        isDarkMode 
          ? 'bg-black/95 border-gray-800' 
          : 'bg-white/95 border-gray-200'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              {/* Header Logo */}
              <div className="relative w-12 h-12 group">
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full animate-pulse"></div>
                <div className="absolute inset-1 bg-black rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Crown className="w-6 h-6 text-yellow-400" />
                </div>
              </div>
              <div className="text-xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
                Amita Makeover
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {['Home', 'About', 'Services', 'Portfolio', 'Testimonials', 'Contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className={`px-4 py-2 text-sm font-medium transition-all duration-300 relative group ${
                    activeSection === item.toLowerCase()
                      ? 'text-yellow-400'
                      : isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-black'
                  }`}
                >
                  {item}
                  <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-yellow-400 to-yellow-600 transform transition-transform duration-300 ${
                    activeSection === item.toLowerCase() ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                  }`}></span>
                </button>
              ))}

              {/* Theme Toggle Button */}
              <button
                onClick={toggleTheme}
                className={`ml-4 p-3 rounded-full border-2 transition-all duration-300 hover:scale-110 ${
                  isDarkMode 
                    ? 'border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black' 
                    : 'border-gray-800 text-gray-800 hover:bg-gray-800 hover:text-white'
                }`}
                aria-label="Toggle theme"
              >
                {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
            </div>

            {/* Mobile menu button and theme toggle */}
            <div className="md:hidden flex items-center space-x-4">
              <button
                onClick={toggleTheme}
                className={`p-2 rounded-full border-2 transition-all duration-300 hover:scale-110 ${
                  isDarkMode 
                    ? 'border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black' 
                    : 'border-gray-800 text-gray-800 hover:bg-gray-800 hover:text-white'
                }`}
                aria-label="Toggle theme"
              >
                {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className={`p-2 rounded-md transition-colors duration-200 ${
                  isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-black'
                }`}
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className={`md:hidden backdrop-blur-sm border-t animate-fadeIn ${
            isDarkMode 
              ? 'bg-black/95 border-gray-800' 
              : 'bg-white/95 border-gray-200'
          }`}>
            <div className="px-2 pt-2 pb-3 space-y-1">
              {['Home', 'About', 'Services', 'Portfolio', 'Testimonials', 'Contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className={`block px-3 py-2 text-sm font-medium w-full text-left transition-colors duration-200 ${
                    isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-black'
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
        {/* Enhanced Animated Background */}
        <div className={`absolute inset-0 ${
          isDarkMode 
            ? 'bg-gradient-to-br from-black via-gray-900 to-black' 
            : 'bg-gradient-to-br from-white via-gray-100 to-gray-200'
        }`}>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,215,0,0.1),transparent_50%)]"></div>
          
          {/* Floating orbs */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-yellow-400/5 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-yellow-400/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-yellow-300/3 rounded-full blur-2xl animate-spin-slow"></div>
          
          {/* Floating particles */}
          <div className="absolute top-20 left-20 w-4 h-4 bg-yellow-400/20 rounded-full animate-bounce delay-200"></div>
          <div className="absolute top-40 right-32 w-3 h-3 bg-yellow-300/20 rounded-full animate-bounce delay-700"></div>
          <div className="absolute bottom-32 left-40 w-5 h-5 bg-yellow-500/20 rounded-full animate-bounce delay-1000"></div>
          <div className="absolute bottom-20 right-20 w-2 h-2 bg-yellow-400/30 rounded-full animate-bounce delay-500"></div>
          
          {/* Subtle grid pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,215,0,0.1)_1px,transparent_1px),linear-gradient(rgba(255,215,0,0.1)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
          </div>
        </div>

        <div className="flex items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="max-w-4xl mx-auto">
            {/* Circular Logo with Crown */}
            <div className="relative mb-8 animate-fadeInUp">
              <div className="relative w-32 h-32 mx-auto group">
                {/* Outer golden ring */}
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full animate-pulse"></div>
                {/* Inner logo container */}
                <div className={`absolute inset-1 rounded-full flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform duration-500 ${
                  isDarkMode ? 'bg-black' : 'bg-white'
                }`}>
                  <Crown className="w-12 h-12 text-yellow-400" />
                </div>
                {/* Small decorative elements */}
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full flex items-center justify-center text-xs font-bold text-black">
                  A
                </div>
              </div>
            </div>

            {/* Hero Text with Staggered Animation */}
            <div className="space-y-6">
              <h1 className={`text-5xl md:text-7xl font-bold animate-fadeInUp delay-200 ${
                isDarkMode ? 'text-white' : 'text-black'
              }`}>
                Professional{' '}
                <span className="bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 bg-clip-text text-transparent animate-shimmer">
                  Makeup Artist
                </span>
              </h1>

              <p className={`text-xl md:text-2xl leading-relaxed animate-fadeInUp delay-400 max-w-3xl mx-auto ${
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Transforming beauty through artistry. Specializing in bridal, editorial, 
                and special occasion makeup that enhances your natural radiance
              </p>

              {/* CTA Buttons with Hover Animations */}
              <div className="flex flex-col sm:flex-row gap-6 justify-center pt-8 animate-fadeInUp delay-600">
                <button
                  onClick={() => scrollToSection('portfolio')}
                  className="group px-10 py-4 bg-gradient-to-r from-yellow-400 to-yellow-600 text-black rounded-full font-semibold hover:from-yellow-500 hover:to-yellow-700 transition-all duration-300 shadow-lg hover:shadow-yellow-400/25 hover:shadow-2xl transform hover:scale-105"
                >
                  <span className="flex items-center justify-center space-x-2">
                    <span>View Portfolio</span>
                    <Camera className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
                  </span>
                </button>
                <button
                  onClick={() => scrollToSection('contact')}
                  className={`group px-10 py-4 border-2 border-yellow-400 text-yellow-400 rounded-full font-semibold hover:bg-yellow-400 transition-all duration-300 transform hover:scale-105 ${
                    isDarkMode ? 'hover:text-black' : 'hover:text-black'
                  }`}
                >
                  <span className="flex items-center justify-center space-x-2">
                    <span>Book Consultation</span>
                    <Calendar className="w-5 h-5 group-hover:rotate-12 transition-transform duration-200" />
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className={`py-24 relative ${
        isDarkMode 
          ? 'bg-gradient-to-b from-black to-gray-900' 
          : 'bg-gradient-to-b from-gray-50 to-white'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-20 transition-all duration-1000 ${isVisible.about ? 'animate-fadeInUp' : 'opacity-0 translate-y-10'}`}>
            <h2 className="text-5xl md:text-6xl font-bold mb-6">
              About <span className="bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">Me</span>
            </h2>
            <div className="w-32 h-1 bg-gradient-to-r from-yellow-400 to-yellow-600 mx-auto"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className={`transition-all duration-1000 delay-200 ${isVisible.about ? 'animate-slideInLeft' : 'opacity-0 -translate-x-10'}`}>
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-yellow-600/20 rounded-3xl blur-xl"></div>
                <img
                  src="https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=600"
                  alt="Amita Kushwah at work"
                  className="rounded-3xl shadow-2xl relative z-10 hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>

            <div className={`space-y-8 transition-all duration-1000 delay-400 ${isVisible.about ? 'animate-slideInRight' : 'opacity-0 translate-x-10'}`}>
              <div className="space-y-6">
                <h3 className="text-3xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent mb-4">
                  Hi, I'm Amita Kushwah
                </h3>
                <p className={`text-lg leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  With over <span className="text-yellow-400 font-semibold">8 years of experience</span> in the beauty industry, 
                  I am passionate about enhancing natural beauty and creating stunning transformations. 
                  My expertise spans from intimate bridal sessions to high-fashion editorial shoots.
                </p>
                <p className={`text-lg leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  I believe makeup is an art form that should celebrate individuality while enhancing 
                  confidence. Using only premium products and the latest techniques, I ensure every 
                  client feels radiant and camera-ready for their special moments.
                </p>
              </div>

              {/* Stats with Animation */}
              <div className="grid grid-cols-3 gap-8 pt-8">
                {[
                  { number: '500+', label: 'Happy Clients', icon: <Heart className="w-6 h-6" /> },
                  { number: '200+', label: 'Bridal Looks', icon: <Crown className="w-6 h-6" /> },
                  { number: '8+', label: 'Years Experience', icon: <Award className="w-6 h-6" /> }
                ].map((stat, index) => (
                  <div key={index} className="text-center group">
                    <div className="text-yellow-400 mb-2 flex justify-center group-hover:scale-110 transition-transform duration-300">
                      {stat.icon}
                    </div>
                    <div className="text-4xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">
                      {stat.number}
                    </div>
                    <div className={`text-sm mt-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className={`py-24 relative ${
        isDarkMode 
          ? 'bg-gradient-to-b from-gray-900 to-black' 
          : 'bg-gradient-to-b from-white to-gray-50'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-20 transition-all duration-1000 ${isVisible.services ? 'animate-fadeInUp' : 'opacity-0 translate-y-10'}`}>
            <h2 className="text-5xl md:text-6xl font-bold mb-6">
              My <span className="bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">Services</span>
            </h2>
            <div className="w-32 h-1 bg-gradient-to-r from-yellow-400 to-yellow-600 mx-auto"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className={`group p-8 rounded-3xl border transition-all duration-500 hover:shadow-2xl hover:shadow-yellow-400/10 transform hover:scale-105 ${
                  isDarkMode 
                    ? 'bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700 hover:border-yellow-400/50' 
                    : 'bg-gradient-to-br from-white to-gray-50 border-gray-200 hover:border-yellow-400/50 shadow-lg'
                } ${isVisible.services ? 'animate-fadeInUp' : 'opacity-0 translate-y-10'}`}
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div className="flex items-start space-x-6">
                  <div className="text-yellow-400 flex-shrink-0 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">
                    {service.icon}
                  </div>
                  <div className="flex-1">
                    <div className="mb-4">
                      <h3 className="text-2xl font-semibold group-hover:text-yellow-400 transition-colors duration-300">
                        {service.name}
                      </h3>
                    </div>
                    <p className={`mb-6 leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>{service.description}</p>

                    <div className="space-y-2">
                      {service.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center space-x-2">
                          <Star className="w-4 h-4 text-yellow-400 fill-current flex-shrink-0" />
                          <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className={`py-24 relative ${
        isDarkMode 
          ? 'bg-gradient-to-b from-black to-gray-900' 
          : 'bg-gradient-to-b from-gray-50 to-white'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-20 transition-all duration-1000 ${isVisible.portfolio ? 'animate-fadeInUp' : 'opacity-0 translate-y-10'}`}>
            <h2 className="text-5xl md:text-6xl font-bold mb-6">
              My <span className="bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">Portfolio</span>
            </h2>
            <div className="w-32 h-1 bg-gradient-to-r from-yellow-400 to-yellow-600 mx-auto"></div>
          </div>

          {/* Featured Work */}
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {portfolioItems.filter(item => item.featured).map((item, index) => (
              <div
                key={index}
                className={`group rounded-3xl overflow-hidden border transition-all duration-500 hover:shadow-2xl hover:shadow-yellow-400/10 transform hover:scale-105 ${
                  isDarkMode 
                    ? 'bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700 hover:border-yellow-400/50' 
                    : 'bg-gradient-to-br from-white to-gray-50 border-gray-200 hover:border-yellow-400/50 shadow-lg'
                } ${isVisible.portfolio ? 'animate-fadeInUp' : 'opacity-0 translate-y-10'}`}
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                    <div className="p-6">
                      <ExternalLink className="w-8 h-8 text-yellow-400 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300" />
                    </div>
                  </div>
                  <div className="absolute top-4 right-4">
                    <span className="px-3 py-1 bg-yellow-400 text-black text-xs font-semibold rounded-full">
                      {item.category}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-3 group-hover:text-yellow-400 transition-colors duration-300">
                    {item.title}
                  </h3>
                  <p className={`text-sm leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>{item.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Additional Portfolio Items */}
          <div className="grid md:grid-cols-3 gap-8">
            {portfolioItems.filter(item => !item.featured).map((item, index) => (
              <div
                key={index}
                className={`group rounded-3xl overflow-hidden border transition-all duration-500 hover:shadow-2xl hover:shadow-yellow-400/10 transform hover:scale-105 ${
                  isDarkMode 
                    ? 'bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700 hover:border-yellow-400/50' 
                    : 'bg-gradient-to-br from-white to-gray-50 border-gray-200 hover:border-yellow-400/50 shadow-lg'
                } ${isVisible.portfolio ? 'animate-fadeInUp' : 'opacity-0 translate-y-10'}`}
                style={{ animationDelay: `${(index + 3) * 200}ms` }}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                    <div className="p-4">
                      <ExternalLink className="w-6 h-6 text-yellow-400 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300" />
                    </div>
                  </div>
                  <div className="absolute top-4 right-4">
                    <span className="px-2 py-1 bg-yellow-400 text-black text-xs font-semibold rounded-full">
                      {item.category}
                    </span>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold mb-2 group-hover:text-yellow-400 transition-colors duration-300">
                    {item.title}
                  </h3>
                  <p className={`text-sm leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className={`py-24 relative overflow-hidden ${
        isDarkMode 
          ? 'bg-gradient-to-b from-gray-900 to-black' 
          : 'bg-gradient-to-b from-white to-gray-50'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-20 transition-all duration-1000 ${isVisible.testimonials ? 'animate-fadeInUp' : 'opacity-0 translate-y-10'}`}>
            <h2 className="text-5xl md:text-6xl font-bold mb-6">
              Client <span className="bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">Love</span>
            </h2>
            <div className="w-32 h-1 bg-gradient-to-r from-yellow-400 to-yellow-600 mx-auto"></div>
          </div>

          {/* Auto-scrolling testimonial card */}
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Animated background elements */}
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/10 to-yellow-600/10 rounded-3xl blur-xl animate-pulse"></div>

              <div className={`relative p-12 rounded-3xl border transition-all duration-1000 transform ${
                isDarkMode 
                  ? 'bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700' 
                  : 'bg-gradient-to-br from-white to-gray-50 border-gray-200 shadow-xl'
              } ${isVisible.testimonials ? 'animate-fadeInUp scale-100' : 'opacity-0 scale-95'}`}>

                {/* Decorative quote marks */}
                <div className="absolute top-8 left-8 text-6xl text-yellow-400/20 font-serif">"</div>
                <div className="absolute bottom-8 right-8 text-6xl text-yellow-400/20 font-serif rotate-180">"</div>

                {/* Testimonial content with slide animation */}
                <div className="text-center relative z-10">
                  <div className="mb-8 transition-all duration-1000 ease-in-out transform">
                    <div className="flex space-x-1 justify-center mb-6">
                      {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                        <Star 
                          key={i} 
                          className="w-6 h-6 text-yellow-400 fill-current animate-pulse" 
                          style={{ animationDelay: `${i * 100}ms` }}
                        />
                      ))}
                    </div>

                    <p className={`text-xl md:text-2xl leading-relaxed italic mb-8 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      "{testimonials[currentTestimonial].text}"
                    </p>

                    <div className="space-y-2">
                      <h4 className="text-2xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
                        {testimonials[currentTestimonial].name}
                      </h4>
                      <p className="text-yellow-400 font-medium">
                        {testimonials[currentTestimonial].event}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Progress indicators */}
                <div className="flex justify-center space-x-2 mt-8">
                  {testimonials.map((_, index) => (
                    <div
                      key={index}
                      className={`w-3 h-3 rounded-full transition-all duration-500 ${
                        index === currentTestimonial 
                          ? 'bg-gradient-to-r from-yellow-400 to-yellow-600 scale-125' 
                          : isDarkMode ? 'bg-gray-600' : 'bg-gray-300'
                      }`}
                    ></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className={`py-24 relative ${
        isDarkMode 
          ? 'bg-gradient-to-b from-black to-gray-900' 
          : 'bg-gradient-to-b from-gray-50 to-white'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-20 transition-all duration-1000 ${isVisible.contact ? 'animate-fadeInUp' : 'opacity-0 translate-y-10'}`}>
            <h2 className="text-5xl md:text-6xl font-bold mb-6">
              Book Your <span className="bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">Session</span>
            </h2>
            <div className="w-32 h-1 bg-gradient-to-r from-yellow-400 to-yellow-600 mx-auto"></div>
          </div>

          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-16">
              {/* Contact Info */}
              <div className={`space-y-8 transition-all duration-1000 delay-200 ${isVisible.contact ? 'animate-slideInLeft' : 'opacity-0 -translate-x-10'}`}>
                <div>
                  <h3 className="text-3xl font-bold mb-6">Let's Create Magic Together</h3>
                  <p className={`text-lg leading-relaxed mb-8 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Ready to transform your look? I'd love to discuss your vision and create 
                    a stunning makeup experience tailored just for you. Book your consultation today!
                  </p>
                </div>

                <div className="space-y-4">
                  {[
                    { icon: <Mail className="w-5 h-5" />, label: 'Email:', value: 'amita.kushwah@makeupstudio.com', href: 'mailto:amita.kushwah@makeupstudio.com' },
                    { icon: <Phone className="w-5 h-5" />, label: 'Phone:', value: '+1 (555) 123-4567', href: 'tel:+15551234567' },
                    { icon: <MapPin className="w-5 h-5" />, label: 'Studio:', value: 'Downtown Beauty District', href: '#' },
                    { icon: <Clock className="w-5 h-5" />, label: 'Hours:', value: 'Mon-Sat: 9AM-7PM', href: '#' },
                  ].map((contact, index) => (
                    <a
                      key={index}
                      href={contact.href}
                      className={`flex items-center space-x-4 p-3 rounded-xl border transition-all duration-300 group hover:scale-102 ${
                        isDarkMode 
                          ? 'bg-gradient-to-r from-gray-800 to-gray-900 border-gray-700 hover:border-yellow-400/50' 
                          : 'bg-gradient-to-r from-white to-gray-50 border-gray-200 hover:border-yellow-400/50 shadow-lg'
                      }`}
                    >
                      <div className="w-10 h-10 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center text-black group-hover:scale-110 transition-transform duration-300">
                        {contact.icon}
                      </div>
                      <div className="flex-1">
                        <div className={`text-sm leading-tight ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                          <span className="font-semibold group-hover:text-yellow-400 transition-colors duration-300">{contact.label}</span>{' '}
                          <span>{contact.value}</span>
                        </div>
                      </div>
                    </a>
                  ))}
                </div>

                {/* Additional Information and Portfolio Image */}
                <div className="space-y-6 pt-8">
                  <button
                    onClick={() => scrollToSection('terms')}
                    className={`w-full px-6 py-3 border-2 rounded-xl font-semibold transition-all duration-300 hover:scale-105 ${
                      isDarkMode 
                        ? 'border-gray-600 text-gray-300 hover:border-yellow-400 hover:text-yellow-400' 
                        : 'border-gray-300 text-gray-700 hover:border-yellow-400 hover:text-yellow-600'
                    }`}
                  >
                    Terms & Conditions
                  </button>
                  
                  {/* Project Info Image */}
                  <div className="relative group">
                    <img
                      src="https://images.pexels.com/photos/3993212/pexels-photo-3993212.jpeg?auto=compress&cs=tinysrgb&w=800"
                      alt="Makeup Project Info"
                      className="w-full h-48 object-cover rounded-2xl shadow-lg group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent rounded-2xl"></div>
                    <div className="absolute bottom-4 left-4">
                      <h4 className="text-white font-semibold text-lg">Project Showcase</h4>
                      <p className="text-gray-200 text-sm">Professional makeup artistry portfolio</p>
                    </div>
                  </div>
                </div>

                {/* Social Links */}
                <div className="flex space-x-4 pt-8">
                  {[
                    { icon: <Instagram className="w-6 h-6" />, href: '#', label: 'Instagram' },
                    { 
                      icon: (
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                        </svg>
                      ), 
                      href: '#', 
                      label: 'Facebook' 
                    },
                    { 
                      icon: (
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                        </svg>
                      ), 
                      href: '#', 
                      label: 'YouTube' 
                    },
                    { 
                      icon: (
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.893 3.488"/>
                        </svg>
                      ), 
                      href: '#', 
                      label: 'WhatsApp' 
                    },
                  ].map((social, index) => (
                    <a
                      key={index}
                      href={social.href}
                      className={`w-16 h-16 border rounded-full flex items-center justify-center hover:border-yellow-400 hover:bg-gradient-to-r hover:from-yellow-400 hover:to-yellow-600 hover:text-black transition-all duration-300 transform hover:scale-110 group ${
                        isDarkMode 
                          ? 'bg-gradient-to-r from-gray-800 to-gray-900 border-gray-700 text-white' 
                          : 'bg-gradient-to-r from-white to-gray-50 border-gray-200 text-gray-800'
                      }`}
                      aria-label={social.label}
                    >
                      <span className="group-hover:scale-110 transition-transform duration-200">
                        {social.icon}
                      </span>
                    </a>
                  ))}
                </div>
              </div>

              {/* Contact Form */}
              <div className={`transition-all duration-1000 delay-400 ${isVisible.contact ? 'animate-slideInRight' : 'opacity-0 translate-x-10'}`}>
                <div className={`p-8 rounded-3xl border ${
                  isDarkMode 
                    ? 'bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700' 
                    : 'bg-gradient-to-br from-white to-gray-50 border-gray-200 shadow-lg'
                }`}>
                  <form className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="name" className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                          Name
                        </label>
                        <input
                          type="text"
                          id="name"
                          className={`w-full px-4 py-4 border rounded-xl focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-300 ${
                            isDarkMode 
                              ? 'bg-black/50 border-gray-600 text-white placeholder-gray-400' 
                              : 'bg-white border-gray-300 text-black placeholder-gray-500'
                          }`}
                          placeholder="Your Name"
                        />
                      </div>

                      <div>
                        <label htmlFor="email" className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                          Email
                        </label>
                        <input
                          type="email"
                          id="email"
                          className={`w-full px-4 py-4 border rounded-xl focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-300 ${
                            isDarkMode 
                              ? 'bg-black/50 border-gray-600 text-white placeholder-gray-400' 
                              : 'bg-white border-gray-300 text-black placeholder-gray-500'
                          }`}
                          placeholder="your@email.com"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="service" className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        Service Interested In
                      </label>
                      <select
                        id="service"
                        className={`w-full px-4 py-4 border rounded-xl focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-300 ${
                          isDarkMode 
                            ? 'bg-black/50 border-gray-600 text-white' 
                            : 'bg-white border-gray-300 text-black'
                        }`}
                      >
                        <option value="">Select a service</option>
                        <option value="bridal">Bridal Makeup</option>
                        <option value="special-event">Special Event</option>
                        <option value="editorial">Editorial/Photoshoot</option>
                        <option value="lessons">Makeup Lessons</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="date" className="block text-sm font-medium text-gray-300 mb-2">
                        Preferred Date
                      </label>
                      <input
                        type="date"
                        id="date"
                        className="w-full px-4 py-4 bg-black/50 border border-gray-600 rounded-xl focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-300 text-white"
                      />
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                        Tell me about your vision
                      </label>
                      <textarea
                        id="message"
                        rows={4}
                        className="w-full px-4 py-4 bg-black/50 border border-gray-600 rounded-xl focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-300 resize-none text-white placeholder-gray-400"
                        placeholder="Describe your event, style preferences, or any special requests..."
                      ></textarea>
                    </div>

                    <button
                      type="submit"
                      className="w-full px-8 py-4 bg-gradient-to-r from-yellow-400 to-yellow-600 text-black rounded-xl font-semibold hover:from-yellow-500 hover:to-yellow-700 transition-all duration-300 shadow-lg hover:shadow-yellow-400/25 hover:shadow-2xl transform hover:scale-105 group"
                    >
                      <span className="flex items-center justify-center space-x-2">
                        <span>Book Consultation</span>
                        <Calendar className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
                      </span>
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Terms & Conditions Section */}
      <section id="terms" className={`py-24 relative ${
        isDarkMode 
          ? 'bg-gradient-to-b from-gray-900 to-black' 
          : 'bg-gradient-to-b from-gray-50 to-white'
      }`}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Terms & <span className="bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">Conditions</span>
            </h2>
            <div className="w-32 h-1 bg-gradient-to-r from-yellow-400 to-yellow-600 mx-auto"></div>
          </div>

          <div className={`space-y-8 text-left ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            <div>
              <h3 className="text-2xl font-semibold mb-4 text-yellow-400">Booking & Payment</h3>
              <ul className="space-y-2 list-disc list-inside">
                <li>A 50% non-refundable deposit is required to secure your booking</li>
                <li>Final payment is due on the day of service</li>
                <li>Cancellations must be made 48 hours in advance for partial refund</li>
                <li>No-shows will forfeit the entire deposit</li>
              </ul>
            </div>

            <div>
              <h3 className="text-2xl font-semibold mb-4 text-yellow-400">Service Guidelines</h3>
              <ul className="space-y-2 list-disc list-inside">
                <li>Trial sessions are highly recommended for bridal services</li>
                <li>Please arrive with clean, moisturized skin</li>
                <li>Inform us of any allergies or skin sensitivities in advance</li>
                <li>Additional charges apply for services exceeding agreed time</li>
              </ul>
            </div>

            <div>
              <h3 className="text-2xl font-semibold mb-4 text-yellow-400">Photography & Usage</h3>
              <ul className="space-y-2 list-disc list-inside">
                <li>Photos may be taken for portfolio purposes unless declined</li>
                <li>Images may be used for marketing and social media promotion</li>
                <li>Client privacy and preferences are always respected</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      

      {/* Footer */}
      <footer className="bg-black border-t border-gray-800 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="text-2xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent mb-4">
              Amita Makeover
            </div>
            <p className="text-gray-400 mb-6">
              © 2024 Amita Kushwah. All rights reserved. Creating beauty, one face at a time.
            </p>
            <div className="flex justify-center space-x-6">
              {[
                { icon: <Instagram className="w-5 h-5" />, href: '#' },
                { 
                  icon: (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  ), 
                  href: '#' 
                },
                { 
                  icon: (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                    </svg>
                  ), 
                  href: '#' 
                },
                { 
                  icon: (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.893 3.488"/>
                    </svg>
                  ), 
                  href: '#' 
                },
              ].map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="text-gray-400 hover:text-yellow-400 transition-colors duration-200 transform hover:scale-110"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>

      {/* Fixed Contact Buttons */}
      <div className="fixed bottom-6 right-6 flex flex-col space-y-3 z-50">
        {/* Phone Button */}
        <a
          href="tel:+1234567890"
          className={`w-14 h-14 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 group ${
            isDarkMode 
              ? 'bg-gradient-to-r from-gray-800 to-gray-900 border border-gray-700 text-white hover:bg-green-600' 
              : 'bg-white border border-gray-200 text-gray-800 hover:bg-green-600 hover:text-white'
          }`}
          aria-label="Call Phone"
        >
          <Phone className="w-6 h-6 group-hover:scale-110 transition-transform duration-200" />
        </a>

        {/* WhatsApp Button */}
        <a
          href="https://wa.me/1234567890"
          target="_blank"
          rel="noopener noreferrer"
          className={`w-14 h-14 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 group ${
            isDarkMode 
              ? 'bg-gradient-to-r from-gray-800 to-gray-900 border border-gray-700 text-white hover:bg-green-500' 
              : 'bg-white border border-gray-200 text-gray-800 hover:bg-green-500 hover:text-white'
          }`}
          aria-label="WhatsApp"
        >
          <MessageCircle className="w-6 h-6 group-hover:scale-110 transition-transform duration-200" />
        </a>

        {/* Instagram Button */}
        <a
          href="https://instagram.com/amitamakeover"
          target="_blank"
          rel="noopener noreferrer"
          className={`w-14 h-14 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 group ${
            isDarkMode 
              ? 'bg-gradient-to-r from-gray-800 to-gray-900 border border-gray-700 text-white hover:bg-gradient-to-r hover:from-purple-600 hover:to-pink-600' 
              : 'bg-white border border-gray-200 text-gray-800 hover:bg-gradient-to-r hover:from-purple-600 hover:to-pink-600 hover:text-white'
          }`}
          aria-label="Instagram"
        >
          <Instagram className="w-6 h-6 group-hover:scale-110 transition-transform duration-200" />
        </a>
      </div>
    </div>
  );
}

export default App;