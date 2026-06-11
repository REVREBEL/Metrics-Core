type SubNavProps = React.HTMLAttributes<HTMLDivElement>

export function SubNav({ className, ...props }: SubNavProps) {
    return (
        <div className={className} {...props} />
    )
}