import { ProductContext } from "@contextProvider/ProductContextProvider";
import { useAllProducts } from "@hooks";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { socialMediaLinks } from "@utils/constants";
import { graphql, useStaticQuery } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { scroller } from "react-scroll";
import MainLayout from "../../layouts/MainLayout";
import ProductCard from "../../modules/products/views/ProductCard";
import ControlledPicker from "../../sharedComponents/inputs/ControlledPicker";
import { compareString } from "../../utils/helper";

interface categoryAmountData {
  [key: string]: number;
}

const Products = () => {
  const { filterKeyword } = useContext(ProductContext);
  const allProducts = useAllProducts();

  const [categories, setCategories] = useState<string[]>([]);
  const [categoryProductAmount, setCategoryProductAmount] =
    useState<categoryAmountData>({});
  const { control, watch } = useForm();

  const sortByOptions = [
    { label: "Name: A to Z", value: "a2z" },
    { label: "Name: Z to A", value: "z2a" },
    { label: "Price: Low to High", value: "l2h" },
    { label: "Price: High to Low", value: "h2l" },
  ];

  const filterProductKeyword = useCallback(
    (productName: string) => {
      if (filterKeyword) {
        return productName.toLowerCase().includes(filterKeyword.toLowerCase());
      }
      return true;
    },
    [filterKeyword]
  );

  useEffect(() => {
    const categoryList = [] as string[];
    const categoryAmount = {} as categoryAmountData;
    allProducts.map((product) => {
      const productCategory = product.node.category;
      if (productCategory) {
        if (filterProductKeyword(product.node.name)) {
          if (categoryAmount[productCategory]) {
            categoryAmount[productCategory] += 1;
          } else {
            categoryAmount[productCategory] = 1;
          }
        }
        if (!categoryList.includes(productCategory)) {
          categoryList.push(productCategory);
        }
      }
      return null;
    });
    setCategoryProductAmount(categoryAmount);
    categoryList.sort((a, b) => compareString(a, b));
    setCategories(categoryList);
  }, [allProducts, filterProductKeyword]);

  const selectedSortBy = watch("sortBy") && watch("sortBy").value;

  const sortProduct = (
    productA: products.innerProductQueryData,
    productB: products.innerProductQueryData
  ) => {
    const ProductAName = productA.node.name.toLowerCase();
    const ProductBName = productB.node.name.toLowerCase();
    const ProductAPrice = productA.node.price;
    const ProductBPrice = productB.node.price;
    let sortVarA;
    let sortVarB;
    switch (selectedSortBy) {
      case "a2z":
      case "z2a":
      default:
        sortVarA = ProductAName;
        sortVarB = ProductBName;
        break;
      case "l2h":
      case "h2l":
        sortVarA = ProductAPrice;
        sortVarB = ProductBPrice;
        break;
    }
    switch (selectedSortBy) {
      case "a2z":
      case "l2h":
      default:
        if (sortVarA > sortVarB) {
          return 1;
        }
        if (sortVarA < sortVarB) {
          return -1;
        }
        return 0;
      case "z2a":
      case "h2l":
        if (sortVarA > sortVarB) {
          return -1;
        }
        if (sortVarA < sortVarB) {
          return 1;
        }
        return 0;
    }
  };

  const filterProduct = (
    product: products.innerProductQueryData,
    category: string
  ) => {
    const isProductInFilter = filterProductKeyword(product.node.name);
    let isProductInCategory = true;
    if (product.node.category) {
      isProductInCategory = product.node.category === category;
    }
    return isProductInFilter && isProductInCategory;
  };

  const productCategoryBanner = useStaticQuery(graphql`
    query {
      file(relativePath: { eq: "productCategory.png" }) {
        childImageSharp {
          gatsbyImageData(placeholder: BLURRED)
        }
      }
    }
  `);

  const productCategoryBannerImage = getImage(productCategoryBanner.file);

  const scrollTo = (category: string) => {
    scroller.scrollTo(category, {
      spy: true,
      smooth: true,
      offset: -80,
    });
  };

  return (
    <MainLayout pageBannerTitle="Product Categories">
      <Grid container justifyContent="center" marginTop={3}>
        <Grid item xs={12} sm={11}>
          <GatsbyImage
            image={productCategoryBannerImage!}
            alt="productCategories"
            objectFit="fill"
            style={{ width: "100%" }}
          />
        </Grid>
        <Grid
          container
          item
          xs={12}
          sm={11}
          style={{ backgroundColor: "#f5dbc9" }}
          padding={3}
        >
          <Grid
            container
            justifyContent="center"
            alignItems="center"
            rowSpacing={2}
          >
            {categories.map((category) => (
              <Grid
                item
                container
                xs={6}
                sm={4}
                key={category}
                justifyContent="center"
              >
                <Button
                  variant="contained"
                  color="whiteButton"
                  sx={{ width: "80%" }}
                  onClick={() => scrollTo(category)}
                >
                  <Typography>{category}</Typography>
                </Button>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
      <Grid
        container
        justifyContent="flex-end"
        alignItems="center"
        marginTop={5}
      >
        <Grid item xs={12} sm={5} lg={3}>
          <Grid container justifyContent="flex-end" alignItems="center">
            <ControlledPicker
              control={control}
              name="sortBy"
              options={sortByOptions}
              label="Sort By"
              lightbg={1}
              disableClearable
              defaultcheck="a2z"
            />
          </Grid>
        </Grid>
      </Grid>
      {categories.map((category) => (
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          direction="column"
          key={category}
        >
          {categoryProductAmount[category] && (
            <Grid
              container
              justifyContent="flex-start"
              alignItems="center"
              marginBottom={3}
              marginTop={5}
            >
              <Typography variant="h5" id={category} marginY={3}>
                {category}
              </Typography>
            </Grid>
          )}
          <Grid
            container
            justifyContent="center"
            alignItems="center"
            direction="row"
            spacing={2}
            key={category}
          >
            {allProducts
              .filter((product: products.innerProductQueryData) =>
                filterProduct(product, category)
              )
              .sort(sortProduct)
              .map((product: products.innerProductQueryData) => (
                <ProductCard
                  key={product.node.contentful_id}
                  product={product.node}
                />
              ))}
          </Grid>
        </Grid>
      ))}
      <Divider sx={{ mt: 5 }} />
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        direction="column"
        py={3}
        spacing={5}
      >
        <Grid item xs={12}>
          <Typography variant="h5">Custom Order?</Typography>
        </Grid>
        <Grid item xs={12}>
          <Button
            href={socialMediaLinks.INSTAGRAM}
            variant="contained"
            color="secondary"
          >
            Chat With Me
          </Button>
        </Grid>
      </Grid>
    </MainLayout>
  );
};

export default Products;
