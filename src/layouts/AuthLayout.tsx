import { useIsLoggedIn } from "@hooks";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LoadingIndicator from "@sharedComponents/LoadingIndicator";
import { navigate } from "gatsby";
import { Suspense } from "react";
import Footer from "../modules/Footer";

const AuthLayout = (props: parentComponent) => {
  const { children } = props;

  const isLoggedIn = useIsLoggedIn();

  if (isLoggedIn) {
    navigate("/");
  }

  return (
    <Suspense
      fallback={
        <LoadingIndicator />
      }
    >
      <Box display="flex" minHeight="100vh" bgcolor="customPrimary.main">
        <Grid container direction="column">
          <Grid flexGrow={1} alignItems="center" display="flex">
            {children}
          </Grid>
          <Footer />
        </Grid>
      </Box>
    </Suspense>
  );
};

export default AuthLayout;
