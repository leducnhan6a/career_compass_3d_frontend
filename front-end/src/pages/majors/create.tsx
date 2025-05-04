import { useState } from "react";
import { useRouter } from "next/router";

const CreateMajor = () => {
    const [majorName, setMajorName] = useState("");
    const [aptitudeTrends, setAptitudeTrends] = useState("");
    const router = useRouter();

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        const response = await fetch("/api/v1/majors/create", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                major_name: majorName,
                major_aptitude_trends: aptitudeTrends.split(","),
            }),
        });

        const data = await response.json();
        if (data._id) {
            router.push("/majors");
        } else {
            console.error("Failed to create major");
        }
    };

    return (
        <div>
            <h1>Tạo Mới Chuyên Ngành</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Chuyên Ngành</label>
                    <input
                        type="text"
                        value={majorName}
                        onChange={(e) => setMajorName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Xu Hướng Năng Lực</label>
                    <input
                        type="text"
                        value={aptitudeTrends}
                        onChange={(e) => setAptitudeTrends(e.target.value)}
                        required
                        placeholder="E, R, C"
                    />
                </div>
                <button type="submit">Tạo Chuyên Ngành</button>
            </form>
        </div>
    );
};

export default CreateMajor;
