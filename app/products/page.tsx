import { prisma } from "@/lib/prisma";
import ProductCard from "@/components/ProductCard";
import Link from "next/link";
import type { Product, Category } from "@prisma/client";

type ProductWithCategory = Product & { category: Category };

interface ProductsPageProps {
  searchParams: Promise<{ category?: string; search?: string }>;
}

export const dynamic = "force-dynamic";

async function getProducts(categorySlug?: string, search?: string) {
  return prisma.product.findMany({
    where: {
      inStock: true,
      ...(categorySlug && {
        category: { slug: categorySlug },
      }),
      ...(search && {
        OR: [
          { name: { contains: search, mode: "insensitive" } },
          { description: { contains: search, mode: "insensitive" } },
        ],
      }),
    },
    include: { category: true },
    orderBy: [{ featured: "desc" }, { createdAt: "desc" }],
  });
}

async function getCategoryName(slug: string) {
  return prisma.category.findUnique({ where: { slug }, select: { name: true, description: true } });
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const params = await searchParams;
  const { category, search } = params;

  let products: ProductWithCategory[] = [];
  let activeCategory: { name: string; description: string | null } | null = null;

  try {
    [products, activeCategory] = await Promise.all([
      getProducts(category, search),
      category ? getCategoryName(category) : Promise.resolve(null),
    ]);
  } catch (err) {
    console.error("DB fetch error on products page:", err);
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Page header */}
      <div className="mb-10">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-2">
          {activeCategory ? activeCategory.name : "All Flowers"}
        </h1>
        <p className="text-gray-500 text-lg">
          {activeCategory
            ? activeCategory.description
            : "Browse our full range of fresh flowers and arrangements"}
        </p>
      </div>

      {/* Search bar */}
      <form className="mb-8 max-w-lg" method="get" action="/products">
        {category && <input type="hidden" name="category" value={category} />}
        <div className="relative">
          <svg
            className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            name="search"
            defaultValue={search}
            placeholder="Search flowers..."
            className="w-full pl-11 pr-4 py-3 bg-white border border-rose-100 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-rose-300 focus:border-transparent"
          />
        </div>
      </form>

      {/* Results count */}
      <p className="text-sm text-gray-400 mb-6">
        {products.length} arrangement{products.length !== 1 ? "s" : ""} available
        {search && ` for "${search}"`}
      </p>

      {products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
          {products.map((product: ProductWithCategory) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <p className="text-6xl mb-4">🌸</p>
          <h3 className="font-semibold text-gray-700 text-lg mb-2">No flowers found</h3>
          <p className="text-gray-400 text-sm mb-6">Try adjusting your search or browse all flowers.</p>
          <Link href="/products" className="text-rose-500 font-medium hover:underline">Clear filters</Link>
        </div>
      )}
    </div>
  );
}
