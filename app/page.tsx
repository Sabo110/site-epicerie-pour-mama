import { Product } from "@/components/Product";
import { Products } from "@/components/Products";
import bb from "@/public/epiceriebaniere.png"

export default function Home() {
  return (
    <div className="max-w-[1280px] mx-auto lg:px-4">
      {/* <Product product={{name: 'produit prune seche a la mayonaise', price: 5000, image: bb}}/> */}
      <Products 
        products={[
          {name: 'produit prune seche a la mayonaise avec riz a la frombiyt de la youre ey jjeje', price: 5000, image: bb},
          {name: 'produit prune seche a la mayonaise', price: 5000, image: bb},
          {name: 'produit prune seche a la mayonaise', price: 5000, image: bb},
          {name: 'produit prune seche a la mayonaise', price: 5000, image: bb},
          {name: 'produit prune seche a la mayonaise', price: 5000, image: bb},
          {name: 'produit prune seche a la mayonaise', price: 5000, image: bb},
          {name: 'produit prune seche a la mayonaise', price: 5000, image: bb}
        ]}
      />
    </div>
      
  );
}
