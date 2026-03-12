import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-stone-900 text-stone-400 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <span className="text-2xl">🌸</span>
              <span className="font-bold text-xl text-white tracking-tight">
                Petal <span className="text-rose-400">&amp; Co</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed max-w-xs">
              Hand-crafted floral arrangements made with love. Fresh flowers sourced daily for every occasion.
            </p>
            <div className="flex gap-4 mt-5">
              <span className="text-xs text-stone-500">📍 123 Garden Street</span>
              <span className="text-xs text-stone-500">📞 (555) 123-4567</span>
            </div>
          </div>

          <div>
            <h3 className="text-white text-sm font-semibold mb-4 uppercase tracking-wider">Shop</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/products?category=bouquets" className="hover:text-white transition-colors">Bouquets</Link></li>
              <li><Link href="/products?category=plants" className="hover:text-white transition-colors">Plants</Link></li>
              <li><Link href="/products?category=gift-sets" className="hover:text-white transition-colors">Gift Sets</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white text-sm font-semibold mb-4 uppercase tracking-wider">Info</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="#" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Delivery Info</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Care Guide</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-stone-800 mt-10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs">
          <p>© {new Date().getFullYear()} Petal &amp; Co. All rights reserved.</p>
          <p>Fresh flowers, delivered with love 🌷</p>
        </div>
      </div>
    </footer>
  );
}
