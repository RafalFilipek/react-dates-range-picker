import { PropTypes } from 'react';

export default PropTypes.shape({
  subtract: PropTypes.func.isRequired,
  isBefore: PropTypes.func.isRequired,
  isAfter: PropTypes.func.isRequired,
  isBetween: PropTypes.func.isRequired,
  isSame: PropTypes.func.isRequired,
  isValid: PropTypes.func.isRequired,
});
