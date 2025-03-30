import clsx from "clsx";

export default function Container({ children, className }) {
    return (
        <div
            className={clsx("px-4 lg:px-2", className)}
        >
            {children}
        </div>
    );
}
