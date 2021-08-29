import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import {
  Block, BLOCKS, Document, Inline, MARKS,
} from '@contentful/rich-text-types';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import FilledInput from '@material-ui/core/FilledInput';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Link from '@material-ui/core/Link';
import { useTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { Add, AddShoppingCart, Remove } from '@material-ui/icons';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import { useParams } from '@reach/router';
import clsx from 'clsx';
import { GatsbyImage, getImage, ImageDataLike } from 'gatsby-plugin-image';
import { useSnackbar } from 'notistack';
import React, { useEffect, useState } from 'react';
import Carousel from 'react-material-ui-carousel';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import CustomBreadcrumbs from '../../../sharedComponents/CustomBreadcrumbs';
import { itemVariationOptions } from '../../../utils/constants';
import { formatPrice } from '../../../utils/helper';
import routeNames from '../../../utils/routeNames';
import {
  addToShoppingCart,
  toggleEnlargedProductImageModal,
  updateSelectedProductImage,
  updateSelectedProductImageList,
} from '../src/productReducers';
import productStyle from '../src/productStyle';
import ProductErrorSnackbar from './ProductErrorSnackbar';

interface ProductDescriptionParams{
  id:string
}

const ProductDescription = () => {
  const styles = productStyle();
  const dispatch = useAppDispatch();
  const params:ProductDescriptionParams = useParams();
  const theme = useTheme();
  const isXsView = useMediaQuery(theme.breakpoints.down('xs'));
  const allProducts = useAppSelector((state) => state.product.allProducts);
  const selectedProduct = allProducts.find(
    (product) => product.node.contentful_id === params.id,
  )?.node!;

  const [itemQuantity, setItemQuantity] = useState(1);
  const [selectedItemVariation, setSelectedItemVariation] = useState('');
  const [isErrorSnackbarOpen, setIsErrorSnackbarOpen] = useState(false);
  const [productRecommendation, setProductRecommendation] = useState<products.productData[][]>([]);
  const { enqueueSnackbar } = useSnackbar();
  const isKeyChainSeries = selectedProduct.category === 'Keychain Series';

  useEffect(() => {
    const productRecommendationAmount = isXsView ? 4 : 10;
    const otherProducts = allProducts.filter(
      (product) => product.node.contentful_id !== params.id,
    ).sort(() => Math.random() - 0.5).slice(0, productRecommendationAmount);
    const overallProductArray:products.productData[][] = [];
    let innerProductArray:products.productData[] = [];
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
  }, [allProducts, params.id, isXsView]);

  const triggerEnlargeImage = (imageData:ImageDataLike, carouselImageList:ImageDataLike[]) => {
    dispatch(updateSelectedProductImage(imageData));
    dispatch(updateSelectedProductImageList(carouselImageList));
    dispatch(toggleEnlargedProductImageModal(true));
  };

  const jsonContentDescription:Document = selectedProduct.contentDescription
  && JSON.parse(
    selectedProduct.contentDescription.raw,
  );

  const increaseItemQuantity = () => {
    setItemQuantity(itemQuantity + 1);
  };

  const reduceItemQuantity = () => {
    if (itemQuantity > 1) {
      setItemQuantity(itemQuantity - 1);
    }
  };

  const handleItemQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputQuantity = parseInt(event.target.value, 10);
    if (inputQuantity > 0) {
      setItemQuantity(inputQuantity);
    } else {
      setItemQuantity(1);
    }
  };

  const onAddToCart = () => {
    if ((selectedItemVariation && isKeyChainSeries) || !isKeyChainSeries) {
      let variationSuffix = '';
      if (isKeyChainSeries) {
        if (selectedItemVariation === 'With Keychain') {
          variationSuffix = ' (W)';
        } else {
          variationSuffix = ' (N)';
        }
      }
      const productName = selectedProduct.name + variationSuffix;
      const formattedData = {
        id: selectedProduct.contentful_id + variationSuffix,
        name: productName,
        img: getImage(selectedProduct.productImage[0]),
        price: selectedProduct.discountedPrice
          ? selectedProduct.discountedPrice.toFixed(2) : selectedProduct.price.toFixed(2),
        quantity: itemQuantity,
      } as products.shoppingCartItemData;
      dispatch(addToShoppingCart(formattedData));
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
      [MARKS.BOLD]: (text:React.ReactNode) => (
        <span className={styles.boldText}>{text}</span>
      ),
    },
    renderNode: {
      [BLOCKS.PARAGRAPH]: (_node:Block | Inline, children:React.ReactNode) => (
        <div><Typography variant="h6">{children}</Typography></div>
      ),
    },
  };

  return (
    <Grid container spacing={4} className={styles.productDescriptionBg}>
      <Grid item xs={12}>
        <CustomBreadcrumbs customActiveName={selectedProduct.name} />
        <Typography variant="h4">{selectedProduct.name}</Typography>
      </Grid>
      <Grid item lg={4} sm={12}>
        <Grid container justifyContent="center">
          <Grid item lg={12} sm={6} xs={12}>
            <Carousel
              autoPlay
              indicators={false}
              navButtonsProps={{
                className: styles.productCardCarouselNavButton,
                style: {},
              }}
            >
              {selectedProduct.productImage.map((image) => {
                const imageData = getImage(image)!;
                return (
                  <Box
                    className={styles.carouselImageContainer}
                    key={imageData.images.fallback?.src}
                    onClick={() => triggerEnlargeImage(image, selectedProduct.productImage)}
                  >
                    <GatsbyImage
                      image={imageData}
                      alt={selectedProduct.name}
                      className={styles.productDescriptionImg}
                    />
                  </Box>
                );
              })}
            </Carousel>
          </Grid>
        </Grid>
      </Grid>
      <Grid item lg={8} xs={12}>
        <Grid container direction="column">
          <Typography variant="h5" className={clsx(styles.boldText, styles.bottomSpacing)}>Description</Typography>
          {documentToReactComponents(jsonContentDescription, options)}
        </Grid>
        {isKeyChainSeries && (
          <>
            <Typography variant="h6" className={clsx(styles.boldText, styles.minorSpacingTop)}>Variations</Typography>
            <ToggleButtonGroup
              value={selectedItemVariation}
              exclusive
              onChange={(_event: React.MouseEvent<HTMLElement>, newValue: string) => {
                setSelectedItemVariation(newValue);
              }}
              aria-label="variation"
            >
              {itemVariationOptions.map((option) => (
                <ToggleButton
                  key={option.value}
                  className={styles.itemVariation}
                  classes={{
                    selected: styles.productVariationActiveColor,
                  }}
                  value={option.value}
                  aria-label={option.label}
                >
                  <Typography>{option.label}</Typography>
                </ToggleButton>
              ))}
            </ToggleButtonGroup>
          </>
        )}
        <Grid container spacing={2} alignItems="center" className={styles.topSpacing}>
          <Grid item md={6} sm={5} xs={12}>
            <Grid container spacing={2}>
              <Grid item>
                <Typography
                  variant="h5"
                  className={clsx(styles.boldText, {
                    [styles.dicountedPriceOriText]: selectedProduct.discountedPrice,
                  })}
                >
                  {formatPrice(selectedProduct.price, 'MYR')}
                </Typography>
              </Grid>
              <Grid item>
                {selectedProduct.discountedPrice && (
                  <Typography variant="h5" className={styles.discountedPriceText}>
                    {formatPrice(selectedProduct.discountedPrice, 'MYR')}
                  </Typography>
                )}
              </Grid>
            </Grid>
          </Grid>
          <Grid item md={2} sm={3} xs={9}>
            <Grid container justifyContent="flex-end">
              <IconButton className={styles.minusIconButton} onClick={reduceItemQuantity}>
                <Remove />
              </IconButton>
              <Grid item xs={4}>
                <FormControl hiddenLabel variant="filled" className={styles.quantityInput} size="small">
                  <FilledInput
                    disableUnderline
                    inputProps={{ className: styles.centerText }}
                    value={itemQuantity}
                    onChange={handleItemQuantityChange}
                  />
                </FormControl>
              </Grid>
              <IconButton className={styles.plusIconButton} onClick={increaseItemQuantity} size="medium">
                <Add />
              </IconButton>
            </Grid>
          </Grid>
          <Grid item md={3} sm={4} xs={3}>
            <Grid container justifyContent={isXsView ? 'center' : 'flex-end'}>
              {isXsView
                ? <IconButton onClick={onAddToCart} color="secondary"><AddShoppingCart /></IconButton>
                : (
                  <Button
                    variant="contained"
                    color="secondary"
                    endIcon={<AddShoppingCart />}
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
        <Typography variant="h6">You may also like...</Typography>
        <Carousel
          className={styles.minorSpacingTop}
          navButtonsProps={{
            className: styles.productCardCarouselNavButton,
            style: {},
          }}
        >
          {productRecommendation.map((productArray) => (
            <Grid container spacing={2} justifyContent="center" key={productArray.toString()}>
              {productArray.map((product) => {
                const imageData = getImage(product.productImage[0])!;
                return (
                  <Grid item xs={6} sm={2} key={product.contentful_id}>
                    <Link target="_blank" rel="noreferrer" href={`/products/${product.contentful_id}`}>
                      <Grid container alignItems="center" justifyContent="center" className={styles.productRecommendationNameContainer}>
                        <Typography variant="h6" color="secondary" className={styles.centerText}>{product.name}</Typography>
                      </Grid>
                      <GatsbyImage
                        image={imageData}
                        alt={product.name}
                        className={styles.productDescriptionImg}
                      />
                    </Link>
                  </Grid>
                );
              })}
            </Grid>
          ))}
        </Carousel>
        <Grid container justifyContent="flex-end">
          <Link target="_blank" rel="noreferrer" href={routeNames.products} color="textPrimary">
            <Typography variant="body1">View All Products</Typography>
          </Link>
        </Grid>
      </Grid>
      <ProductErrorSnackbar isSnackbarOpen={isErrorSnackbarOpen} toggleSnackbar={toggleErrorSnackbar} msg="Please select one variation to proceed!" />
    </Grid>
  );
};

export default ProductDescription;
