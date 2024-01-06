import { LoaderIcon } from "lucide-react";

export default function Loading() {
    return (
        <main className="container h-[90vh] center-item">
            <LoaderIcon className="w-12 h-12 text-white animate-spin" />
        </main>
    )
}