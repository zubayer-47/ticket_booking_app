import { useParams } from "react-router-dom";

export default function Counter() {
    const params = useParams();

    return (
        <div>{params?.id}</div>
    )
}
