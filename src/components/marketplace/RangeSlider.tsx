import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';

const useStyles = makeStyles({
  root: {
    width: 300
  }
});

function valuetext(value: number) {
  return `${value} €`;
}

export default function RangeSlider() {
  const classes = useStyles();
  const [value, setValue] = React.useState<number[]>([0, 1000]);

  const handleChange = (event: any, newValue: number | number[]) => {
    setValue(newValue as number[]);
  };

  return (
    <div className={classes.root}>
      <Typography id='range-slider' gutterBottom>
        Price range
      </Typography>
      <Slider
        value={value}
        onChange={handleChange}
        valueLabelDisplay='auto'
        aria-labelledby='range-slider'
        getAriaValueText={valuetext}
        min={0}
        max={1000}
      />
    </div>
  );
}
