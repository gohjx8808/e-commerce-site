import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { graphql, useStaticQuery } from 'gatsby';
import {
  GatsbyImage, getImage, IGatsbyImageData,
} from 'gatsby-plugin-image';
import React, { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-scroll';
import { useAppSelector } from '../../../hooks';
import ControlledPicker from '../../../sharedComponents/ControlledPicker';
import productStyle from '../src/productStyle';
import EnlargedProductImageCarouselModal from './EnlargedProductImageCarouselModal';
import ProductCard from './ProductCard';

interface categoryAmountData{
  [key:string]:number
}

interface imageInnerData{
  node:{
    name:string
    childImageSharp:IGatsbyImageData
    id:string
  }
}

const Products = () => {
  const styles = productStyle();
  const productFilterKeyword = useAppSelector((state) => state.product.productFilterKeyword);
  const allProducts = useAppSelector((state) => state.product.allProducts);
  const [categories, setCategories] = useState<string[]>([]);
  const [categoryProductAmount, setCategoryProductAmount] = useState<categoryAmountData>({});
  const { control, watch } = useForm();
  const productQuery = useStaticQuery(graphql`
    query {
      productCategoriesImages: allFile(filter: {relativeDirectory: {eq: "productCategories"}}) {
        edges {
          node {
            childImageSharp {
              gatsbyImageData
            }
            id
            name
          }
        }
      }
    }`);
  const sortByOptions = [
    { label: 'Name: A to Z', value: 'a2z' },
    { label: 'Name: Z to A', value: 'z2a' },
    { label: 'Price: Low to High', value: 'l2h' },
    { label: 'Price: High to Low', value: 'h2l' },
  ];

  const filterProductKeyword = useCallback(
    (productName:string) => {
      if (productFilterKeyword) {
        return productName.toLowerCase().includes(
          productFilterKeyword.toLowerCase(),
        );
      }
      return true;
    }, [productFilterKeyword],
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
    setCategories(categoryList);
  }, [allProducts, filterProductKeyword]);

  const selectedSortBy = watch('sortBy') && watch('sortBy').value;

  const sortProduct = (
    productA: products.innerProductQueryData, productB: products.innerProductQueryData,
  ) => {
    const ProductAName = productA.node.name.toLowerCase();
    const ProductBName = productB.node.name.toLowerCase();
    const ProductAPrice = productA.node.price;
    const ProductBPrice = productB.node.price;
    let sortVarA;
    let sortVarB;
    switch (selectedSortBy) {
      case 'a2z':
      case 'z2a':
      default:
        sortVarA = ProductAName;
        sortVarB = ProductBName;
        break;
      case 'l2h':
      case 'h2l':
        sortVarA = ProductAPrice;
        sortVarB = ProductBPrice;
        break;
    }
    switch (selectedSortBy) {
      case 'a2z':
      case 'l2h':
      default:
        if (sortVarA > sortVarB) {
          return 1;
        }
        if (sortVarA < sortVarB) {
          return -1;
        }
        return 0;
      case 'z2a':
      case 'h2l':
        if (sortVarA > sortVarB) {
          return -1;
        }
        if (sortVarA < sortVarB) {
          return 1;
        }
        return 0;
    }
  };

  const filterProduct = (product:products.innerProductQueryData, category:string) => {
    const isProductInFilter = filterProductKeyword(product.node.name);
    let isProductInCategory = true;
    if (product.node.category) {
      isProductInCategory = product.node.category === category;
    }
    return isProductInFilter && isProductInCategory;
  };

  return (
    <>
      <Grid container direction="row" justifyContent="center">
        {categories.map((category) => {
        // eslint-disable-next-line max-len
          const currentCategoryImageData:imageInnerData = productQuery.productCategoriesImages.edges.find(
            (image:imageInnerData) => image.node.name === category.toLowerCase().replace(' series', ''),
          );
          const categoryImage = getImage(currentCategoryImageData.node.childImageSharp)!;
          return (
            <Grid item xs={6} sm={2} key={category}>
              <Button disabled={!categoryProductAmount[category]}>
                <Link
                  to={category}
                  spy
                  smooth
                  offset={-60}
                >
                  <GatsbyImage
                    image={categoryImage}
                    alt={currentCategoryImageData.node.name}
                    imgClassName={styles.productCategoryImg}
                  />
                </Link>
              </Button>
            </Grid>
          );
        })}
      </Grid>
      <Grid container justifyContent="flex-end" alignItems="center" className={styles.sortByContainer}>
        <Grid item xs={12} sm={5} lg={3}>
          <Grid container justifyContent="flex-end" alignItems="center">
            <ControlledPicker
              control={control}
              name="sortBy"
              options={sortByOptions}
              variant="outlined"
              label="Sort By"
              lightBg
              clearable={false}
              defaultValue="a2z"
            />
          </Grid>
        </Grid>
      </Grid>
      {categories.map((category) => (
        <Grid container justifyContent="center" alignItems="center" direction="column" key={category}>
          {categoryProductAmount[category] && (
            <Grid container justifyContent="flex-start" alignItems="center">
              <Typography variant="h6" id={category} className={styles.categorySpacing}>{category}</Typography>
            </Grid>
          )}
          <Grid container justifyContent="center" alignItems="center" direction="row" spacing={2} key={category}>
            {allProducts.filter(
              (product:products.innerProductQueryData) => filterProduct(product, category),
            ).sort(sortProduct).map((product:products.innerProductQueryData) => (
              <ProductCard key={product.node.contentful_id} product={product.node} />
            ))}
          </Grid>
        </Grid>
      ))}
      <EnlargedProductImageCarouselModal />
    </>
  );
};

export default Products;
