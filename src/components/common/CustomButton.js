import { withStyles } from "@material-ui/core/styles";
import Button from '@material-ui/core/Button';

export const CustomButton = withStyles((theme) => ({
  root: {
    color: theme.palette.getContrastText(theme.palette.info.main),
    fontSize: theme.spacing(2),
    backgroundColor: theme.palette.info.main,
    '&:hover': {
      backgroundColor: theme.palette.info.main,
    }
  },
}))(Button);

CustomButton.propTypes = {
  // if I wanted to add another button color
};