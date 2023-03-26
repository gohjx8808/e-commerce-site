import CircularProgress from "@mui/material/CircularProgress";
import Grid, { GridProps } from "@mui/material/Grid";

const LoadingIndicator = (props: GridProps) => (
    <Grid
        container
        display="flex"
        minHeight="100vh"
        justifyContent="center"
        alignItems="center"
        {...props}
    >
        <CircularProgress color="primary" size={60} />
    </Grid>
)


export default LoadingIndicator;