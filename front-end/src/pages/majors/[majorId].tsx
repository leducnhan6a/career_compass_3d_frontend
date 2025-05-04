import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Major } from ".";

const MajorDetail = () => {
    const router = useRouter();
    const { majorId } = router.query;
    const [major, setMajor] = useState<Major>();

    useEffect(() => {
        if (majorId) {
            fetch(`/api/v1/majors/${majorId}`)
                .then((response) => response.json())
                .then((data) => setMajor(data))
                .catch((error) => console.error("Error fetching major:", error));
        }
    }, [majorId]);

    const handleDelete = async () => {
        if (confirm("Bạn có chắc muốn xóa chuyên ngành này?")) {
            await fetch(`/api/v1/majors/delete/${majorId}`, { method: "DELETE" });
            router.push("/majors");
        }
    };

    if (!major) return <div>Loading...</div>;

    return (
        <div>
            <h1>{major.major_name}</h1>
            <p>Xu hướng năng lực: {major.major_aptitude_trends.join(", ")}</p>
            <button onClick={() => router.push(`/majors/update/${majorId}`)}>
                Cập nhật
            </button>
            <button onClick={handleDelete}>Xóa</button>
        </div>
    );
};

export default MajorDetail;
