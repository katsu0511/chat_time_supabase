import { FormControlLabel, Radio } from '@mui/material';

export default function RadioButton(props: {value: string, label: string}) {
  return (
    <FormControlLabel
      value={props.value}
      control={<Radio />}
      label={props.label}
      sx={{
        width: '100px',
        margin: 0
      }}
    />
  );
}
