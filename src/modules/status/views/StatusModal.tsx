import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { graphql, useStaticQuery } from 'gatsby';
import {
  GatsbyImage, getImage, IGatsbyImageData, ImageDataLike,
} from 'gatsby-plugin-image';
import React, { useEffect, useState } from 'react';
import {
  useAppDispatch, useAppSelector, useXsDownMediaQuery,
} from '../../../hooks';
import TextShadowFont from '../../../styledComponents/TextShadowFont';
import { toggleStatusModal } from '../src/statusReducer';

interface statusQueryInnerData{
  node:{
    childImageSharp:ImageDataLike
    name:string
  }
}

const defaultIGatsbyData:IGatsbyImageData = {
  layout: 'fixed',
  width: 0,
  height: 0,
  images: {},
};

const StatusModal = () => {
  const isXsView = useXsDownMediaQuery();
  const dispatch = useAppDispatch();
  const isStatusModalOpen = useAppSelector((state) => state.status.isStatusModalOpen);
  const statusTitle = useAppSelector((state) => state.status.statusTitle);
  const statusMsg = useAppSelector((state) => state.status.statusMsg);
  const isSuccess = useAppSelector((state) => state.status.isSuccess);
  const [successImg, setSuccessImg] = useState<IGatsbyImageData>(defaultIGatsbyData);
  const [failImg, setFailImg] = useState<IGatsbyImageData>(defaultIGatsbyData);

  const statusQuery = useStaticQuery(graphql` 
  query {
      allFile(filter: {relativeDirectory: {eq: "statusBanner"}}) {
        edges {
          node {
            childImageSharp {
              gatsbyImageData(placeholder: BLURRED)
            }
            name
          }
        }
      }
    }`);

  useEffect(() => {
    statusQuery.allFile.edges.map((imageData:statusQueryInnerData) => {
      if (isXsView) {
        if (imageData.node.name === 'fail_mobile') {
          setFailImg(getImage(imageData.node.childImageSharp)!);
        } else if (imageData.node.name === 'success_mobile') {
          setSuccessImg(getImage(imageData.node.childImageSharp)!);
        }
      } else if (imageData.node.name === 'fail') {
        setFailImg(getImage(imageData.node.childImageSharp)!);
      } else if (imageData.node.name === 'success') {
        setSuccessImg(getImage(imageData.node.childImageSharp)!);
      }
      return null;
    });
  }, [statusQuery.allFile.edges, isXsView]);

  return (
    <Backdrop
      open={isStatusModalOpen}
      sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
    >
      <Box width={{ xs: '100%', sm: '90%', lg: '50%' }}>
        <GatsbyImage image={isSuccess ? successImg! : failImg!} alt="fail" />
      </Box>
      <Grid container direction="column" justifyContent="center" alignItems="center" position="absolute" marginTop={{ sm: 3 }}>
        <Grid item>
          <TextShadowFont color="secondary" fontWeight="bold" variant={isXsView ? 'h5' : 'h4'} textAlign="center">
            {statusTitle}
          </TextShadowFont>
        </Grid>
        <Grid item width={{ xs: '80%', sm: '70%', lg: '40%' }}>
          <TextShadowFont color="secondary" textAlign="center" variant="h6" marginBottom={2}>
            {statusMsg}
          </TextShadowFont>
        </Grid>
        <Grid container justifyContent="center">
          <Button size="large" onClick={() => dispatch(toggleStatusModal(false))} color="secondary" variant="contained">
            Close
          </Button>
        </Grid>
      </Grid>
    </Backdrop>
  );
};

export default StatusModal;
