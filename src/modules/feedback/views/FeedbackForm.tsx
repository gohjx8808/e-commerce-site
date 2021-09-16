import { yupResolver } from '@hookform/resolvers/yup';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import clsx from 'clsx';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useAppDispatch } from '../../../hooks';
import ControlledTextInput from '../../../sharedComponents/ControlledTextInput';
import useGlobalStyles from '../../../utils/useGlobalStyles';
import { submitFeedback } from '../src/feedbackReducer';
import { feedbackFormSchema } from '../src/feedbackSchema';
import feedbackStyles from '../src/feedbackStyles';

const FeedbackForm = () => {
  const styles = feedbackStyles();
  const globalStyles = useGlobalStyles();
  const dispatch = useAppDispatch();
  const { control, formState: { errors }, handleSubmit } = useForm({
    resolver: yupResolver(feedbackFormSchema),
  });

  const onSubmitFeedbackForm = (hookData:feedback.submitFeedbackFormPayload) => {
    dispatch(submitFeedback(hookData));
  };

  return (
    <Grid container spacing={2} justifyContent="center" alignItems="center" className={clsx(globalStyles.componentHalfTopSpacing, globalStyles.componentHalfBottomSpacing)}>
      <Grid item xs={12} sm={10} lg={6}>
        <Card>
          <CardContent className={styles.overallPadding}>
            <Grid container spacing={2} justifyContent="center" alignItems="center">
              <Grid item xs={12}>
                <ControlledTextInput
                  control={control}
                  name="nickname"
                  lightbg
                  label="Nickname"
                  error={errors.nickname}
                  variant="outlined"
                  labelWidth={65}
                  infoText="How should we address you."
                />
              </Grid>
              <Grid item xs={12}>
                <ControlledTextInput
                  control={control}
                  name="email"
                  lightbg
                  label="Email"
                  error={errors.email}
                  variant="outlined"
                  labelWidth={40}
                  infoText="Email is solely for the purpose of replying your feedback."
                />
              </Grid>
              <Grid item xs={12}>
                <ControlledTextInput
                  control={control}
                  name="feedback"
                  lightbg
                  label="Feedback"
                  placeholder="Tell me what do you think..."
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
