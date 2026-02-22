import "./LoadingIndicator.css";
import React from "react";

interface LoadingIndicatorProps {
  action?: string;
}

const LoadingIndicator: React.FC<LoadingIndicatorProps> = ({ action }) => {
  return (
    <div className="progress-cover">
      <progress className="progress is-small is-primary">Loading</progress>
      <p>
        {action && (
          <>
            {action} <br />
          </>
        )}
        This will take just a moment
      </p>
    </div>
  );
};

export default LoadingIndicator;
