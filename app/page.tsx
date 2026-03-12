import Link from "next/link";
import { prisma } from "@/lib/prisma";
import ProductCard from "@/components/ProductCard";
import type { Category, Product } from "@prisma/client";

type ProductWithCategory = Product & { category: Category };

export const dynamic = "force-dynamic";

async function getFeaturedProducts() {
  return prisma.product.findMany({
    where: { featured: true, inStock: true },
    include: { category: true },
    take: 4,
  });
}

async function getCategories() {
  return prisma.category.findMany({ take: 4 });
}

export default async function HomePage() {
  let featuredProducts: ProductWithCategory[] = [];
  let categories: Category[] = [];

  try {
    [featuredProducts, categories] = await Promise.all([
      getFeaturedProducts(),
      getCategories(),
    ]);
  } catch (err) {
    console.error("DB fetch error on homepage:", err);
  }

  return (
    <div>
      {/* Hero */}
      <section className="bg-[#fffbf7] px-4 pt-8 sm:pt-12">
        <div className="max-w-7xl mx-auto rounded-3xl overflow-hidden border border-rose-100 bg-white shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-2 items-stretch">
            <div className="relative min-h-[260px] sm:min-h-[340px] lg:min-h-[460px]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.unsplash.com/photo-1591886960571-74d43a9d4166?w=1400"
                alt="Yellow lily flower"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/10 via-transparent to-transparent" />
            </div>

            <div className="bg-gradient-to-br from-[#fff9f3] to-rose-50/60 px-6 sm:px-10 lg:px-12 py-10 lg:py-12 flex flex-col justify-center">
              <span className="inline-block w-fit bg-yellow-100 text-yellow-700 text-xs font-semibold px-3 py-1 rounded-full mb-4 uppercase tracking-wider">
                Fresh · Local · Handcrafted
              </span>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 leading-tight mb-4">
                Flowers That <span className="text-rose-500">Say Everything</span>
              </h1>
              <p className="text-gray-600 text-base sm:text-lg leading-relaxed mb-7 max-w-md">
                Hand-arranged bouquets for birthdays, romance, and everyday moments. Delivered fresh with care.
              </p>

              <div className="flex flex-wrap gap-2.5 text-sm text-gray-600">
                {["🚚 Same-day delivery", "🌿 Fresh daily", "⭐ 500+ happy customers"].map((item) => (
                  <span key={item} className="bg-white border border-rose-100 px-3 py-1.5 rounded-full">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-rose-500 font-semibold text-sm uppercase tracking-wider mb-2">
              Browse by Type
            </p>
            <h2 className="text-3xl font-bold text-gray-900">What are you looking for?</h2>
          </div>
          <Link href="/products" className="text-rose-500 hover:text-rose-600 text-sm font-semibold hidden sm:block">
            View all →
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {categories.map((cat: Category) => (
            <Link
              key={cat.id}
              href={`/products?category=${cat.slug}`}
              className="group relative overflow-hidden rounded-2xl aspect-square bg-rose-50 shadow-sm hover:shadow-lg transition-all duration-300"
            >
              {cat.imageUrl && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={cat.imageUrl}
                  alt={cat.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <h3 className="text-white font-bold text-lg">{cat.name}</h3>
                <p className="text-rose-200 text-xs mt-0.5">Shop now →</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      {featuredProducts.length > 0 && (
        <section className="bg-rose-50/50 py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-end justify-between mb-10">
              <div>
                <p className="text-rose-500 font-semibold text-sm uppercase tracking-wider mb-2">
                  Customer Favourites
                </p>
                <h2 className="text-3xl font-bold text-gray-900">Most Popular</h2>
              </div>
              <Link href="/products" className="text-rose-500 hover:text-rose-600 text-sm font-semibold hidden sm:block">
                View all →
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.map((product: ProductWithCategory) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Why us */}
      <section className="bg-white py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Why Choose Petal &amp; Co?</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { emoji: "🌷", title: "Always Fresh", desc: "We source flowers daily from local growers. Every arrangement is made to order." },
              { emoji: "🚚", title: "Same-Day Delivery", desc: "Order before 12pm for guaranteed same-day delivery to your door." },
              { emoji: "🎨", title: "Custom Arrangements", desc: "Tell us your colours, occasion, and budget — we'll create something perfect." },
            ].map((item) => (
              <div key={item.title} className="text-center p-6 rounded-2xl bg-rose-50/60">
                <span className="text-4xl block mb-4">{item.emoji}</span>
                <h3 className="font-bold text-gray-900 text-lg mb-2">{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="bg-rose-500 py-16 px-4 mx-4 sm:mx-8 lg:mx-auto max-w-7xl rounded-3xl mb-20 mt-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-white mb-4">
            Make someone&apos;s day 🌸
          </h2>
          <p className="text-rose-100 mb-8 text-lg">
            Beautiful arrangements starting from just $24.99
          </p>
          <Link
            href="/products"
            className="bg-white hover:bg-rose-50 text-rose-500 font-bold px-8 py-4 rounded-full text-lg transition-colors"
          >
            Shop Now
          </Link>
        </div>
      </section>
    </div>
  );
}
