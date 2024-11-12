import { BannerImage } from "@/components/BannerImage";
import imf from "@/public/epiceriebaniere.png"

export default function Home() {
  return (
    <div className="h-[400px] w-[900px] mx-auto">
      <BannerImage image={imf} />
      </div>
  );
}
