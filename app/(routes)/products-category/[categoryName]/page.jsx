import ProductList from "../../../_components/ProductList";
import GlobalApi from "../../../_utils/GlobalApi";
import TopCategoryList from "../_components/TopCategoryList";

async function ProductCategory({ params }) {

  const productList = await GlobalApi.getProductsByCategory(params.categoryName);
  const categoryList = await GlobalApi.getCategoryList();

  return (
    <div>
      <h2 className="p-4 bg-primary text-white font-bold text-3xl text-center">
        {decodeURIComponent(params.categoryName)}
      </h2>
      
      <TopCategoryList 
        categoryList={categoryList}
        selectedCategory={decodeURIComponent(params.categoryName)}
      />

      {productList && productList.length > 0 ? 
        (
          <div className="p-5 md:p-10">
            <ProductList productList={productList} />
          </div>
        )
        :
        (
          <div className="p-5 md:p-10">
            <span className="text-2xl font-medium">
              There are no products available in this category
            </span>
          </div>
        )
      }

    </div>
  )
}

export default ProductCategory;