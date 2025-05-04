import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const UpdateMajor = () => {
    const router = useRouter();
    const { majorId } = router.query;
    const [major, setMajor] = useState({
        major_name: "",
        major_aptitude_trends: "",
    });

    useEffect(() => {
        if (majorId) {
            fetch(`/api/v1/majors/${majorId}`)
                .then((response) => response.json())
                .then((data) => setMajor(data))
                .catch((error) => console.error("Error fetching major:", error));
        }
    }, [majorId]);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        const response = await fetch(`/api/v1/majors/update/${majorId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                major_name: major.major_name,
                major_aptitude_trends: major.major_aptitude_trends.split(","),
            }),
        });

        const data = await response.json();
        if (data._id) {
            router.push("/majors");
        } else {
            console.error("Failed to update major");
        }
    };

    return (
        <div>
            <h1>Cập Nhật Chuyên Ngành</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Chuyên Ngành</label>
                    <input
                        type="text"
                        value={major.major_name}
                        onChange={(e) => setMajor({ ...major, major_name: e.target.value })}
                        required
                    />
                </div>
                <div>
                    <label>Xu Hướng Năng Lực</label>
                    <input
                        type="text"
                        value={major.major_aptitude_trends}
                        onChange={(e) =>
                            setMajor({
                                ...major,
                                major_aptitude_trends: e.target.value,
                            })
                        }
                        required
                        placeholder="E, R, C"
                    />
                </div>
                <button type="submit">Cập Nhật</button>
            </form>
        </div>
    );
};

export default UpdateMajor;
