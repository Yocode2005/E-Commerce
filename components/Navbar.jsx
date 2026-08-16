"use client";
import { PackageIcon, Search, ShoppingCart, Menu, Home, Store, Info, MessageCircle, LogIn } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useUser, useClerk, UserButton, Show } from "@clerk/nextjs";
import axios from "axios";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const { user } = useUser();
  const { openSignIn } = useClerk();
  const router = useRouter();
  const cartCount = useSelector((state) => state.cart.total);

  const [isClient, setIsClient] = useState(false);
  const [search, setSearch] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    const delayDebounce = setTimeout(async () => {
      if (search.length > 1) {
        try {
          const { data } = await axios.get(`/api/products/search?query=${search}`);
          setSuggestions(data.results);
        } catch (err) {
          console.error(err);
        }
      } else {
        setSuggestions([]);
      }
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [search]);

  const handleSearch = (e) => {
    e.preventDefault();
    router.push(`/shop?search=${search}`);
    setSuggestions([]);
  };

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-xl bg-white/80 border-b border-slate-200/60 shadow-sm">
      <div className="mx-6">
        <div className="flex items-center justify-between max-w-6xl mx-auto py-3">

          {/* Logo */}
          <Link href="/" className="relative text-3xl sm:text-4xl font-semibold tracking-tight text-slate-800">
            <span className="text-emerald-600">go</span>cart
            <span className="text-emerald-600 text-4xl sm:text-5xl">.</span>

            <Show when={{ plan: "plus" }}>
              <p className="absolute text-[12px] font-semibold -top-1 -right-6 sm:-right-8 px-2 sm:px-3 rounded-full text-white bg-gradient-to-r from-emerald-500 to-green-600 shadow-md">
                plus
              </p>
            </Show>
          </Link>

          {/* Desktop */}
          <div className="hidden sm:flex items-center gap-8 text-[15px] font-medium text-slate-600 relative">

            {["Home", "Shop", "About", "Contact"].map((item) => (
              <Link
                key={item}
                href={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                className="relative group transition-colors hover:text-emerald-600"
              >
                {item}
                <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-emerald-500 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}

            {/* Search */}
            <form
              onSubmit={handleSearch}
              className="hidden xl:flex items-center w-64 text-sm gap-3 bg-slate-100/70 backdrop-blur-md px-5 py-3 rounded-full border border-slate-200 focus-within:ring-2 focus-within:ring-emerald-500 transition-all relative"
            >
              <Search size={18} className="text-slate-500" />
              <input
                className="w-full bg-transparent outline-none placeholder-slate-400"
                type="text"
                placeholder="Search products"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />

              {suggestions.length > 0 && (
                <div className="absolute top-14 left-0 w-full bg-white shadow-xl rounded-2xl z-50 border border-slate-200 overflow-hidden">
                  {suggestions.map((item) => (
                    <div
                      key={item.id}
                      className="px-4 py-3 hover:bg-slate-50 cursor-pointer text-sm transition-colors"
                      onClick={() => {
                        router.push(`/shop?search=${item.name}`);
                        setSuggestions([]);
                        setSearch(item.name);
                      }}
                    >
                      <span className="font-medium">{item.name}</span>
                      <span className="text-slate-400 ml-2">₹{item.price}</span>
                    </div>
                  ))}
                </div>
              )}
            </form>

            {/* Cart */}
            <Link
              href="/cart"
              className="relative flex items-center gap-2 hover:text-emerald-600 transition-colors"
            >
              <ShoppingCart size={20} />
              Cart
              <span className="absolute -top-2 -right-3 text-[10px] font-semibold text-white bg-emerald-600 px-1.5 py-0.5 rounded-full shadow">
                {cartCount}
              </span>
            </Link>

            {/* Auth */}
            {!user ? (
              <Button
                onClick={openSignIn}
                className="px-8 py-2 bg-gradient-to-r from-emerald-600 to-green-600 hover:opacity-90 text-white rounded-full shadow-md hover:shadow-lg transition-all"
              >
                Login
              </Button>
            ) : (
              <UserButton>
                <UserButton.MenuItems>
                  <UserButton.Action
                    labelIcon={<PackageIcon size={16} />}
                    label="My Orders"
                    onClick={() => router.push("/orders")}
                  />
                </UserButton.MenuItems>
              </UserButton>
            )}
          </div>

          {/* Mobile */}
          <div className="sm:hidden flex items-center gap-3">

            <form
              onSubmit={handleSearch}
              className="flex items-center w-[130px] text-xs gap-2 bg-slate-100/70 px-3 py-2 rounded-full border border-slate-200 relative"
            >
              <Search size={16} className="text-slate-500" />
              <input
                className="w-full bg-transparent outline-none placeholder-slate-400"
                type="text"
                placeholder="Search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </form>

            {isClient && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="p-2 hover:bg-emerald-50 rounded-full">
                    <Menu size={22} />
                  </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent
                  align="end"
                  className="w-56 bg-white/95 backdrop-blur-xl border border-slate-200 shadow-xl rounded-2xl"
                >
                  <DropdownMenuLabel className="font-semibold text-emerald-600 px-4 py-3">
                    Navigation
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />

                  {[{ href: "/", label: "Home", icon: Home },
                    { href: "/shop", label: "Shop", icon: Store },
                    { href: "/about", label: "About", icon: Info },
                    { href: "/contact", label: "Contact", icon: MessageCircle }
                  ].map(({ href, label, icon: Icon }) => (
                    <DropdownMenuItem key={label} asChild>
                      <Link
                        href={href}
                        className="flex items-center gap-3 px-4 py-3 hover:bg-emerald-50 transition-colors"
                      >
                        <Icon size={18} className="text-emerald-600" />
                        <span className="font-medium">{label}</span>
                      </Link>
                    </DropdownMenuItem>
                  ))}

                  <DropdownMenuSeparator />

                  <DropdownMenuItem asChild>
                    <Link
                      href="/cart"
                      className="flex items-center gap-3 px-4 py-3 hover:bg-emerald-50 relative"
                    >
                      <ShoppingCart size={18} className="text-emerald-600" />
                      <span className="font-medium">Cart ({cartCount})</span>
                    </Link>
                  </DropdownMenuItem>

                  <DropdownMenuSeparator />

                  {!user ? (
                    <DropdownMenuItem
                      onClick={openSignIn}
                      className="flex items-center gap-3 px-4 py-3 hover:bg-emerald-50"
                    >
                      <LogIn size={18} className="text-emerald-600" />
                      <span className="font-medium">Login</span>
                    </DropdownMenuItem>
                  ) : (
                    <div className="px-2 py-2">
                      <UserButton />
                    </div>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;