import Card from '@material-ui/core/Card';
import React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import CardHeader from '@material-ui/core/CardHeader';
import { graphql, useStaticQuery } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import Box from '@material-ui/core/Box';
import CardContent from '@material-ui/core/CardContent';
import authenticationStyles from '../src/authenticationStyles';

const Login = () => {
  const styles = authenticationStyles();
  const data = useStaticQuery(graphql`
    query {
      file(relativePath: { eq: "icon.png" }) {
        childImageSharp {
          gatsbyImageData
        }
      }
    }
  `);

  const image = getImage(data.file);

  return (
    <Grid item xs={12}>
      <Grid container justify="center" alignItems="center">
        <Card style={{ width: '50%' }}>
          <CardHeader
            title="Login"
            style={{ textAlign: 'center' }}
          />
          <Box className={styles.iconContainer}>
            <GatsbyImage image={image!} alt="icon" imgClassName={styles.icon} />
          </Box>
          <CardContent>
            <Typography>testing</Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default Login;
