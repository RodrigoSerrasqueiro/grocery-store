import CategoryList from "./_components/CategoryList";
import Footer from "./_components/Footer";
import ProductList from "./_components/ProductList";
import Slider from "./_components/Slider";
import GlobalApi from "./_utils/GlobalApi";
import Image from "next/image";

export default async function Home() {
  const sliderList = await GlobalApi.getSliders();
  const categoryList = await GlobalApi.getCategoryList();
  const productList = await GlobalApi.getAllProducts();

  return (
    <main className="px-4 p-10 sm:px-16">
      <div className="px-8 sm:px-0">
        <Slider sliderList={sliderList} />
      </div>
      <CategoryList categoryList={categoryList} />
      <ProductList productList={productList} />
      <Image
        src="https://media.licdn.com/dms/image/C5612AQEXgCuoPie5vw/article-cover_image-shrink_720_1280/0/1641311247080?e=2147483647&v=beta&t=1rn2_Yguc5Dp722bY7z68HXGcI9ClKNzDbIvgK8WSQ8"
        alt="banner"
        width={1000}
        height={300}
        className="w-full h-[400px] mt-5"
      />
      <Footer />
    </main>
  );
}
