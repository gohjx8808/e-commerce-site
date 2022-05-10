import { yupResolver } from "@hookform/resolvers/yup";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import { graphql, Link as GatsbyLink, useStaticQuery } from "gatsby";
import { getImage } from "gatsby-plugin-image";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import AuthLayout from "../layouts/AuthLayout";
import { useSignUp } from "../modules/auth/src/authQueries";
import { signupSchema } from "../modules/auth/src/authSchema";
import CustomBreadcrumbs from "../sharedComponents/CustomBreadcrumbs";
import ControlledDatePicker from "../sharedComponents/inputs/ControlledDatePicker";
import ControlledPasswordInput from "../sharedComponents/inputs/ControlledPasswordInput";
import ControlledPicker from "../sharedComponents/inputs/ControlledPicker";
import ControlledTextInput from "../sharedComponents/inputs/ControlledTextInput";
import PasswordRequirements from "../sharedComponents/PasswordRequirements";
import { AuthCard, AuthCardHeader, AuthIcon } from "../styledComponents/auth";
import routeNames from "../utils/routeNames";

const Signup = () => {
  const data = useStaticQuery(graphql`
    query {
      file(relativePath: { eq: "icon.jpeg" }) {
        childImageSharp {
          gatsbyImageData(placeholder: BLURRED)
        }
      }
    }
  `);

  const { mutate: submitSignUp } = useSignUp();

  const image = getImage(data.file);

  const {
    control,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm<auth.submitSignupPayload>({
    resolver: yupResolver(signupSchema),
  });

  const submitSignup: SubmitHandler<auth.submitSignupPayload> = (hookData) => {
    submitSignUp(hookData);
  };

  const genderOptions = [
    { value: "M", label: "Male" },
    { value: "F", label: "Female" },
  ];

  return (
    <AuthLayout>
      <Grid item xs={12}>
        <Grid container justifyContent="center" alignItems="center">
          <Grid item xs={10} sm={9}>
            <Grid
              container
              justifyContent="space-between"
              alignItems="center"
              marginTop={3}
            >
              <CustomBreadcrumbs />
              <Typography color="customPrimary.contrastText">
                Existing member?{" "}
                <Link
                  component={GatsbyLink}
                  to={routeNames.login}
                  color="secondary"
                  underline="hover"
                >
                  Login here!
                </Link>
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs={10} sm={9}>
            <AuthCard>
              <Grid
                container
                justifyContent="center"
                alignItems="center"
                direction="column"
              >
                <AuthCardHeader title="Registration" />
                <Box width={{ xs: "35%", sm: "15%" }}>
                  <AuthIcon image={image!} alt="icon" />
                </Box>
              </Grid>
              <CardContent>
                <form onSubmit={handleSubmit(submitSignup)}>
                  <Grid container justifyContent="center" alignItems="center">
                    <Grid item sm={11} xs={12}>
                      <Grid
                        container
                        justifyContent="center"
                        alignItems="center"
                        direction="row"
                        spacing={2}
                      >
                        <Grid item xs={12}>
                          <ControlledTextInput
                            control={control}
                            name="fullName"
                            label="Full Name"
                            formerror={errors.fullName}
                            type="text"
                          />
                        </Grid>
                        <Grid item sm={6} xs={12}>
                          <ControlledTextInput
                            control={control}
                            name="phoneNumber"
                            label="Phone Number"
                            formerror={errors.phoneNumber}
                            type="tel"
                          />
                        </Grid>
                        <Grid item sm={6} xs={12}>
                          <ControlledTextInput
                            control={control}
                            name="email"
                            label="Email"
                            formerror={errors.email}
                            type="email"
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <ControlledPasswordInput
                            control={control}
                            name="password"
                            label="Password"
                            formerror={errors.password}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <ControlledPasswordInput
                            control={control}
                            name="confirmPassword"
                            label="Confirm Password"
                            formerror={errors.confirmPassword}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <Grid
                            container
                            justifyContent="center"
                            alignItems="center"
                          >
                            <PasswordRequirements
                              password={watch("password")}
                              rePassword={watch("confirmPassword")}
                            />
                          </Grid>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <ControlledDatePicker
                            control={control}
                            name="dob"
                            label="Date of Birth"
                            formerror={errors.dob}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <ControlledPicker
                            control={control}
                            name="gender"
                            label="Gender"
                            error={errors.gender?.value}
                            options={genderOptions}
                          />
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid
                      container
                      justifyContent="center"
                      alignItems="center"
                      marginTop={3}
                      marginBottom={2}
                    >
                      <Grid item xs={6} sm={3} lg={2}>
                        <Button
                          variant="contained"
                          color="primaryButton"
                          type="submit"
                          fullWidth
                        >
                          Submit
                        </Button>
                      </Grid>
                    </Grid>
                  </Grid>
                </form>
              </CardContent>
            </AuthCard>
          </Grid>
        </Grid>
      </Grid>
    </AuthLayout>
  );
};

export default Signup;
