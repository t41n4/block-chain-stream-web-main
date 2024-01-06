import { Eye } from "lucide-react";

type FollowerCountProps = {
    viewerCount: number;
} & React.HTMLProps<HTMLButtonElement>;

const ViewersCount = (props: FollowerCountProps) => {
    const { viewerCount } = props;
    return (
        <div className="flex flex-row justify-center px-2 gap-1 items-center rounded-full bg-beta ">
            <Eye size={20} />
            <p className="text-white text-center text-sm font-bold">
                {viewerCount}
            </p>
        </div>
    );
};

ViewersCount.displayName = "ViewersCount";

export default ViewersCount;
