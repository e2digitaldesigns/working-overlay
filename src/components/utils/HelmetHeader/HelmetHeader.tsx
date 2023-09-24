import React from "react";
import { Helmet } from "react-helmet";

interface HelmetHeaderProps {
  description?: string;
  title: string;
}

export const HelmetHeader: React.FC<HelmetHeaderProps> = ({
  description,
  title
}) => {
  return (
    <Helmet>
      <title>{title}</title>
      {description && <meta name="description" content={description} />}
    </Helmet>
  );
};
