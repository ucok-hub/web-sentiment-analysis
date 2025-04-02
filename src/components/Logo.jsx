export function Logo(props) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 500 120" // Wider aspect ratio similar to old logo
      style={{ width: 'auto', height: '70px' }} // Match previous logo's height
      {...props}
    >
      {/* Circular graphic element */}
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M201.63 82.553c0 11.046 8.954 20 20 20s20-8.954 20-20-8.954-20-20-20-20 8.954-20 20Zm20 16c-7.264 0-13.321-5.163-14.704-12.02-0.326-1.622 1.047-2.98 2.704-2.98h24c1.657 0 3.031 1.357 2.704 2.98-1.383 6.857-7.439 12.02-14.704 12.02Z"
        fill="#2563EB"
      />

      {/* Text element - properly positioned */}
      <text
        fill="#333"
        fontFamily="Helvetica"
        fontSize="45"
        fontWeight="700"
        x="250"
        y="97" // Adjusted to positive value within viewBox
      >
        <tspan fill="#333">SensA</tspan>
        <tspan fill="#2563EB">Shee</tspan>
      </text>
    </svg>
  )
}
