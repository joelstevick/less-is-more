// Spinner.js
import React from 'react';
import { ClipLoader } from 'react-spinners';

const Spinner = () => {
  return (
    <div style={styles.spinnerContainer}>
      <ClipLoader color={"#123abc"} loading={true} size={150} />
    </div>
  );
};

const styles = {
  spinnerContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
  },
};

export default Spinner;
