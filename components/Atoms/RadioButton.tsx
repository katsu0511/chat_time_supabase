import useLoading from '@/lib/hooks/useLoading';
import { FormControlLabel, Radio } from '@mui/material';

export default function RadioButton(props: {value: string, label: string}) {
  const { loading } = useLoading();

  return (
    <FormControlLabel
      disabled={loading}
      value={props.value}
      control={<Radio />}
      label={props.label}
      sx={{
        width: '100px',
        margin: 0,
        '&.Mui-disabled': {
          pointerEvents: 'unset',
          cursor: loading ? 'not-allowed' : 'pointer',
        }
      }}
    />
  );
}
