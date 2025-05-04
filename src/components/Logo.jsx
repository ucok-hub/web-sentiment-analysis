import Image from 'next/image'

export function Logo(props) {
  return (
    <span
      className={`flex items-center ${props.className || ''}`}
      style={props.style}
    >
      <Image
        src="/logo.svg"
        alt="SensAShee Logo"
        width={128}
        height={128}
        priority={props.priority}
      />
      <span className="ml-[-6px] hidden text-xl font-bold text-orange-500 select-none sm:inline">
        SensAShee
      </span>
    </span>
  )
}
