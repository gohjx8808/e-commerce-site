import Card from '@material-ui/core/Card';
import React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import CardHeader from '@material-ui/core/CardHeader';
import { graphql, useStaticQuery } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import Box from '@material-ui/core/Box';
import CardContent from '@material-ui/core/CardContent';
import { useForm } from 'react-hook-form';
import authenticationStyles from '../src/authenticationStyles';
import ControlledTextInput from '../../../sharedComponents/ControlledTextInput';

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

  const { control, formState: { errors } } = useForm();

  return (
    <Grid item xs={12}>
      <Grid container justify="center" alignItems="center">
        <Card
          style={{
            width: '50%',
            backgroundColor: '#B67B5E',
          }}
        >
          <Grid container justify="center" alignItems="center" direction="column">
            <CardHeader
              title="Login"
              className={styles.loginTitle}
            />
            <Box className={styles.iconContainer}>
              <GatsbyImage image={image!} alt="icon" imgClassName={styles.icon} />
            </Box>
          </Grid>
          <CardContent>
            <Grid container justify="center" alignItems="center">
              <ControlledTextInput
                control={control}
                name="email"
                label="Email"
                variant="outlined"
                error={errors.email}
              />
              <ControlledTextInput
                control={control}
                name="password"
                label="Password"
                variant="outlined"
                error={errors.password}
              />
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default Login;
