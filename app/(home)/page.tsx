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
import { CustomTitle } from "./_components/custom-title";
import { Error } from "./_components/error";

export default function Home() {
  const { data, isPending, error, refetch } = useQuery({
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
    <div className="space-y-8">
      {/* bannire */}
      <Banner banner={banner} />
      {/* les nouveautes */}
      <div className="">
        <CustomTitle><h5 className="">Découvrez nos nouveautés exclusives</h5></CustomTitle>
        <p className="my-3">
          Explorez notre collection de nouveautés exclusives, spécialement conçues pour répondre à vos besoins.
          Découvrez des produits innovants, uniques et de haute qualité,
          parfaits pour enrichir votre quotidien et sublimer votre expérience.
        </p>
        {isPending ? <ProductsSkeleton /> : null}
        {data ? <Products products={data.filter(object => object.isNew === true && object.visible === true).slice(0, 10)} /> : null}
        {error ?  <Error fn={refetch}/> : null }
      </div>
      {/* les produits phares */}
      <div className="my-6">
        <CustomTitle><h5 className="">Les produits phares à ne pas manquer</h5></CustomTitle>
        <p className="my-3">
          Découvrez nos produits phares incontournables, sélectionnés pour leur qualité exceptionnelle et
          leur grande popularité. Ne manquez pas ces best-sellers qui séduisent nos clients par leur fiabilité,
          leur design et leur performance supérieure.
        </p>
        {isPending ? <ProductsSkeleton /> : null}
        {data ? <Products products={data.filter(object => object.isFeatured === true && object.visible === true).slice(0, 10)} /> : null}
        {error ?  <Error fn={refetch}/> : null }
      </div>
      {/* le marketings */}
      <div className="space-y-4">
        <CustomTitle><h5 className="">Découvrez des Produits d’Exception pour Sublimer Votre Cuisine</h5></CustomTitle>
        <p>
          Offrez à votre cuisine une touche d'élégance avec nos produits d'exception. Alliant fonctionnalité,
          design et matériaux haut de gamme, ils sont idéaux pour transformer
          vos préparations en véritables œuvres d'art culinaires.
        </p>
        <div className="grid sm:grid-cols-2 gap-3 mx-auto md:w-[600px] lg:w-[700px] xl:w-[800px] sm:w-full">
          <Marketing object={marketingsData[0]} className="" />
          <Marketing object={marketingsData[1]} className="" />
        </div>
      </div>
    </div>

  );
}
