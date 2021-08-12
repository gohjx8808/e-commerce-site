import Backdrop from '@material-ui/core/Backdrop';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { graphql, useStaticQuery } from 'gatsby';
import {
  GatsbyImage, getImage, IGatsbyImageData, ImageDataLike,
} from 'gatsby-plugin-image';
import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { toggleStatusModal } from '../src/statusReducer';
import statusStyle from '../src/statusStyle';

interface statusQueryInnerData{
  node:{
    childImageSharp:ImageDataLike
    name:string
  }
}

const StatusModal = () => {
  const dispatch = useAppDispatch();
  const isStatusModalOpen = useAppSelector((state) => state.status.isStatusModalOpen);
  const statusTitle = useAppSelector((state) => state.status.statusTitle);
  const statusMsg = useAppSelector((state) => state.status.statusMsg);
  const isSuccess = useAppSelector((state) => state.status.isSuccess);
  const styles = statusStyle();
  const [successImg, setSuccessImg] = useState<IGatsbyImageData>();
  const [failImg, setFailImg] = useState<IGatsbyImageData>();

  const statusQuery = useStaticQuery(graphql` 
  query {
      allFile(filter: {relativeDirectory: {eq: "statusBanner"}}) {
        edges {
          node {
            childImageSharp {
              gatsbyImageData
            }
            name
          }
        }
      }
    }`);

  useEffect(() => {
    statusQuery.allFile.edges.map((imageData:statusQueryInnerData) => {
      if (imageData.node.name === 'fail') {
        setFailImg(getImage(imageData.node.childImageSharp));
      } else if (imageData.node.name === 'success') {
        setSuccessImg(getImage(imageData.node.childImageSharp));
      }
      return null;
    });
  }, [statusQuery.allFile.edges]);

  return (
    <Backdrop
      open={isStatusModalOpen}
      className={styles.backdropRoot}
    >
      <Box className={styles.statusBgImgContainer}>
        <GatsbyImage image={isSuccess ? successImg! : failImg!} alt="fail" />
      </Box>
      <Grid container direction="column" justifyContent="center" alignItems="center" className={styles.absolutePos}>
        <Typography
          className={styles.statusTitle}
          color="secondary"
        >
          {statusTitle}
          {' '}
          {isSuccess ? 'Success' : 'Error'}
        </Typography>
        <Typography color="secondary" className={styles.statusMsg}>{statusMsg}</Typography>
        <Grid container justifyContent="center">
          <Button onClick={() => dispatch(toggleStatusModal(false))} color="secondary" variant="contained" className={styles.statusBtn}>
            Close
          </Button>
        </Grid>
      </Grid>
    </Backdrop>
  );
};

export default StatusModal;
