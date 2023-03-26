import { ProductContext } from "@contextProvider/ProductContextProvider";
import useDebounce from "@hooks/useDebounce";
import {
  useProductCategories,
  useProductList,
  useSortOptions,
} from "@modules/products/src/productQueries";
import SEO from "@modules/SEO";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import LoadingIndicator from "@sharedComponents/LoadingIndicator";
import { socialMediaLinks } from "@utils/constants";
import { generateHeader } from "@utils/helper";
import { graphql, useStaticQuery } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { scroller } from "react-scroll";
import MainLayout from "../../layouts/MainLayout";
import ProductCard from "../../modules/products/views/ProductCard";
import ControlledPicker from "../../sharedComponents/inputs/ControlledPicker";

const Products = () => {
  const { filterKeyword } = useContext(ProductContext);
  const { control, watch } = useForm();

  const [groupedProducts, setGroupedProducts] =
    useState<products.groupedProductData>({});
  const [availableCategories, setAvailableCategories] = useState<string[]>([]);

  const selectedSortBy = watch("sortBy") && watch("sortBy").id;

  const { data: allProducts, refetch } = useProductList({
    sortId: selectedSortBy || 1,
    search: filterKeyword,
  });

  const { data: sortByOptions } = useSortOptions();
  const { data: allCategories, isLoading: categoryLoading } = useProductCategories();

  useEffect(() => {
    if (allProducts) {
      const groupedProductData: products.groupedProductData =
        allProducts.reduce((accumulator, object) => {
          const { category } = object;
          // eslint-disable-next-line no-param-reassign
          accumulator[category] = accumulator[category] || [];
          accumulator[category].push(object);

          return accumulator;
        }, Object.create({}));

      setGroupedProducts(groupedProductData);
      setAvailableCategories(Object.keys(groupedProductData));
    }
  }, [allProducts]);

  useDebounce(filterKeyword, refetch);

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
            {allCategories?.map((category) => (
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
                  disabled={!availableCategories?.includes(category)}
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
        {sortByOptions && (
          <Grid item xs={12} sm={5} lg={3}>
            <Grid container justifyContent="flex-end" alignItems="center">
              <ControlledPicker
                control={control}
                name="sortBy"
                options={sortByOptions}
                label="Sort By"
                lightBg={true}
                disableClearable
                defaultCheck={{ id: 1, name: "Name: A to Z" }}
              />
            </Grid>
          </Grid>
        )}
      </Grid>
      {categoryLoading ? <LoadingIndicator minHeight="50vh" /> : availableCategories?.map((category) => (
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          direction="column"
          key={category}
        >
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
          <Grid
            container
            justifyContent="center"
            alignItems="center"
            direction="row"
            spacing={2}
            key={category}
          >
            {groupedProducts[category].map((product) => (
              <ProductCard key={product.id} product={product} />
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

export const Head = () => <SEO title={generateHeader("Products")} />;
