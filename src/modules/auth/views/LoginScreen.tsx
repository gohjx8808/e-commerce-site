import { yupResolver } from '@hookform/resolvers/yup';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { graphql, Link as GatsbyLink, useStaticQuery } from 'gatsby';
import { getImage } from 'gatsby-plugin-image';
import React, { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { useAppDispatch } from '../../../hooks';
import CustomBreadcrumbs from '../../../sharedComponents/CustomBreadcrumbs';
import ControlledPasswordInput from '../../../sharedComponents/inputs/ControlledPasswordInput';
import ControlledTextInput from '../../../sharedComponents/inputs/ControlledTextInput';
import { AuthCard, AuthCardHeader, AuthIcon } from '../../../styledComponents/auth';
import routeNames from '../../../utils/routeNames';
import { submitSignIn } from '../src/authReducer';
import { loginSchema } from '../src/authSchema';

const LoginScreen = () => {
  const data = useStaticQuery(graphql`
    query {
      file(relativePath: { eq: "icon.jpeg" }) {
        childImageSharp {
          gatsbyImageData(placeholder: BLURRED)
        }
      }
    }
  `);

  const image = getImage(data.file);
  const dispatch = useAppDispatch();

  const { control, formState: { errors }, handleSubmit } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const submitLogin = useCallback((hookData:auth.submitSignInPayload) => {
    dispatch(submitSignIn(hookData));
  }, [dispatch]);

  return (
    <Grid item xs={12}>
      <Grid container justifyContent="center" alignItems="center">
        <Grid item xs={10} sm={9} lg={6}>
          <Grid container justifyContent="space-between" alignItems="center">
            <CustomBreadcrumbs />
            <Typography>
              New member?
              {' '}
              <Link component={GatsbyLink} to={routeNames.signUp} color="secondary" underline="hover">Register here!</Link>
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid container justifyContent="center" alignItems="center">
        <Grid item xs={10} sm={9} lg={6}>
          <AuthCard>
            <Grid container justifyContent="center" alignItems="center" direction="column">
              <AuthCardHeader
                title="Login"
              />
              <Box width={{ xs: '35%', sm: '20%' }}>
                <AuthIcon image={image!} alt="icon" />
              </Box>
            </Grid>
            <CardContent>
              <form onSubmit={handleSubmit(submitLogin)}>
                <Grid container justifyContent="center" alignItems="center" spacing={2}>
                  <Grid item xs={12} sm={10}>
                    <ControlledTextInput
                      control={control}
                      name="email"
                      label="Email"
                      formerror={errors.email}
                      type="email"
                    />
                  </Grid>
                  <Grid item xs={12} sm={10}>
                    <ControlledPasswordInput
                      control={control}
                      name="password"
                      label="Password"
                      formerror={errors.password}
                    />
                  </Grid>
                  <Grid xs={12} sm={10}>
                    <Grid container justifyContent="flex-end">
                      <Link component={GatsbyLink} to={routeNames.forgotPassword} underline="hover">
                        <Typography>Forgot Password?</Typography>
                      </Link>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid container justifyContent="center" alignItems="center" marginTop={3} marginBottom={2}>
                  <Grid xs={6} sm={3}>
                    <Button variant="contained" color="primary" type="submit" fullWidth>
                      Log In
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </CardContent>
          </AuthCard>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default LoginScreen;
