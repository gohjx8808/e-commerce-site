import { yupResolver } from '@hookform/resolvers/yup';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import { graphql, useStaticQuery, Link as GatsbyLink } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import React, { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { useAppDispatch } from '../../../hooks';
import ControlledDatePicker from '../../../sharedComponents/inputs/ControlledDatePicker';
import ControlledPasswordInput from '../../../sharedComponents/inputs/ControlledPasswordInput';
import ControlledPicker from '../../../sharedComponents/inputs/ControlledPicker';
import ControlledTextInput from '../../../sharedComponents/inputs/ControlledTextInput';
import CustomBreadcrumbs from '../../../sharedComponents/CustomBreadcrumbs';
import PasswordRequirements from '../../../sharedComponents/PasswordRequirements';
import routeNames from '../../../utils/routeNames';
import { submitSignUp } from '../src/authReducer';
import { signupSchema } from '../src/authSchema';
import authenticationStyles from '../src/authStyles';

const SignupScreen = () => {
  const styles = authenticationStyles();
  const data = useStaticQuery(graphql`
    query {
      file(relativePath: { eq: "icon.jpeg" }) {
        childImageSharp {
          gatsbyImageData(placeholder: BLURRED)
        }
      }
    }
  `);

  const dispatch = useAppDispatch();

  const image = getImage(data.file);

  const {
    control, formState: { errors }, handleSubmit, watch,
  } = useForm({
    resolver: yupResolver(signupSchema),
  });

  const submitSignup = useCallback((hookData:auth.submitSignupPayload) => {
    dispatch(submitSignUp(hookData));
  }, [dispatch]);

  const genderOptions = [{ value: 'M', label: 'Male' }, { value: 'F', label: 'Female' }];

  return (
    <Grid item xs={12}>
      <Grid container justifyContent="center" alignItems="center">
        <Grid item xs={10} sm={9}>
          <Grid container justifyContent="space-between" alignItems="center" className={styles.topSpacing}>
            <CustomBreadcrumbs />
            <Typography>
              Existing member?
              {' '}
              <Link component={GatsbyLink} to={routeNames.login} color="secondary">Login here!</Link>
            </Typography>
          </Grid>
        </Grid>
        <Grid item xs={10} sm={9}>
          <Card className={styles.cardBg}>
            <Grid container justifyContent="center" alignItems="center" direction="column">
              <CardHeader
                title="Registration"
                className={styles.whiteText}
              />
              <Box className={styles.signupIconContainer}>
                <GatsbyImage image={image!} alt="icon" imgClassName={styles.icon} />
              </Box>
            </Grid>
            <CardContent>
              <form onSubmit={handleSubmit(submitSignup)}>
                <Grid container justifyContent="center" alignItems="center">
                  <Grid item sm={11} xs={12}>
                    <Grid container justifyContent="center" alignItems="center" direction="row" spacing={2}>
                      <Grid item xs={12}>
                        <ControlledTextInput
                          control={control}
                          name="fullName"
                          label="Full Name"
                          variant="outlined"
                          formerror={errors.fullName}
                          labelWidth={70}
                          type="text"
                        />
                      </Grid>
                      <Grid item sm={6} xs={12}>
                        <ControlledTextInput
                          control={control}
                          name="phoneNumber"
                          label="Phone Number"
                          variant="outlined"
                          formerror={errors.phoneNumber}
                          labelWidth={110}
                          type="tel"
                        />
                      </Grid>
                      <Grid item sm={6} xs={12}>
                        <ControlledTextInput
                          control={control}
                          name="email"
                          label="Email"
                          variant="outlined"
                          formerror={errors.email}
                          labelWidth={40}
                          type="email"
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <ControlledPasswordInput
                          control={control}
                          name="password"
                          label="Password"
                          variant="outlined"
                          formerror={errors.password}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <ControlledPasswordInput
                          control={control}
                          name="confirmPassword"
                          label="Confirm Password"
                          variant="outlined"
                          formerror={errors.confirmPassword}
                          labelWidth={135}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <Grid container justifyContent="center" alignItems="center">
                          <PasswordRequirements password={watch('password')} rePassword={watch('confirmPassword')} />
                        </Grid>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <ControlledDatePicker
                          control={control}
                          name="dob"
                          label="Date of Birth"
                          inputVariant="outlined"
                          formerror={errors.dob}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <ControlledPicker
                          control={control}
                          name="gender"
                          label="Gender"
                          variant="outlined"
                          error={errors.gender}
                          options={genderOptions}
                          defaultValue={null}
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid container justifyContent="center" alignItems="center" className={styles.spacingVertical}>
                    <Button variant="contained" color="primary" type="submit" className={styles.loginBtn} size="medium">
                      Submit
                    </Button>
                  </Grid>
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
