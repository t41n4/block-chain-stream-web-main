import * as Alert from "@modules/common/components/ui/alert";
import { Button } from "@modules/common/components/ui/button";
import { AlertCircleIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

type Props = {
    fallbackPath?: string;
} & React.HTMLAttributes<HTMLDivElement>;

const AlertLogin: React.FC<Props> = ({ className, fallbackPath, ...props }: Props) => {
    //remove first slash
    const processFallbackPath = fallbackPath?.replace(/^\//, "");
    return (
        <Alert.Alert className="flex  flex-1 flex-col  center-item rounded-2xl border border-se shadow-2xl bg-feldgrau text-white p-3">
            <div className="flex gap-2 justify-center items-center pt-3 ">
                <AlertCircleIcon className="w-8 h-8 " />
                <Alert.AlertTitle>Attention</Alert.AlertTitle>
            </div>
            <div>
                <Alert.AlertDescription className="p-5">
                    You are not logged in. Please <Link href='/login'>login</Link> or <Link href='/register'>register</Link> to view this page.
                </Alert.AlertDescription>
                <div className="flex mt-1 center-item">
                    <button onClick={(e) => {
                        const button = e.target as HTMLButtonElement;
                        button.classList.toggle("potato__button--active");
                    }} className="potato__button">
                        <span className="w-full h-full">
                            <Link className="w-full h-full center-item text-center" href={`/login?fallback=${processFallbackPath}`}>Login</Link>
                        </span>
                    </button>
                </div>
            </div>
        </Alert.Alert >
    );
};

export default AlertLogin;
