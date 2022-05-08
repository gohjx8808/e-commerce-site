import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import {
  Block,
  BLOCKS,
  Document,
  Inline,
  MARKS,
} from "@contentful/rich-text-types";
import { ProductContext } from "@contextProvider/ProductContextProvider";
import ProductImageCarousel from "@modules/products/views/ProductImageCarousel";
import AddIcon from "@mui/icons-material/Add";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import RemoveIcon from "@mui/icons-material/Remove";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import FilledInput from "@mui/material/FilledInput";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Link from "@mui/material/Link";
import ToggleButton from "@mui/material/ToggleButton";
import Typography from "@mui/material/Typography";
import { productLocalStorageKeys } from "@utils/localStorageKeys";
import { Link as GatsbyLink, PageProps } from "gatsby";
import { getImage } from "gatsby-plugin-image";
import { useSnackbar } from "notistack";
import React, { FC, useContext, useEffect, useMemo, useState } from "react";
import { Carousel } from "react-responsive-carousel";
import { useXsDownMediaQuery } from "../../hooks";
import MainLayout from "../../layouts/MainLayout";
import ProductErrorSnackbar from "../../modules/products/views/ProductErrorSnackbar";
import CustomBreadcrumbs from "../../sharedComponents/CustomBreadcrumbs";
import ItemQuantityInput from "../../styledComponents/products/ItemQuantityInput";
import ItemVariationToggleButton from "../../styledComponents/products/ItemVariationToggleButton";
import ModifyQuantityButton from "../../styledComponents/products/ModifyQuantityButton";
import ProductImage from "../../styledComponents/products/ProductImage";
import ProductPrice from "../../styledComponents/products/ProductPrice";
import {
  defaultProductData,
  isSSR,
  itemVariationOptions,
} from "../../utils/constants";
import {
  customJSONParse,
  formatPrice,
  getProductVariationSuffix,
} from "../../utils/helper";
import routeNames from "../../utils/routeNames";

const ProductDescription: FC<PageProps> = (props) => {
  const { params } = props;
  const { id } = params;
  const isXsView = useXsDownMediaQuery();
  const { addToCart } = useContext(ProductContext);
  const allProducts: products.innerProductQueryData[] = useMemo(
    () =>
      (!isSSR &&
        customJSONParse(
          localStorage.getItem(productLocalStorageKeys.PRODUCTS)
        )) ||
      [],
    []
  );
  const selectedProduct =
    allProducts.find((product) => product.node.contentful_id === id)?.node ||
    defaultProductData;

  const [itemQuantity, setItemQuantity] = useState(1);
  const [selectedItemVariation, setSelectedItemVariation] = useState("");
  const [isErrorSnackbarOpen, setIsErrorSnackbarOpen] = useState(false);
  const [productRecommendation, setProductRecommendation] = useState<
    products.productData[][]
  >([]);
  const { enqueueSnackbar } = useSnackbar();
  const isKeyChainSeries = selectedProduct.category === "Keychain Series";

  useEffect(() => {
    const productRecommendationAmount = isXsView ? 4 : 10;
    const otherProducts = allProducts
      .filter((product) => product.node.contentful_id !== id)
      .sort(() => Math.random() - 0.5)
      .slice(0, productRecommendationAmount);
    const overallProductArray: products.productData[][] = [];
    let innerProductArray: products.productData[] = [];
    let counter = 0;

    otherProducts.map((product) => {
      if (counter !== 0 && counter % (productRecommendationAmount / 2) === 0) {
        overallProductArray.push(innerProductArray);
        innerProductArray = [];
      }
      innerProductArray.push(product.node);
      counter += 1;
      return null;
    });
    overallProductArray.push(innerProductArray);
    setProductRecommendation(overallProductArray);
  }, [allProducts, id, isXsView]);

  const jsonContentDescription: Document =
    selectedProduct.contentDescription &&
    JSON.parse(selectedProduct.contentDescription.raw);

  const increaseItemQuantity = () => {
    setItemQuantity(itemQuantity + 1);
  };

  const reduceItemQuantity = () => {
    if (itemQuantity > 1) {
      setItemQuantity(itemQuantity - 1);
    }
  };

  const handleItemQuantityChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const inputQuantity = parseInt(event.target.value, 10);
    if (inputQuantity > 0) {
      setItemQuantity(inputQuantity);
    } else {
      setItemQuantity(1);
    }
  };

  const onAddToCart = () => {
    if ((selectedItemVariation && isKeyChainSeries) || !isKeyChainSeries) {
      addToCart(
        selectedProduct,
        isKeyChainSeries,
        itemQuantity,
        selectedItemVariation
      );
      const variationSuffix = getProductVariationSuffix(
        isKeyChainSeries,
        selectedItemVariation
      );
      const productName = selectedProduct.name + variationSuffix;
      enqueueSnackbar(`${productName} had been added to your cart!`);
    } else {
      toggleErrorSnackbar();
    }
  };

  const toggleErrorSnackbar = () => {
    setIsErrorSnackbarOpen(!isErrorSnackbarOpen);
  };

  const options = {
    renderMark: {
      [MARKS.BOLD]: (text: React.ReactNode) => (
        <Typography variant="h6" fontWeight="bold">
          {text}
        </Typography>
      ),
    },
    renderNode: {
      [BLOCKS.PARAGRAPH]: (
        _node: Block | Inline,
        children: React.ReactNode
      ) => <Typography variant="h6">{children}</Typography>,
    },
  };

  return (
    <MainLayout>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <CustomBreadcrumbs customActiveName={selectedProduct.name} />
          <Typography variant="h4">{selectedProduct.name}</Typography>
        </Grid>
        <Grid item lg={4} sm={12}>
          <Grid container justifyContent="center">
            <Grid item lg={12} sm={6} xs={12}>
              <ProductImageCarousel
                imageList={selectedProduct.productImage}
                productName={selectedProduct.name}
                autoPlay
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item lg={8} xs={12}>
          <Grid container direction="column">
            <Typography variant="h5" fontWeight="bold" marginBottom={3}>
              Description
            </Typography>
            {documentToReactComponents(jsonContentDescription, options)}
          </Grid>
          {isKeyChainSeries && (
            <>
              <Typography variant="h6" fontWeight="bold">
                Variations
              </Typography>
              <ItemVariationToggleButton
                value={selectedItemVariation}
                exclusive
                onChange={(
                  _event: React.MouseEvent<HTMLElement>,
                  newValue: string
                ) => {
                  setSelectedItemVariation(newValue);
                }}
                color="secondary"
                aria-label="variation"
              >
                {itemVariationOptions.map((option) => (
                  <ToggleButton
                    key={option.value}
                    value={option.value}
                    aria-label={option.label}
                  >
                    <Typography>{option.label}</Typography>
                  </ToggleButton>
                ))}
              </ItemVariationToggleButton>
            </>
          )}
          <Grid container spacing={2} alignItems="center" marginTop={5}>
            <Grid item md={6} sm={5} xs={12}>
              <Grid container spacing={2}>
                <Grid item>
                  <ProductPrice
                    discountprice={selectedProduct.discountedPrice}
                    variant="h5"
                  >
                    {formatPrice(selectedProduct.price, "MYR")}
                  </ProductPrice>
                </Grid>
                <Grid item>
                  {selectedProduct.discountedPrice && (
                    <Typography variant="h5" fontWeight="bold">
                      {formatPrice(selectedProduct.discountedPrice, "MYR")}
                    </Typography>
                  )}
                </Grid>
              </Grid>
            </Grid>
            <Grid item md={2} sm={3} xs={9}>
              <Grid container justifyContent="flex-end">
                <ModifyQuantityButton
                  actiontype="minus"
                  onClick={reduceItemQuantity}
                >
                  <RemoveIcon />
                </ModifyQuantityButton>
                <Grid item xs={4}>
                  <ItemQuantityInput hiddenLabel variant="filled" size="small">
                    <FilledInput
                      disableUnderline
                      value={itemQuantity}
                      onChange={handleItemQuantityChange}
                    />
                  </ItemQuantityInput>
                </Grid>
                <ModifyQuantityButton
                  actiontype="add"
                  onClick={increaseItemQuantity}
                >
                  <AddIcon />
                </ModifyQuantityButton>
              </Grid>
            </Grid>
            <Grid item md={3} sm={4} xs={3}>
              <Grid container justifyContent={isXsView ? "center" : "flex-end"}>
                {isXsView ? (
                  <IconButton onClick={onAddToCart} color="secondary">
                    <AddShoppingCartIcon />
                  </IconButton>
                ) : (
                  <Button
                    variant="contained"
                    color="secondary"
                    endIcon={<AddShoppingCartIcon />}
                    size="large"
                    onClick={onAddToCart}
                  >
                    Add to cart
                  </Button>
                )}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Divider />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6" marginBottom={1}>
            You may also like...
          </Typography>
          <Carousel
            showThumbs={false}
            showIndicators={false}
            transitionTime={800}
            showStatus={false}
            infiniteLoop
          >
            {productRecommendation.map((productArray) => (
              <Grid
                container
                spacing={2}
                justifyContent="center"
                key={productArray.toString()}
              >
                {productArray.map((product) => {
                  const imageData = getImage(product.productImage[0])!;
                  return (
                    <Grid item xs={6} sm={2} key={product.contentful_id}>
                      <Link
                        component={GatsbyLink}
                        underline="hover"
                        target="_blank"
                        rel="noreferrer"
                        to={`/products/${product.contentful_id}`}
                      >
                        <Grid
                          container
                          alignItems="center"
                          justifyContent="center"
                          height={64}
                        >
                          <Typography
                            variant="h6"
                            color="secondary"
                            textAlign="center"
                          >
                            {product.name}
                          </Typography>
                        </Grid>
                        <ProductImage image={imageData} alt={product.name} />
                      </Link>
                    </Grid>
                  );
                })}
              </Grid>
            ))}
          </Carousel>
          <Grid container justifyContent="flex-end">
            <Link
              target="_blank"
              component={GatsbyLink}
              rel="noreferrer"
              to={routeNames.products}
              color="textPrimary"
            >
              <Typography variant="body1">View All Products</Typography>
            </Link>
          </Grid>
        </Grid>
        <ProductErrorSnackbar
          isSnackbarOpen={isErrorSnackbarOpen}
          toggleSnackbar={toggleErrorSnackbar}
          msg="Please select one variation to proceed!"
        />
      </Grid>
    </MainLayout>
  );
};

export default ProductDescription;
