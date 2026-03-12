import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import type { Product, Category } from "@prisma/client";

type ProductWithCategory = Product & { category: Category };

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export const dynamic = "force-dynamic";

async function getProduct(slug: string) {
  return prisma.product.findUnique({
    where: { slug },
    include: { category: true },
  });
}

async function getRelatedProducts(categoryId: string, excludeSlug: string) {
  return prisma.product.findMany({
    where: { categoryId, NOT: { slug: excludeSlug }, inStock: true },
    include: { category: true },
    take: 4,
  });
}

export async function generateMetadata({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await getProduct(slug);
  if (!product) return { title: "Not Found" };
  return {
    title: `${product.name} | Petal & Co`,
    description: product.description,
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await getProduct(slug);
  if (!product) notFound();

  const relatedProducts = await getRelatedProducts(product.categoryId, slug);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-gray-400 mb-8">
        <Link href="/" className="hover:text-rose-500 transition-colors">Home</Link>
        <span>/</span>
        <Link href="/products" className="hover:text-rose-500 transition-colors">Flowers</Link>
        <span>/</span>
        <Link href={`/products?category=${product.category.slug}`} className="hover:text-rose-500 transition-colors">
          {product.category.name}
        </Link>
        <span>/</span>
        <span className="text-gray-700 font-medium">{product.name}</span>
      </nav>

      {/* Main product section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
        {/* Image */}
        <div className="space-y-4">
          <div className="relative rounded-3xl overflow-hidden bg-rose-50 aspect-square shadow-sm">
            {product.imageUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-8xl">
                🌸
              </div>
            )}
            {product.featured && (
              <span className="absolute top-4 left-4 bg-rose-500 text-white text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider">
                Popular
              </span>
            )}
          </div>

          {product.images.length > 1 && (
            <div className="flex gap-3">
              {product.images.map((img: string, i: number) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  key={i}
                  src={img}
                  alt={`${product.name} view ${i + 1}`}
                  className="w-20 h-20 object-cover rounded-2xl border-2 border-transparent cursor-pointer hover:border-rose-400 transition-colors"
                />
              ))}
            </div>
          )}
        </div>

        {/* Product info */}
        <div className="flex flex-col">
          <Link
            href={`/products?category=${product.category.slug}`}
            className="inline-block bg-rose-50 text-rose-500 text-xs font-semibold px-3 py-1 rounded-full mb-4 hover:bg-rose-100 transition-colors self-start"
          >
            {product.category.name}
          </Link>

          <h1 className="text-4xl font-extrabold text-gray-900 mb-3">
            {product.name}
          </h1>

          <div className="flex items-baseline gap-3 mb-6">
            <span className="text-3xl font-bold text-rose-500">
              ${product.price.toFixed(2)}
            </span>
            {product.inStock ? (
              <span className="text-green-600 text-sm font-medium bg-green-50 px-2.5 py-1 rounded-full">
                In Stock
              </span>
            ) : (
              <span className="text-gray-400 text-sm bg-gray-100 px-2.5 py-1 rounded-full">
                Out of Stock
              </span>
            )}
          </div>

          <p className="text-gray-600 leading-relaxed text-base mb-8">
            {product.description}
          </p>

          {/* Care info */}
          {product.materials.length > 0 && (
            <div className="bg-amber-50 border border-amber-100 rounded-2xl px-4 py-4 mb-8">
              <h3 className="text-sm font-bold text-amber-900 mb-2">🌿 Care Instructions</h3>
              <ul className="space-y-1">
                {product.materials.map((tip: string) => (
                  <li key={tip} className="flex items-start gap-2 text-sm text-amber-800">
                    <span className="mt-0.5">•</span>
                    {tip}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="flex-1" />

          {/* CTA */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button className="flex-1 bg-rose-500 hover:bg-rose-600 text-white font-bold py-4 px-6 rounded-full text-base transition-colors shadow-lg shadow-rose-200">
              Add to Cart 🛒
            </button>
          </div>

        </div>
      </div>

      {/* Related products */}
      {relatedProducts.length > 0 && (
        <section>
          <div className="flex items-end justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-900">
              More {product.category.name}
            </h2>
            <Link
              href={`/products?category=${product.category.slug}`}
              className="text-rose-500 hover:text-rose-600 text-sm font-semibold"
            >
              View all →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((p: ProductWithCategory) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
