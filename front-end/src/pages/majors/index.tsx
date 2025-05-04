import { useEffect, useState } from "react";
import Link from "next/link";

export interface Major {
    _id: string
    uni_code: string
    major_name: string
    major_standard_score: number
    major_aptitude_trends: string[]
}
const MajorsPage = () => {
    const [majors, setMajors] = useState<Major[]>([]);

    useEffect(() => {
        const fetchMajors = async () => {
            try {
                const res = await fetch('/api/v1/majors');
                const data = await res.json();
                setMajors(data);
            } catch (error) {
                console.error('Error fetching majors:', error);
            }
        };

        fetchMajors();
    }, []);

    return (
        <div>
            <h1>Danh Sách Các Chuyên Ngành</h1>
            <ul>
                {majors.map((major) => (
                    <li key={major._id}>
                        <Link href={`./majors/${major._id}`}>
                            {major.major_name}
                        </Link>
                        <button onClick={() => handleDelete(major._id)}>Xóa</button>
                    </li>
                ))}
            </ul>
            <Link href="/majors/create">
                Tạo mới chuyên ngành
            </Link>
        </div>
    );

    function handleDelete(majorId: string) {
        if (confirm("Bạn có chắc muốn xóa chuyên ngành này?")) {
            fetch(`/api/v1/majors/delete/${majorId}`, { method: 'DELETE' })
                .then((response) => response.json())
                .then(() => setMajors(majors.filter((major) => major._id !== majorId)))
                .catch((error) => console.error('Error deleting major:', error));
        }
    }
};

export default MajorsPage;
