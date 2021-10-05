import { yupResolver } from '@hookform/resolvers/yup';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useAppDispatch } from '../../../hooks';
import ControlledTextInput from '../../../sharedComponents/inputs/ControlledTextInput';
import { submitFeedback } from '../src/feedbackReducer';
import { feedbackFormSchema } from '../src/feedbackSchema';

const FeedbackForm = () => {
  const dispatch = useAppDispatch();
  const { control, formState: { errors }, handleSubmit } = useForm({
    resolver: yupResolver(feedbackFormSchema),
  });

  const onSubmitFeedbackForm = (hookData:feedback.submitFeedbackFormPayload) => {
    dispatch(submitFeedback(hookData));
  };

  return (
    <Grid container justifyContent="center" alignItems="center" marginY={7}>
      <Grid item xs={12} sm={10} lg={6}>
        <Card variant="outlined">
          <CardContent sx={{ padding: 4 }}>
            <Grid container spacing={2} justifyContent="center" alignItems="center">
              <Grid item xs={12}>
                <ControlledTextInput
                  control={control}
                  name="nickname"
                  lightbg={1}
                  label="Nickname"
                  formerror={errors.nickname}
                  infotext="How should we address you."
                />
              </Grid>
              <Grid item xs={12}>
                <ControlledTextInput
                  control={control}
                  name="email"
                  lightbg={1}
                  label="Email"
                  formerror={errors.email}
                  infotext="Email is solely for the purpose of replying your feedback."
                />
              </Grid>
              <Grid item xs={12}>
                <ControlledTextInput
                  control={control}
                  name="feedback"
                  lightbg={1}
                  label="Feedback"
                  placeholder="Tell me what do you think..."
                  multiline
                  rows={10}
                  formerror={errors.feedback}
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
