import { graphql, PageProps, useStaticQuery } from 'gatsby';
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useAppSelector } from '../hooks';
import { routeMap } from '../utils/constants';
import routeNames from '../utils/routeNames';

const SEO = (props:PageProps) => {
  const { location, params } = props;
  const allProducts = useAppSelector((state) => state.product.allProducts);
  const [customTitle, setCustomTitle] = useState('');
  const { site } = useStaticQuery(graphql`
    query SEO {
      site {
        siteMetadata {
          title
          titleTemplate
          description
          lang
          keywords
          author
        }
      }
    }`);

  const {
    title,
    titleTemplate,
    description,
    lang,
    keywords,
    author,
  } = site.siteMetadata;

  useEffect(() => {
    const pathname = location.pathname.replace(params.id, ':id') || '';
    const productName = allProducts.find(
      (product) => product.node.contentful_id === params.id,
    )?.node.name;
    if (!params.id) {
      if (pathname === '/') {
        setCustomTitle(titleTemplate);
      } else {
        setCustomTitle(`%s | ${routeMap[pathname]}`);
      }
    } else if (pathname === routeNames.productDescription) {
      setCustomTitle(`%s | ${productName}`);
    }
  }, [allProducts, location.pathname, params.id, titleTemplate]);

  return (
    <Helmet
      title={title}
      titleTemplate={customTitle}
      htmlAttributes={{ lang }}
      meta={[
        {
          name: 'description',
          content: description,
        },
        {
          name: 'keywords',
          content: keywords,
        },
        {
          property: 'og:title',
          content: title,
        },
        {
          property: 'og:description',
          content: description,
        },
        {
          property: 'og:type',
          content: 'website',
        },
        {
          name: 'twitter:card',
          content: 'summary',
        },
        {
          name: 'twitter:creator',
          content: author || '',
        },
        {
          name: 'twitter:title',
          content: title,
        },
        {
          name: 'twitter:description',
          content: description,
        },
      ]}
    >
      <script async defer crossOrigin="anonymous" src="https://connect.facebook.net/en_US/sdk.js" />
      <style type="text/css">
        {`body {
          margin: 0;
        }`}
      </style>
    </Helmet>
  );
};

export default SEO;
