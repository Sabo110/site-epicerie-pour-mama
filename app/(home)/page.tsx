"use client"

import banner from "@/public/bannire.jpg"
import { getAllP } from "@/actions/product";
import { useQuery } from "@tanstack/react-query";
import { Products } from "@/components/Products";
import { Marketing } from "@/app/(home)/_components/Marketing";
import globe from "@/public/globe-terrestre.png"
import vert from "@/public/the-vert.png"
import { Banner } from "./_components/Banner";
import { ProductsSkeleton } from "./_components/products-skeleton";

export default function Home() {
  const { data, isPending, error } = useQuery({
    queryKey: ['products'],
    queryFn: getAllP
  })
  const marketingsData = [
    {
      title: "Découvrez l'Essence des Saveurs Authentiques",
      text: "Découvrez Épicerie Vivi, où chaque produit est choisi avec soin pour offrir une expérience gustative unique. Nos sélections de qualité mettent en avant des ingrédients authentiques et naturels, parfaits pour sublimer vos recettes.",
      icon: vert
    },
    {
      title: "L'Épicerie Fine : Un Voyage Culinaire à Travers le Monde",
      text: "embarquez pour un voyage culinaire à travers des saveurs venues des quatre coins du monde. Nos épices et produits rares révèlent l’histoire et la richesse des cultures locales, pour une cuisine aux saveurs inoubliables.",
      icon: globe
    }
  ]
  return (
    <div>
      {/* bannire */}
      <Banner banner={banner} />
      {/* les nouveautes */}
      <div className="">
        <h4 className="">Découvrez nos nouveautés exclusives</h4>
        {isPending ? <ProductsSkeleton /> : null}
        {data ? <Products products={data.filter(object => object.isNew === true).slice(0, 10)} /> : null}
      </div>
      {/* les produits phares */}
      <div>
        <h4 className="">Les produits phares à ne pas manquer</h4>
        {isPending ? <ProductsSkeleton /> : null}
        {data ? <Products products={data.filter(object => object.isFeatured === true).slice(0, 10)} /> : null}
      </div>
      {/* le marketings */}
      <div>
        <h4 className="">Découvrez des Produits d’Exception pour Sublimer Votre Cuisine</h4>
        <div className="grid sm:grid-cols-2 gap-3 mx-auto md:w-[600px] lg:w-[700px] xl:w-[800px] sm:w-full">
          <Marketing object={marketingsData[0]} className="" />
          <Marketing object={marketingsData[1]} className="" />
        </div>
      </div>
    </div>

  );
}
