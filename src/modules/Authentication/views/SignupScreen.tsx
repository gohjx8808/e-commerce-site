import { yupResolver } from '@hookform/resolvers/yup';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Grid from '@material-ui/core/Grid';
import { graphql, useStaticQuery } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import React from 'react';
import { useForm } from 'react-hook-form';
import firebase from 'gatsby-plugin-firebase';
import ControlledDatePicker from '../../../sharedComponents/ControlledDatePicker';
import ControlledPasswordInput from '../../../sharedComponents/ControlledPasswordInput';
import ControlledPicker from '../../../sharedComponents/ControlledPicker';
import ControlledTextInput from '../../../sharedComponents/ControlledTextInput';
import PasswordRequirements from '../../../sharedComponents/PasswordRequirements';
import { signupSchema } from '../src/authSchema';
import authenticationStyles from '../src/authStyles';
import 'firebase/auth';

const SignupScreen = () => {
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

  const {
    control, formState: { errors }, handleSubmit, watch,
  } = useForm({
    resolver: yupResolver(signupSchema),
  });

  firebase.auth();

  const submitSignup = (hookData:auth.submitSignupPayload) => {
    console.log(hookData);
  };

  const genderOptions = [{ value: 'M', label: 'Male' }, { value: 'F', label: 'Female' }];

  return (
    <Grid
      container
      justify="center"
      alignItems="center"
      className={styles.signUpHeight}
    >
      <Grid item xs={12}>
        <Grid container justify="center" alignItems="center">
          <Card
            style={{
              width: '80%',
              backgroundColor: '#B67B5E',
            }}
          >
            <Grid container justify="center" alignItems="center" direction="column">
              <CardHeader
                title="Registration"
                className={styles.loginTitle}
              />
              <Box className={styles.signupIconContainer}>
                <GatsbyImage image={image!} alt="icon" imgClassName={styles.icon} />
              </Box>
            </Grid>
            <CardContent>
              <form onSubmit={handleSubmit(submitSignup)} className={styles.formContainer}>
                <Grid container justify="center" alignItems="center">
                  <Grid item xs={12}>
                    <Grid container justify="center" alignItems="center">
                      <ControlledTextInput
                        control={control}
                        name="fullName"
                        label="Full Name"
                        variant="outlined"
                        error={errors.fullName}
                        labelWidth={70}
                        customClassName={styles.fullWidthInput}
                      />
                    </Grid>
                  </Grid>
                  <Grid item xs={12} md={6} lg={6}>
                    <Grid container justify="center" alignItems="center">
                      <ControlledTextInput
                        control={control}
                        name="phoneNumber"
                        label="Phone Number"
                        variant="outlined"
                        error={errors.phoneNumber}
                        labelWidth={110}
                        type="tel"
                      />
                    </Grid>
                  </Grid>
                  <Grid item xs={12} md={6} lg={6}>
                    <Grid container justify="center" alignItems="center">
                      <ControlledTextInput
                        control={control}
                        name="email"
                        label="Email"
                        variant="outlined"
                        error={errors.email}
                        labelWidth={40}
                        type="email"
                      />
                    </Grid>
                  </Grid>
                  <Grid item xs={12} md={6} lg={6}>
                    <Grid container justify="center" alignItems="center">
                      <ControlledPasswordInput
                        control={control}
                        name="password"
                        label="Password"
                        variant="outlined"
                        error={errors.password}
                      />
                    </Grid>
                  </Grid>
                  <Grid item xs={12} md={6} lg={6}>
                    <Grid container justify="center" alignItems="center">
                      <ControlledPasswordInput
                        control={control}
                        name="confirmPassword"
                        label="Confirm Password"
                        variant="outlined"
                        error={errors.confirmPassword}
                        labelWidth={135}
                      />
                    </Grid>
                  </Grid>
                  <Grid item xs={12}>
                    <Grid container justify="center" alignItems="center">
                      <PasswordRequirements password={watch('password')} rePassword={watch('confirmPassword')} />
                    </Grid>
                  </Grid>
                  <Grid item xs={12} md={6} lg={6}>
                    <Grid container justify="center" alignItems="center">
                      <ControlledDatePicker
                        control={control}
                        name="dob"
                        label="Date of Birth"
                        variant="outlined"
                        error={errors.dob}
                      />
                    </Grid>
                  </Grid>
                  <Grid item xs={12} md={6} lg={6}>
                    <Grid container justify="center" alignItems="center">
                      <ControlledPicker
                        control={control}
                        name="gender"
                        label="Gender"
                        variant="outlined"
                        error={errors.gender}
                        options={genderOptions}
                      />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid container justify="center" alignItems="center" className={styles.spacingVertical}>
                  <Button variant="contained" color="primary" type="submit" className={styles.loginBtn} size="medium">
                    Submit
                  </Button>
                </Grid>
              </form>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default SignupScreen;