import { yupResolver } from "@hookform/resolvers/yup";
import SEO from "@modules/SEO";
import { LoadingButton } from "@mui/lab";
import Box from "@mui/material/Box";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import ControlledCountryCodePhoneInput from "@sharedComponents/inputs/ControlledCountryCodePhoneInput";
import ControlledGenderPicker from "@sharedComponents/inputs/ControlledGenderPicker";
import { generateHeader } from "@utils/helper";
import { graphql, Link as GatsbyLink, useStaticQuery } from "gatsby";
import { getImage } from "gatsby-plugin-image";
import { SubmitHandler, useForm } from "react-hook-form";
import AuthLayout from "../layouts/AuthLayout";
import { useSignUp } from "../modules/auth/src/authMutations";
import { signUpSchema } from "../modules/auth/src/authSchema";
import CustomBreadcrumbs from "../sharedComponents/CustomBreadcrumbs";
import ControlledDatePicker from "../sharedComponents/inputs/ControlledDatePicker";
import ControlledPasswordInput from "../sharedComponents/inputs/ControlledPasswordInput";
import ControlledTextInput from "../sharedComponents/inputs/ControlledTextInput";
import PasswordRequirements from "../sharedComponents/PasswordRequirements";
import { AuthCard, AuthCardHeader, AuthIcon } from "../styledComponents/auth";
import routeNames from "../utils/routeNames";

const SignUp = () => {
  const data = useStaticQuery(graphql`
    query {
      file(relativePath: { eq: "icon.jpeg" }) {
        childImageSharp {
          gatsbyImageData(placeholder: BLURRED)
        }
      }
    }
  `);

  const { mutate: submitSignUp, isLoading } = useSignUp();

  const image = getImage(data.file);

  const {
    control,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm<auth.signUpFormData>({
    resolver: yupResolver(signUpSchema),
  });

  const onSubmitSignUp: SubmitHandler<auth.signUpFormData> = (hookData) => {
    const submitData: auth.submitSignUpPayload = {
      ...hookData,
      gender: hookData.gender.id as string,
    };
    submitSignUp(submitData);
  };

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
                <form onSubmit={handleSubmit(onSubmitSignUp)}>
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
                            name="name"
                            label="Full Name"
                            formerror={errors.name}
                            type="text"
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <ControlledTextInput
                            control={control}
                            name="preferredName"
                            label="Preferred Name"
                            type="text"
                            infotext="How you wish us to address you. (Full name is used if blank)"
                          />
                        </Grid>
                        <ControlledCountryCodePhoneInput
                          control={control}
                          countrycodeformerror={errors.countryCode}
                          phonenumberformerror={errors.phoneNumber}
                        />
                        <Grid item sm={6} xs={12}>
                          <ControlledTextInput
                            control={control}
                            name="email"
                            label="Email"
                            formerror={errors.email}
                            type="email"
                            isCapitalize={false}
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
                          <ControlledGenderPicker
                            control={control}
                            name="gender"
                            // @ts-ignore
                            error={errors.gender}
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
                        <LoadingButton
                          variant="contained"
                          color="primaryButton"
                          type="submit"
                          fullWidth
                          loading={isLoading}
                        >
                          Submit
                        </LoadingButton>
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

export default SignUp;

export const Head = () => <SEO title={generateHeader("Sign Up")} />;
