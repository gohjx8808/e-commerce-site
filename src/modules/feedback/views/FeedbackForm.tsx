import { yupResolver } from '@hookform/resolvers/yup';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import React from 'react';
import { useForm } from 'react-hook-form';
import ControlledTextInput from '../../../sharedComponents/ControlledTextInput';
import { feedbackFormSchema } from '../src/feedbackSchema';
import feedbackStyles from '../src/feedbackStyles';

const FeedbackForm = () => {
  const styles = feedbackStyles();
  const { control, formState: { errors }, handleSubmit } = useForm({
    resolver: yupResolver(feedbackFormSchema),
  });

  const onSubmitFeedbackForm = (hookData:feedback.submitFeedbackFormPayload) => {
    console.log(hookData);
  };

  return (
    <Grid container spacing={2} justifyContent="center" alignItems="center">
      <Grid item xs={6}>
        <Card>
          <CardContent className={styles.overallPadding}>
            <Grid container spacing={2} justifyContent="center" alignItems="center">
              <Grid item xs={12}>
                <ControlledTextInput
                  control={control}
                  name="nickname"
                  lightBg
                  label="Nickname"
                  error={errors.nickname}
                  variant="outlined"
                  labelWidth={40}
                  infoText="How should we address you."
                />
              </Grid>
              <Grid item xs={12}>
                <ControlledTextInput
                  control={control}
                  name="email"
                  lightBg
                  label="Email"
                  error={errors.email}
                  variant="outlined"
                  labelWidth={40}
                  infoText="Email is solely for the purpose to reply to your feedback."
                />
              </Grid>
              <Grid item xs={12}>
                <ControlledTextInput
                  control={control}
                  name="feedback"
                  lightBg
                  label="Feedback"
                  multiline
                  rows={10}
                  error={errors.feedback}
                  variant="outlined"
                  labelWidth={60}
                />
              </Grid>
              <Grid item xs={12}>
                <Grid container justifyContent="flex-end">
                  <Button variant="contained" color="secondary" onClick={handleSubmit(onSubmitFeedbackForm)}>Submit</Button>
                </Grid>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default FeedbackForm;
