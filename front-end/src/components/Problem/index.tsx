import React from 'react'
import SectionProblem from './SectionProblem'
export default function Problem() {
    return (
        <div className='relative'>
            <section className="flex flex-col gap-24 py-24 lg:gap-0 lg:overflow-hidden">
                <SectionProblem
                    title="20% - 30%"
                    description={
                        <>
                            Sinh viên năm nhất nhận thấy ra mình
                            <br />
                            <a className="font-bold text-info hover:underline transform">
                                chọn sai ngành học
                            </a>
                            &nbsp;
                            và có ý định thay đổi ngành,
                            hoặc trường học ngay trong năm đầu tiên
                        </>
                    }
                    imageSrc="/images/Problem/1.svg"
                    imageAlt="Problem illustration"
                />

                <SectionProblem
                    title="30%"
                    description={
                        <>
                            Sinh viên cho biết họ
                            &nbsp;

                            <a className="font-bold text-info hover:underline transform">
                                cảm thấy không hứng thú
                            </a>
                            &nbsp;
                            với ngành học đang theo đuổi.
                        </>
                    }
                    imageSrc="/images/Problem/2.svg"
                    imageAlt="Problem illustration"
                    reverse
                />

                <SectionProblem
                    title="70%"
                    description={
                        <>
                            Học sinh cấp 3 khi chọn ngành học
                            <br />
                            <a className="font-bold text-info hover:underline transform">
                                dựa vào xu hướng
                            </a>,
                            mong muốn của gia đình hoặc theo định hướng của xã
                            hội mà
                            <br />
                            <a className="font-bold text-info hover:underline transform">
                                không xuất phát từ sở thích
                            </a>
                            &nbsp;
                            và năng lực cá nhân
                        </>
                    }
                    imageSrc="/images/Problem/3.svg"
                    imageAlt="Problem illustration"
                />
            </section>
        </div>
    )
}
