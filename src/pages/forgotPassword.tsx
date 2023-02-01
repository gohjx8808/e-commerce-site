import { yupResolver } from "@hookform/resolvers/yup";
import SEO from "@modules/SEO";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import LoadingButton from "@mui/lab/LoadingButton";
import Box from "@mui/material/Box";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import { generateHeader } from "@utils/helper";
import { graphql, Link as GatsbyLink, useStaticQuery } from "gatsby";
import { getImage } from "gatsby-plugin-image";
import { SubmitHandler, useForm } from "react-hook-form";
import AuthLayout from "../layouts/AuthLayout";
import { useForgotPassword } from "../modules/auth/src/authMutations";
import { forgotPasswordSchema } from "../modules/auth/src/authSchema";
import ControlledTextInput from "../sharedComponents/inputs/ControlledTextInput";
import { AuthCard, AuthCardHeader, AuthIcon } from "../styledComponents/auth";
import routeNames from "../utils/routeNames";

const ForgotPassword = () => {
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
  const { mutate: submitForgotPassword, isLoading: forgotPasswordLoading } =
    useForgotPassword();

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<auth.submitForgotPasswordPayload>({
    resolver: yupResolver(forgotPasswordSchema),
  });

  const onSubmit: SubmitHandler<auth.submitForgotPasswordPayload> = (
    hookData
  ) => {
    submitForgotPassword(hookData);
  };

  return (
    <AuthLayout>
      <Grid item xs={12}>
        <Grid container justifyContent="center" alignItems="center" marginY={1}>
          <Grid item xs={10} sm={9} lg={6}>
            <Link
              component={GatsbyLink}
              to={routeNames.login}
              color="textPrimary"
              underline="hover"
            >
              <Grid container>
                <ArrowBackIcon />
                <Typography>Back to Login</Typography>
              </Grid>
            </Link>
          </Grid>
        </Grid>
        <Grid container justifyContent="center" alignItems="center">
          <Grid item xs={10} sm={9} lg={6}>
            <AuthCard>
              <Grid
                container
                justifyContent="center"
                alignItems="center"
                direction="column"
              >
                <AuthCardHeader title="Forgot Password" />
                <Box width={{ xs: "35%", sm: "20%" }}>
                  <AuthIcon image={image!} alt="icon" />
                </Box>
              </Grid>
              <CardContent>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <Grid
                    container
                    justifyContent="center"
                    alignItems="center"
                    spacing={2}
                    marginTop={1}
                  >
                    <Typography variant="subtitle1" color="white">
                      Please enter your registered email address below.
                    </Typography>
                    <Grid item xs={12} sm={10}>
                      <ControlledTextInput
                        control={control}
                        name="email"
                        label="Email"
                        formerror={errors.email}
                        type="email"
                      />
                    </Grid>
                  </Grid>
                  <Grid
                    container
                    justifyContent="center"
                    alignItems="center"
                    marginTop={3}
                    marginBottom={2}
                  >
                    <Grid item xs={6} sm={3}>
                      <LoadingButton
                        variant="contained"
                        color="primary"
                        type="submit"
                        fullWidth
                        loading={forgotPasswordLoading}
                      >
                        Submit
                      </LoadingButton>
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

export default ForgotPassword;

export const Head = () => <SEO title={generateHeader("Forgot Password")} />;
