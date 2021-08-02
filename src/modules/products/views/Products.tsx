import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { graphql, useStaticQuery } from 'gatsby';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-scroll';
import { useAppSelector } from '../../../hooks';
import productStyle from '../src/productStyle';
import ProductCard from './ProductCard';

const Products = () => {
  const styles = productStyle();
  const productFilterKeyword = useAppSelector((state) => state.product.productFilterKeyword);
  const [categories, setCategories] = useState<string[]>([]);
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

  useEffect(() => {
    const categoryList = [] as string[];
    allProducts.allContentfulProducts.edges.map((product) => {
      const productCategory = product.node.category;
      if (productCategory && !categoryList.includes(productCategory)) {
        categoryList.push(productCategory);
      }
      return null;
    });
    setCategories(categoryList);
  }, [allProducts]);

  const filterProduct = (product:products.innerProductQueryData, category:string) => {
    let isProductInFilter = true;
    let isProductInCategory = true;
    if (productFilterKeyword) {
      isProductInFilter = product.node.name.toLowerCase().includes(
        productFilterKeyword.toLowerCase(),
      );
    }
    if (product.node.category) {
      isProductInCategory = product.node.category === category;
    }
    return isProductInFilter && isProductInCategory;
  };

  return (
    <>
      {categories.map((category) => (
        <Link to={category} key={category} spy smooth offset={-60}>
          <Button>{category}</Button>
        </Link>
      ))}
      {categories.map((category) => (
        <Grid container justifyContent="center" alignItems="center" direction="column" key={category}>
          <Typography variant="h6" id={category} className={styles.categorySpacing}>{category}</Typography>
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
