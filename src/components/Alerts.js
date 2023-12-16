import React, { useState, useEffect } from 'react';

const Alerts = ({ message, onClose }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setVisible(false);
      onClose();
    }, 30000); // seconds alert is open for

    return () => clearTimeout(timeout);
  }, [onClose]);

  return (
    <div style={{ display: visible ? 'block' : 'none', backgroundColor: 'yellow', padding: '10px', margin: '10px' }}>
      {message}
    </div>
  );
};

export default Alerts;