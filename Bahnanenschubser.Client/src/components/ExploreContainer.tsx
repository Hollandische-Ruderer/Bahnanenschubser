import React from 'react';
import './ExploreContainer.css';

interface ContainerProps {
    name?: string;
    children?: React.ReactNode;
}

const ExploreContainer: React.FC<ContainerProps> = ({ name, children }) => {
  return (
    <div className="container">
        {children}
    </div>
  );
};

export default ExploreContainer;
