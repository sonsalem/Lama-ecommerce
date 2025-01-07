import Add from "@/Components/Add";
import CustomizeProducts from "@/Components/CustomizeProducts";
import ProductImages from "@/Components/ProductImages";
import { WixCLientServer } from "@/lib/WixCLientServer";
import { notFound } from "next/navigation";

const SlugPage = async ({ params }: { params: { slug: string } }) => {
  const WixClient = await WixCLientServer();

  const { items } = await WixClient.products
    .queryProducts()
    .eq("slug", `${params.slug}`)
    .find();

  const product = items[0];

  if (!items[0]) {
    return notFound();
  }

  return (
    <div className="my-24 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-44 relative flex flex-col lg:flex-row gap-16">
      {/* IMG */}
      <div className="w-full lg:w-1/2 lg:sticky top-20 h-max">
        <ProductImages items={product.media?.items} />
      </div>
      {/* TEXTS */}
      <div className="w-full lg:w-1/2 flex flex-col gap-6">
        <div className="text-4xl font-medium">{product.name}</div>
        <p className="text-gray-500">{product.description}</p>
        <div className="h-[2px] bg-gray-100" />
        <div className="flex items-center gap-4">
          {product.price?.discountedPrice === product.price?.price ? (
            <h3 className="font-medium text-2xl">${product.price?.price}</h3>
          ) : (
            <>
              <h3 className="text-gray-500  text-xl line-through">
                ${product.price?.price}
              </h3>
              <h2 className="font-medium text-2xl">
                ${product.price?.discountedPrice}
              </h2>
            </>
          )}
        </div>
        <div className="h-[2px] bg-gray-100" />
        {product.variants && product.productOptions ? (
          <CustomizeProducts
            productId={product._id}
            variants={product.variants}
            productOptions={product.productOptions}
          />
        ) : (
          <Add
            productId={product._id}
            variantId="00000000-000000-000000-000000000001"
            stockNumber={product.stock?.quantity || 0}
          />
        )}
        <div className="h-[2px] bg-gray-100" />
        {product.additionalInfoSections?.map((section: any) => (
          <div className="text-sm mb-4">
            <h4 className="font-medium mb-4">{section.title}</h4>
            <p>{section.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SlugPage;
