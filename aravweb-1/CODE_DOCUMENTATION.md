# Code Documentation - Amita Makeover Portfolio Website

This document explains what each part of the code does and how you can modify different sections.

## 🎯 Project Overview
This is a professional makeup artist portfolio website for Amita Kushwah (branded as "Amita Makeover"). It's built with React and includes dark/light mode, animations, and contact integration.

## 📁 File Structure
```
client/src/
├── App.tsx          # Main website component (all sections)
├── index.css        # Global styles and animations
└── main.tsx         # App entry point

server/
├── index.ts         # Backend server setup
├── routes.ts        # API routes
└── storage.ts       # Data storage interface
```

## 🏗️ App.tsx Structure (Main Component)

### 1. **Imports & Setup** (Lines 1-10)
```typescript
import React, { useState, useEffect } from 'react';
import { ChevronDown, Mail, Phone, ... } from 'lucide-react';
```
- **What it does**: Imports React hooks and all the icons used throughout the website
- **To modify**: Add new icons here if you need them anywhere on the site

### 2. **State Management** (Lines 11-50)
```typescript
const [isMenuOpen, setIsMenuOpen] = useState(false);
const [activeSection, setActiveSection] = useState('home');
const [isDarkMode, setIsDarkMode] = useState(false);
const [isVisible, setIsVisible] = useState({...});
```
- **What it does**: 
  - `isMenuOpen`: Controls mobile menu open/close
  - `activeSection`: Tracks which section is currently active
  - `isDarkMode`: Controls dark/light theme
  - `isVisible`: Controls animations when sections come into view
- **To modify**: Change initial values (e.g., start in dark mode: `useState(true)`)

### 3. **Services Data** (Lines 51-117)
```typescript
const services = [
  {
    title: 'Bridal Makeup',
    price: 'Starting from $300',
    // ...
  }
];
```
- **What it does**: Defines all the services offered with prices and descriptions
- **To modify**: 
  - Change prices: Update the `price` field
  - Add services: Add new objects to the array
  - Change descriptions: Update `description` field

### 4. **Portfolio Data** (Lines 118-159)
```typescript
const portfolioItems = [
  {
    title: 'Royal Bridal Elegance',
    category: 'Bridal',
    description: 'Traditional bridal makeup...',
    image: 'https://images.pexels.com/...',
    featured: true
  }
];
```
- **What it does**: Defines portfolio gallery items
- **To modify**:
  - Change images: Replace `image` URLs with your own photos
  - Update titles/descriptions: Change `title` and `description`
  - Feature items: Set `featured: true` to show in main gallery

### 5. **Theme & Scroll Effects** (Lines 160-220)
```typescript
useEffect(() => {
  // Dark mode handling
  // Scroll animations
}, [isDarkMode]);
```
- **What it does**: Handles theme switching and scroll-based animations
- **To modify**: Generally leave this as-is unless you want different animation triggers

## 🎨 Website Sections

### **Navigation Bar** (Lines 221-320)
```typescript
<nav className={`fixed top-0 ...`}>
```
- **What it does**: Top navigation with logo and menu items
- **To modify**:
  - **Logo**: Change the crown icon or "Amita Makeover" text (lines 240-242)
  - **Menu items**: Update navigation links in the menu array
  - **Height**: Change `h-16` to adjust navbar height

### **Hero Section** (Lines 321-415)
```typescript
<section id="home" className="min-h-screen ...">
```
- **What it does**: Main landing section with large logo and title
- **To modify**:
  - **Main logo**: Update the circular logo design (lines 354-370)
  - **Title text**: Change "Professional Makeup Artist" (lines 373-379)
  - **Description**: Update the subtitle text (lines 381-386)
  - **Buttons**: Modify "View Portfolio" and "Book Consultation" buttons (lines 388-410)

### **About Section** (Lines 416-478)
```typescript
<section id="about" className={`py-24 ...`}>
```
- **What it does**: Personal introduction with photo and stats
- **To modify**:
  - **Name**: Update "Hi, I'm Amita Kushwah" (line 448-450)
  - **Photo**: Replace image URL (line 439)
  - **Description**: Change the two paragraphs (lines 451-457)
  - **Stats**: Update numbers and labels (lines 462-466)

### **Services Section** (Lines 479-533)
```typescript
<section id="services" className={`py-24 ...`}>
```
- **What it does**: Displays service cards with prices and features
- **To modify**: Edit the `services` array at the top of the file (lines 51-117)

### **Portfolio Section** (Lines 534-680)
```typescript
<section id="portfolio" className={`py-24 ...`}>
```
- **What it does**: Gallery of work with featured and additional items
- **To modify**: Edit the `portfolioItems` array (lines 118-159)

### **Testimonials Section** (Lines 681-703)
```typescript
<section id="testimonials" className={`py-24 ...`}>
```
- **What it does**: Client reviews and testimonials
- **To modify**: Update testimonial text and client names

### **Contact Section** (Lines 704-940)
```typescript
<section id="contact" className={`py-24 ...`}>
```
- **What it does**: Contact form and information
- **To modify**:
  - **Email**: Change email address (line 735)
  - **Phone**: Update phone number (line 736)
  - **Address**: Change studio location (line 737)
  - **Form**: Add/remove form fields

### **Footer** (Lines 988-1037)
```typescript
<footer className="bg-black ...">
```
- **What it does**: Bottom section with copyright and social links
- **To modify**:
  - **Copyright**: Update year and name (line 999)
  - **Social links**: Change social media URLs

### **Contact Buttons** (Lines 1039-1083)
```typescript
<div className="fixed bottom-6 right-6 ...">
```
- **What it does**: Fixed floating buttons for phone, WhatsApp, Instagram
- **To modify**:
  - **Phone number**: Change `tel:+1234567890` (line 1043)
  - **WhatsApp**: Update `https://wa.me/1234567890` (line 1056)
  - **Instagram**: Change Instagram URL (line 1074)

## 🎨 Styling & Colors

### **Main Colors**
- **Gold/Yellow**: `from-yellow-400 to-yellow-600` (brand color)
- **Dark theme**: `bg-black`, `bg-gray-900`
- **Light theme**: `bg-white`, `bg-gray-50`

### **To Change Colors**:
1. **Brand color**: Replace all instances of `yellow-400` and `yellow-600` with your preferred colors
2. **Dark mode**: Update `bg-black` and `bg-gray-900` values
3. **Light mode**: Update `bg-white` and `bg-gray-50` values

## 🔧 Common Modifications

### **Change Contact Information**:
1. Phone: Search for `tel:` and `+1234567890`
2. Email: Search for `mailto:` and update email addresses
3. WhatsApp: Search for `wa.me/` and update number
4. Instagram: Search for `instagram.com/` and update handle

### **Update Portfolio Images**:
1. Replace URLs in `portfolioItems` array (lines 118-159)
2. Make sure images are web-optimized (recommended: 800px wide)

### **Modify Services & Prices**:
1. Edit the `services` array (lines 51-117)
2. Update title, price, description, and features for each service

### **Change Theme Colors**:
1. Search for `yellow-400` and `yellow-600` throughout the file
2. Replace with your preferred Tailwind color classes

### **Update Personal Information**:
1. Name: Search for "Amita Kushwah" and "Amita Makeover"
2. Experience: Search for "8 years" in the about section
3. Stats: Update numbers in the stats array (lines 462-466)

## 🚀 Testing Your Changes

After making changes:
1. Save the file
2. The website will automatically refresh (hot reload)
3. Check both dark and light modes using the toggle button
4. Test on mobile devices using browser dev tools

## 📱 Responsive Design

The website is fully responsive and uses Tailwind CSS classes:
- `md:` - Medium screens and up (tablets)
- `lg:` - Large screens and up (desktops)
- No prefix - Mobile-first (phones)

## ⚠️ Important Notes

1. **Don't modify**: The React hooks and useEffect logic unless you're familiar with React
2. **Image URLs**: Use high-quality, web-optimized images
3. **Colors**: Stick to Tailwind CSS color classes for consistency
4. **Animations**: The animation classes are defined in `index.css`
5. **Contact buttons**: Fixed position buttons should remain in bottom-right corner

## 🛠️ Quick Reference for Changes

| What to Change | Where to Look | Line Numbers |
|---------------|---------------|--------------|
| Business name | Search "Amita" | Multiple |
| Contact info | Search "tel:", "mailto:", "wa.me" | 735-737, 1043-1074 |
| Services & prices | `services` array | 51-117 |
| Portfolio images | `portfolioItems` array | 118-159 |
| About text | About section | 448-457 |
| Brand colors | Search "yellow-400", "yellow-600" | Throughout |
| Social links | Footer and contact buttons | 1000-1083 |

This documentation should help you make most changes yourself. If you need help with more complex modifications, refer back to this guide!