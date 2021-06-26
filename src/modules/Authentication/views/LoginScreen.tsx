import Card from '@material-ui/core/Card';
import React from 'react';
import Grid from '@material-ui/core/Grid';
import CardHeader from '@material-ui/core/CardHeader';
import { graphql, useStaticQuery } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import Box from '@material-ui/core/Box';
import CardContent from '@material-ui/core/CardContent';
import { useForm } from 'react-hook-form';
import Button from '@material-ui/core/Button';
import { yupResolver } from '@hookform/resolvers/yup';
import authenticationStyles from '../src/authenticationStyles';
import ControlledTextInput from '../../../sharedComponents/ControlledTextInput';
import ControlledPasswordInput from '../../../sharedComponents/ControlledPasswordInput';
import { loginSchema } from '../src/authenticationSchema';

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

  const { control, formState: { errors }, handleSubmit } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const submitLogin = (hookData:auth.submitLoginPayload) => {
    console.log(hookData);
  };

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
            <form onSubmit={handleSubmit(submitLogin)} className={styles.formContainer}>
              <Grid container justify="center" alignItems="center">
                <ControlledTextInput
                  control={control}
                  name="email"
                  label="Email"
                  variant="outlined"
                  error={errors.email}
                  labelWidth={40}
                />
                <ControlledPasswordInput
                  control={control}
                  name="password"
                  label="Password"
                  variant="outlined"
                  error={errors.password}
                />
              </Grid>
              <Grid container justify="center" alignItems="center" className={styles.spacingVertical}>
                <Button variant="contained" color="primary" type="submit" className={styles.loginBtn} size="medium">
                  Log In
                </Button>
              </Grid>
            </form>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default Login;
