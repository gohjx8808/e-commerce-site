import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { graphql, useStaticQuery } from 'gatsby';
import React, { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-scroll';
import { useAppSelector } from '../../../hooks';
import productStyle from '../src/productStyle';
import ProductCard from './ProductCard';

interface categoryAmountData{
  [key:string]:number
}

const Products = () => {
  const styles = productStyle();
  const productFilterKeyword = useAppSelector((state) => state.product.productFilterKeyword);
  const [categories, setCategories] = useState<string[]>([]);
  const [categoryProductAmount, setCategoryProductAmount] = useState<categoryAmountData>({});
  const allProducts:products.rawProductQueryData = useStaticQuery(graphql`
    query ProductPrices {
      allContentfulProducts(filter: {node_locale: {eq: "en-US"}}) {
        edges {
          node {
            name
            contentful_id
            category
            productImage {
              gatsbyImageData
            }
            price
            contentDescription {
              raw
            }
          }
        }
      }
    }`);

  const filterProductKeyword = useCallback(
    (productName:string) => productName.toLowerCase().includes(
      productFilterKeyword.toLowerCase(),
    ), [productFilterKeyword],
  );

  useEffect(() => {
    const categoryList = [] as string[];
    const categoryAmount = {} as categoryAmountData;
    allProducts.allContentfulProducts.edges.map((product) => {
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

  const filterProduct = (product:products.innerProductQueryData, category:string) => {
    let isProductInFilter = true;
    let isProductInCategory = true;
    if (productFilterKeyword) {
      isProductInFilter = filterProductKeyword(product.node.name);
    }
    if (product.node.category) {
      isProductInCategory = product.node.category === category;
    }
    return isProductInFilter && isProductInCategory;
  };

  return (
    <>
      {categories.map((category) => (
        <Button disabled={!categoryProductAmount[category]} key={category}>
          <Link
            to={category}
            spy
            smooth
            offset={-60}
          >
            {category}
          </Link>
        </Button>
      ))}
      {categories.map((category) => (
        <Grid container justifyContent="center" alignItems="center" direction="column" key={category}>
          {categoryProductAmount[category] && (
            <Grid container justifyContent="flex-start" alignItems="center">
              <Typography variant="h6" id={category} className={styles.categorySpacing}>{category}</Typography>
            </Grid>
          )}
          <Grid container justifyContent="center" alignItems="center" direction="row" spacing={5} key={category}>
            {allProducts.allContentfulProducts.edges.filter(
              (product) => filterProduct(product, category),
            ).map((product) => (
              <ProductCard key={product.node.contentful_id} product={product.node} />
            ))}
          </Grid>
        </Grid>
      ))}
    </>
  );
};

export default Products;
