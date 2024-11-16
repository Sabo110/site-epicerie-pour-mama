"use client"

import { BannerImage } from "@/components/BannerImage";
import { SearchBar } from "@/components/SearchBar";
import banner from "@/public/epiceriebaniere.png"
import { getAllP } from "@/actions/product";
import { useQuery } from "@tanstack/react-query";
import { Products } from "@/components/Products";
import { Marketing } from "@/components/Marketing";
import globe from "@/public/globe-terrestre.png"
import vert from "@/public/the-vert.png"

export default function Home() {
  const {data, isPending, error} = useQuery({
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
      <div className="flex items-center justify-between gap-4">
        <h1>Logo</h1>
        <SearchBar className="max-w-[300px] w-full"/>
      </div>
      <div className="h-[350px] mt-4">
        <BannerImage image={banner}/>
      </div>
      <div>
          <h1>Les nouveautes</h1>
          {data ? <Products products={data.filter(object => object.isNew === true).slice(0, 10)}/> : null}
      </div>
      <div>
        <h1>Nos produits phares</h1>
        {data ? <Products products={data.filter(object => object.isFeatured === true).slice(0, 10)}/> : null}
      </div>
      <div className="grid grid-cols-2 gap-6 w-3/4 mx-auto">
          {marketingsData.map((object, index) => (
            <Marketing key={index} object={object}/>
          ))}
      </div>
    </div>
      
  );
}
