import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { createPageUrl } from "./utils";
import { base44 } from "@/api/base44Client";
import { 
  Home, User, Briefcase, FileText, MessageSquare, 
  Settings, Menu, X, Sparkles, FileCode, Brain,
  LogOut, ChevronRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

export default function Layout({ children, currentPageName }) {
  const [user, setUser] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const loadUser = async () => {
      try {
        const isAuth = await base44.auth.isAuthenticated();
        if (isAuth) {
          const userData = await base44.auth.me();
          setUser(userData);
        }
      } catch (e) {
        console.log("Not logged in");
      }
    };
    loadUser();
  }, []);

  const publicPages = ["Home", "Portfolio", "Blog", "Contact", "ProjectDetail", "BlogDetail"];
  const isPublicPage = publicPages.includes(currentPageName);
  
  const navItems = [
    { name: "Home", icon: Home, href: createPageUrl("Home") },
    { name: "Portfolio", icon: Briefcase, href: createPageUrl("Portfolio") },
    { name: "Blog", icon: FileText, href: createPageUrl("Blog") },
    { name: "Contact", icon: MessageSquare, href: createPageUrl("Contact") },
  ];

  const aiToolsItems = [
    { name: "AI Chat", icon: Brain, href: createPageUrl("AIChat") },
    { name: "PDF Analyzer", icon: FileCode, href: createPageUrl("PDFAnalyzer") },
    { name: "Code Generator", icon: Sparkles, href: createPageUrl("CodeGenerator") },
  ];

  const dashboardItems = [
    { name: "Dashboard", icon: User, href: createPageUrl("Dashboard") },
    { name: "Settings", icon: Settings, href: createPageUrl("Settings") },
  ];

  const isActive = (pageName) => currentPageName === pageName;

  // Public pages with minimal nav
  if (isPublicPage && !user) {
    return (
      <div className="min-h-screen bg-[#0a0e27] text-white">
        <style>{`
          :root {
            --background: 221 47% 9%;
            --foreground: 0 0% 98%;
            --card: 221 39% 11%;
            --card-foreground: 0 0% 98%;
            --primary: 189 94% 43%;
            --primary-foreground: 221 47% 9%;
            --muted: 221 39% 15%;
            --muted-foreground: 0 0% 63.9%;
            --accent: 189 94% 43%;
            --accent-foreground: 221 47% 9%;
            --border: 221 39% 20%;
          }
        `}</style>
        
        {/* Floating Nav */}
        <nav className="fixed top-0 left-0 right-0 z-50 px-4 py-4">
          <div className="max-w-6xl mx-auto">
            <div className="bg-[#0f1535]/90 backdrop-blur-xl border border-cyan-500/20 rounded-2xl px-6 py-3 flex items-center justify-between shadow-lg shadow-cyan-500/5">
              <Link to={createPageUrl("Home")} className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-cyan-600 flex items-center justify-center shadow-lg shadow-cyan-500/30">
                  <Sparkles className="w-4 h-4 text-[#0a0e27]" />
                </div>
                <span className="font-semibold text-lg">GenXCode</span>
              </Link>