import { yupResolver } from "@hookform/resolvers/yup";
import AuthLayout from "@layouts/AuthLayout";
import { resetPasswordSchema } from "@modules/auth/src/authSchema";
import LoadingButton from "@mui/lab/LoadingButton";
import Box from "@mui/material/Box";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import ControlledPasswordInput from "@sharedComponents/inputs/ControlledPasswordInput";
import ControlledTextInput from "@sharedComponents/inputs/ControlledTextInput";
import { AuthCard, AuthCardHeader, AuthIcon } from "@styledComponents/auth";
import { graphql, PageProps, useStaticQuery } from "gatsby";
import { getImage } from "gatsby-plugin-image";
import { FC } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

const ResetPassword: FC<PageProps> = (props) => {
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

  const { params } = props;

  const { token } = params;

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<auth.resetPasswordFormData>({
    resolver: yupResolver(resetPasswordSchema),
  });

  const onSubmit: SubmitHandler<auth.resetPasswordFormData> = (hookData) => {
    console.log(hookData);
  };

  return (
    <AuthLayout>
      <Grid item xs={12}>
        <Grid container justifyContent="center" alignItems="center">
          <Grid item xs={10} sm={9} lg={6}>
            <AuthCard>
              <Grid
                container
                justifyContent="center"
                alignItems="center"
                direction="column"
              >
                <AuthCardHeader title="Reset Password" />
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
                    <Grid item xs={12} sm={10}>
                      <Typography variant="subtitle1" color="white">
                        Please reset your password using the form below.
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={10}>
                      <ControlledTextInput
                        control={control}
                        name="token"
                        label="Token"
                        formerror={errors.token}
                        readOnly
                        defaultinput={token}
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
                    <Grid item xs={12} sm={10}>
                      <ControlledPasswordInput
                        control={control}
                        name="confirmPassword"
                        label="Confirm Password"
                        formerror={errors.confirmPassword}
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

export default ResetPassword;
