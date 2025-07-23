"use client"

import { useState } from "react"
import { useAuth } from "@/lib/simple-backend-auth"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { CompanyLogo } from "@/components/company-logo"

export function Navbar() {
  const { user, logout } = useAuth()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <nav className="bg-gradient-to-r from-blue-800 to-blue-600 text-white shadow-lg sticky top-0 z-50 backdrop-blur-sm">
      <div className="container mx-auto px-6 py-3 flex justify-between items-center">
        <div className="flex items-center space-x-4 animate-slide-in">
          <CompanyLogo size="md" />
        </div>

        <div className="hidden md:flex items-center space-x-8">
          <Link href="/" className="hover:text-blue-200 smooth-transition navbar-item">
            Beranda
          </Link>
          <a href="#about" className="hover:text-blue-200 smooth-transition navbar-item">
            Tentang
          </a>
          <a href="#services" className="hover:text-blue-200 smooth-transition navbar-item">
            Layanan Fumigasi
          </a>
          <a href="#certifications" className="hover:text-blue-200 smooth-transition navbar-item">
            Sertifikat
          </a>

          {user ? (
            <div className="flex items-center space-x-4 animate-fade-in">
              <Link
                href={user.role === "admin" ? "/admin" : "/dashboard"}
                className="hover:text-blue-200 smooth-transition navbar-item"
              >
                Dashboard
              </Link>
              <span className="text-sm">Hi, {user.name}</span>
              <Button onClick={logout} variant="outline" size="sm" className="bg-white text-blue-600 hover:bg-blue-50">
                Logout
              </Button>
            </div>
          ) : (
            <div className="animate-scale-in">
              <Link href="/login">
                <Button variant="outline" className="bg-white text-blue-600 hover:bg-blue-50">
                  Login Portal
                </Button>
              </Link>
            </div>
          )}
        </div>

        <button
          className="md:hidden focus:outline-none smooth-transition hover:scale-110"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden bg-blue-900 px-6 py-3 animate-slide-in">
          <Link href="/" className="block py-2 hover:text-blue-200 smooth-transition">
            Beranda
          </Link>
          <a href="#about" className="block py-2 hover:text-blue-200 smooth-transition">
            Tentang
          </a>
          <a href="#services" className="block py-2 hover:text-blue-200 smooth-transition">
            Layanan Fumigasi
          </a>
          <a href="#certifications" className="block py-2 hover:text-blue-200 smooth-transition">
            Sertifikat
          </a>

          {user ? (
            <div className="mt-2">
              <Link
                href={user.role === "admin" ? "/admin" : "/dashboard"}
                className="block py-2 hover:text-blue-200 smooth-transition"
              >
                Dashboard
              </Link>
              <Button onClick={logout} className="w-full mt-2 bg-white text-blue-600 hover:bg-blue-50">
                Logout
              </Button>
            </div>
          ) : (
            <Link href="/login" className="block mt-2">
              <Button className="w-full bg-white text-blue-600 hover:bg-blue-50">Login Portal</Button>
            </Link>
          )}
        </div>
      )}
    </nav>
  )
}
