import clsx from 'clsx'

export default function Container({children, className}) {
  return (
    <div className={clsx("container px-2 py-2", className)}>{children}</div>
  )
}
