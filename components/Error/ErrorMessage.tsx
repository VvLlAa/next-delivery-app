import React from 'react';

export const ErrorMessage = ({ message }: { message: string }) => {
  return (
    <div>
      <h1>{message}</h1>
      <p>Пожалуйста, попробуйте позже.</p>
    </div>
  );
};
