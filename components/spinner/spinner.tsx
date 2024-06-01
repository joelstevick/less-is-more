// Spinner.js
import React from 'react';
import { ClipLoader } from 'react-spinners';

const Spinner = () => {
  return (
    <div style={styles.spinnerContainer}>
      <ClipLoader color={"#ffffcc"} loading={true} size={50} />
    </div>
  );
};

const styles = {
  spinnerContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
};

export default Spinner;
