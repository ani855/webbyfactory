import Link from "next/link";
import type { Product, Category } from "@prisma/client";

type ProductWithCategory = Product & { category: Category };

export default function ProductCard({ product }: { product: ProductWithCategory }) {
  return (
    <Link
      href={`/products/${product.slug}`}
      className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-rose-50 flex flex-col"
    >
      {/* Image */}
      <div className="relative overflow-hidden aspect-square bg-rose-50">
        {product.imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-4xl">
            🌸
          </div>
        )}

        {/* Category badge */}
        <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-gray-700 text-xs font-semibold px-2.5 py-1 rounded-full">
          {product.category.name}
        </span>

        {product.featured && (
          <span className="absolute top-3 right-3 bg-rose-500 text-white text-xs font-semibold px-2.5 py-1 rounded-full">
            Popular
          </span>
        )}
      </div>

      {/* Info */}
      <div className="p-4 flex flex-col flex-1">
        <h3 className="font-semibold text-gray-900 text-base group-hover:text-rose-500 transition-colors line-clamp-1">
          {product.name}
        </h3>
        <p className="text-gray-500 text-sm mt-1 line-clamp-2 flex-1">
          {product.description}
        </p>

        {/* Color swatches */}
        {product.colors.length > 0 && (
          <div className="flex gap-1 mt-2">
            {product.colors.slice(0, 5).map((color) => (
              <span
                key={color}
                title={color}
                className="w-3 h-3 rounded-full border border-white shadow-sm bg-gray-200 text-[8px] flex items-center justify-center overflow-hidden"
              />
            ))}
            {product.colors.length > 5 && (
              <span className="text-xs text-gray-400 self-center">+{product.colors.length - 5}</span>
            )}
          </div>
        )}

        <div className="flex items-center justify-between mt-4">
          <p className="text-rose-500 font-bold text-lg">
            ${product.price.toFixed(2)}
          </p>
          <span className="bg-rose-50 hover:bg-rose-100 text-rose-600 text-xs font-semibold px-3 py-1.5 rounded-full transition-colors">
            View
          </span>
        </div>
      </div>
    </Link>
  );
}
