import type { SVGProps } from "react";

const SvgInfo = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    viewBox="0 0 18 18"
    {...props}
  >
    <path
      fillRule="evenodd"
      d="M9 0a9 9 0 1 0 0 18A9 9 0 0 0 9 0m-.222 1.99a1.519 1.519 0 1 1 0 3.038 1.519 1.519 0 0 1 0-3.037m2.6 13.652H6.581v-1.438l.69-.058c.377-.04.61-.248.61-.625V8.09c0-.22-.056-.37-.127-.449-.072-.078-.218-.117-.4-.117l-.691-.04V5.89h3.494v7.633c0 .377.193.586.57.625l.65.058z"
    />
  </svg>
);
export default SvgInfo;
