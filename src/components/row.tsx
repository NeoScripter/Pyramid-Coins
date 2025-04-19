type RowProps = {
    children: React.ReactNode;
};
export default function Row({ children }: RowProps) {
    return <div className="h-18 flex items-center justify-center gap-2">
        {children}
    </div>;
}
