import { useEffect, useMemo, memo } from "react";
import { useParams } from "react-router-dom";
import Product from "../Product/Product.jsx";
import LeftSidebar from "../LeftSidebar/LeftSidebar.jsx";
import { useIntl } from "react-intl";
import { useLanguage } from "../../context/LanguageContext/LanguageContext.jsx";
import TopSidebar from "../TopSidebar/TopSidebar.jsx";
import { selectCategories } from "../../redux/slices/categoriesSlice/categoriesSelectors.js";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductsByCategory } from "../../redux/slices/productsSlice/productsSlice.js";
import {
  selectProductsByCategory,
  selectProductsError,
  selectProductsLoading,
} from "../../redux/slices/productsSlice/productsSelectors.js";


const ProductSkeleton = () => (
  <li
    className="section_01__promotions-item animate-pulse"
    style={{
      width: "270px",
      padding: "30px",
      background: "var(--color-white)",
      border: "1px solid rgba(0, 0, 0, 0.1)",
      display: "flex",
      justifyContent: "center",
      flexDirection: "column",
      alignItems: "center",
      rowGap: "20px",
      boxSizing: "border-box",
    }}
  >
    {/* Image skeleton */}
    <div className="item-image">
      <div
        className="bg-gray-200 rounded-md"
        style={{
          width: "137px",
          height: "156px",
        }}
      />
    </div>

    {/* Price section skeleton */}
    <div className="price">
      <div className="flex flex-col items-center space-y-2">
        <div className="h-4 bg-gray-200 rounded" style={{ width: "70px" }} />
        <div className="h-3 bg-gray-200 rounded" style={{ width: "90px" }} />
      </div>
    </div>

    {/* Product title skeleton - FIXED: Use div instead of p to contain other elements */}
    <div className="item-description w-full text-center">
      <div className="space-y-1">
        <div
          className="h-4 bg-gray-200 rounded mx-auto"
          style={{ width: "140px" }}
        />
        <div
          className="h-4 bg-gray-200 rounded mx-auto"
          style={{ width: "110px" }}
        />
      </div>
    </div>

    {/* Button skeleton */}
    <div
      className="section_01__promotions-item-button button bg-gray-200 rounded"
      style={{
        height: "40px",
        width: "140px",
      }}
    />
  </li>
);

// Products Skeleton Component
const ProductsSkeleton = memo(() => (
  <ul className="section_01__promotions">
    {Array.from({ length: 8 }).map((_, idx) => (
      <ProductSkeleton key={idx} />
    ))}
  </ul>
));

ProductsSkeleton.displayName = "ProductsSkeleton";

// Products List Component
const ProductsList = memo(({ products, selectedCategory, locale }) => {
  const getNameByLocale = (item, locale) => {
    if (locale === "ru" && item?.name_ru) return item?.name_ru;
    if (locale === "he" && item?.name_he) return item?.name_he;
    return item?.name || "";
  };

  if (!selectedCategory) {
    return <p>Category not found</p>;
  }

  return (
    <div className="right_sidebar">
      <h2>{getNameByLocale(selectedCategory, locale)}</h2>
      <ul className="section_01__promotions">
        {products.map((item) => (
          <Product key={item.id} product={item} />
        ))}
      </ul>
    </div>
  );
});

ProductsList.displayName = "ProductsList";

// Main Category Container Component
const CategoryContainer = () => {
  const intl = useIntl();
  const dispatch = useDispatch();
  const { locale } = useLanguage();
  const { category: categoryParam } = useParams() || "farm-gastronomy";

  const categoriesList = useSelector(selectCategories);
  const loading = useSelector(selectProductsLoading);
  const error = useSelector(selectProductsError);

  // Get category ID and selected category separately to prevent unnecessary re-renders
  const { categoryId, selectedCategory } = useMemo(() => {
    const foundCategory = categoriesList.find(
      (item) => item.name.toLowerCase().replace(/\s+/g, "-") === categoryParam
    );

    return {
      categoryId: foundCategory?.id,
      selectedCategory: foundCategory,
    };
  }, [categoriesList, categoryParam]);

  // Single API call effect - only depends on categoryId
  useEffect(() => {
    if (categoryId) {
      console.log("Fetching products for category ID:", categoryId);
      dispatch(fetchProductsByCategory(categoryId));
    }
  }, [dispatch, categoryId]);

  const productsByCategories = useSelector((state) =>
    selectProductsByCategory(state, categoryId)
  );

  return (
    <div className="section_catalog__container">
      <div className="top_sidebar">
        <h3>{intl.formatMessage({ id: "catalog" })}</h3>
        <TopSidebar />
      </div>
      <div className="left_sidebar">
        <h3>{intl.formatMessage({ id: "catalog" })}</h3>
        <LeftSidebar />
      </div>

      {/* Products section */}
      {loading ? (
        <ProductsSkeleton />
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : productsByCategories?.length === 0 ? (
        <p>{intl.formatMessage({ id: "categoryEmpty" })}</p>
      ) : (
        <ProductsList
          products={productsByCategories || []}
          selectedCategory={selectedCategory}
          locale={locale}
        />
      )}
    </div>
  );
};

export default CategoryContainer;
