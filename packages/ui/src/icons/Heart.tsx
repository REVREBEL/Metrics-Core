import type { SVGProps } from "react";

const SvgHeart = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    viewBox="0 0 18 18"
    {...props}
  >
    <path
      fillRule="evenodd"
      d="m15.831 10.749-6.296 5.995c-.09.09-.27.179-.45.179s-.36-.09-.45-.18L2.34 10.75C2.249 10.659 0 8.691 0 6.275c0-2.952 1.799-4.652 4.767-4.652 1.8 0 3.418 1.342 4.228 2.147.81-.805 2.429-2.147 4.227-2.147 2.969 0 4.768 1.79 4.768 4.652.18 2.416-2.07 4.384-2.159 4.474"
    />
  </svg>
);
export default SvgHeart;
