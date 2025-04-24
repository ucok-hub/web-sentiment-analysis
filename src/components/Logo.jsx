export function Logo(props) {
  // If the Logo component uses specific class naming, we need to update it
  // The text-white class is added via props.className in the parent components
  return (
    <div className={props.className}>
      SensAShee
      {/* If there's an SVG or other elements, they would be here */}
    </div>
  )
}
