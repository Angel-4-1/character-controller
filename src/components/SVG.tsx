import { FC } from "react";

interface SVGProps {
  d: string | string[];
}

export const SVG: FC<SVGProps> = ({
  d,
}) => {
  const pathData = Array.isArray(d) ? d : [d];

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className="size-6"
    >
      {pathData.map((path, index) => (
        <path
          key={index}
          strokeLinecap="round"
          strokeLinejoin="round"
          d={path}
        />
      ))}
    </svg>
  )
}