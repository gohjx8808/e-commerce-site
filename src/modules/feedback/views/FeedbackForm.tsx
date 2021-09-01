import Button from '@material-ui/core/Button';
import FormHelperText from '@material-ui/core/FormHelperText';
import Grid from '@material-ui/core/Grid';
import React from 'react';
import { useForm } from 'react-hook-form';
import ControlledTextInput from '../../../sharedComponents/ControlledTextInput';

const FeedbackForm = () => {
  const { control, formState: { errors } } = useForm();

  return (
    <Grid container spacing={2} justifyContent="center" alignItems="center">
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
        <ControlledTextInput
          control={control}
          name="email"
          lightBg
          label="Email"
          error={errors.email}
          variant="outlined"
          labelWidth={40}
          infoText="Email is solely for the purpose to reply to feedback."
        />
      </Grid>
      <Grid item xs={12}>
        <Grid container justifyContent="flex-end">
          <Button variant="contained" color="secondary">Submit</Button>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default FeedbackForm;
