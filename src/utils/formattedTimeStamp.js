export const formattedTime = (timestamp) => {
    const options = {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    };
  
    return new Date(timestamp).toLocaleTimeString(undefined, options);
  };