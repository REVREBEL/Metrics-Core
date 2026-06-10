import type { SVGProps } from "react";

const SvgBadge = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    data-name="Layer 1"
    viewBox="0 0 150 150"
    width="1em"
    height="1em"
    {...props}
  >
    <defs>
      <clipPath id="badge_svg__a">
        <path
          d="M27.22 22.73h95.57v104.55H27.22z"
          style={{
            fill: "none",
          }}
        />
      </clipPath>
    </defs>
    <path
      d="M122.78 49.29c0 51.15-37.19 77.46-47.94 77.46-9.97-.07-47.57-25.6-47.57-77.46 0-.95.13-1.88.4-2.79a9.8 9.8 0 0 1 3.06-4.67q1.095-.915 2.4-1.47l38.1-16.18q1.755-.75 3.66-.75c1.905 0 2.49.25 3.66.75l38.26 16.1c.88.38 1.68.88 2.41 1.5s1.36 1.32 1.89 2.12.93 1.66 1.22 2.57c.28.92.43 1.85.44 2.81Z"
      style={{
        clipPath: "url(#badge_svg__a)",
      }}
    />
  </svg>
);
export default SvgBadge;
