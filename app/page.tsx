import { Product } from "@/components/Product";
import bb from "@/public/epiceriebaniere.png"

export default function Home() {
  return (
    <div className="p-4">
      <Product product={{name: 'produit prune seche a la mayonaise', price: 5000, image: bb}}/>
    </div>
      
  );
}
