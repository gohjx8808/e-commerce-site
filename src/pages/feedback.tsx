import { yupResolver } from "@hookform/resolvers/yup";
import SEO from "@modules/SEO";
import LoadingButton from "@mui/lab/LoadingButton";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import { generateHeader } from "@utils/helper";
import { SubmitHandler, useForm } from "react-hook-form";
import MainLayout from "../layouts/MainLayout";
import { useSubmitFeedback } from "../modules/feedback/src/feedbackMutations";
import { feedbackFormSchema } from "../modules/feedback/src/feedbackSchema";
import ControlledTextInput from "../sharedComponents/inputs/ControlledTextInput";

const FeedbackForm = () => {
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<feedback.submitFeedbackFormPayload>({
    resolver: yupResolver(feedbackFormSchema),
  });

  const { mutate: submitFeedback, isLoading: submitFeedbackLoading } =
    useSubmitFeedback();

  const onSubmitFeedbackForm: SubmitHandler<
    feedback.submitFeedbackFormPayload
  > = (hookData) => {
    submitFeedback(hookData);
  };

  return (
    <MainLayout pageBannerTitle="Feedback Form">
      <Grid container justifyContent="center" alignItems="center" marginY={7}>
        <Grid item xs={12} sm={10} lg={6}>
          <Card variant="outlined">
            <CardContent sx={{ padding: 4 }}>
              <Grid
                container
                spacing={2}
                justifyContent="center"
                alignItems="center"
              >
                <Grid item xs={12}>
                  <ControlledTextInput
                    control={control}
                    name="name"
                    lightBg
                    label="Nickname"
                    formerror={errors.name}
                    infotext="How should we address you."
                  />
                </Grid>
                <Grid item xs={12}>
                  <ControlledTextInput
                    control={control}
                    name="email"
                    lightBg
                    label="Email"
                    formerror={errors.email}
                    infotext="Email is solely for the purpose of replying your feedback."
                    isCapitalize={false}
                  />
                </Grid>
                <Grid item xs={12}>
                  <ControlledTextInput
                    control={control}
                    name="feedback"
                    lightBg
                    label="Feedback"
                    placeholder="Tell me what do you think..."
                    multiline
                    rows={10}
                    formerror={errors.feedback}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Grid container justifyContent="flex-end">
                    <LoadingButton
                      variant="contained"
                      color="secondary"
                      onClick={handleSubmit(onSubmitFeedbackForm)}
                      loading={submitFeedbackLoading}
                    >
                      Submit
                    </LoadingButton>
                  </Grid>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </MainLayout>
  );
};

export default FeedbackForm;

export const Head = () => <SEO title={generateHeader("Feedback")} />;
