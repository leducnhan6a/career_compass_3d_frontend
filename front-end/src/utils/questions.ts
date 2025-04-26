// utils/questions.js
import data from './db.json'; // bạn có thể tách JSON ra file holland.json

export const getSurveyQuestions = () => {
    return data.data.flatMap((group) =>
        group.HollandCode_traits.map((trait, index) => ({
            code: group.HollandCode_code,
            group: group.HollandCode_name,
            question: trait,
            id: `${group.HollandCode_code}_${index + 1}`,
        }))
    );
};
