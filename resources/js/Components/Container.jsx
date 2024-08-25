import clsx from "clsx";

export default function Container({ children, className }) {
    return (
        <div
            className={clsx("max-w-screen-2xl mx-auto px-4 sm:px-6", className)}
        >
            {children}
        </div>
    );
}
