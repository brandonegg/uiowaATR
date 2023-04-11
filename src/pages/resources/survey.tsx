import { type Dispatch, type SetStateAction, useEffect, useState } from "react";
import { GuidedSurvey, type Question, type QuestionTypes, type Option } from "~/components/Survey";

const questions: Question<QuestionTypes>[] = [
    {
        for: "ages",
        header: "Age of Patient",
        question: "How old is the patient?",
        maxSelect: 1,
        optional: true,
        options: [
            {
                label: "Child (0-10)",
                value: "0-9",
            },
            {
                label: "Teen (10-20)",
                value: "10-20",
            },
            {
                label: "Adult (21+)",
                value: "21-100",
            },
        ],
    },
    {
        for: "platforms",
        header: "Desired Platforms",
        question: "What platform(s) does the resource need to be on?",
        optional: true,
        options: [
            {
                label: "Apple (iOS)",
                value: "APP_IOS",
            },
            {
                label: "Android",
                value: "APP_ANDROID",
            },
            {
                label: "Web-Based",
                value: "WEBSITE",
            },
            {
                label: "PDF (printable)",
                value: "PDF",
            }
        ]
    },
    {
        for: "skills",
        header: "Skills Practiced",
        question: "What skill(s) would you like the resource to cover?",
        optional: true,
        options: [
            {
                label: "Phonemes",
                value: "PHONEMES",
            },
            {
                label: "Words",
                value: "WORDS",
            },
            {
                label: "Sentence",
                value: "SENTENCES",
            },
            {
                label: "Discourse/Complex",
                value: "DISCOURSE",
            },
            {
                label: "Music",
                value: "MUSIC",
            },
            {
                label: "Environmental Sounds",
                value: "ENVIRONMENT",
            },
        ]
    },
    {
        for: "skill_levels",
        header: "Skill Level",
        question: "What skill level(s) should the resource have?",
        optional: true,
        options: [
            {
                label: "Beginner",
                value: "BEGINNER",
            },
            {
                label: "Intermediate",
                value: "INTERMEDIATE",
            },
            {
                label: "Advanced",
                value: "ADVANCED",
            }
        ]
    },
]

const ChoiceQuestion = ({question, formData, updateFormData}: {question: Question<QuestionTypes>, formData: Record<string, QuestionTypes[]>, updateFormData: Dispatch<SetStateAction<Record<string, QuestionTypes[]>>>}) => {    
    const OptionToggle = ({option}: {option: Option<QuestionTypes>}) => {
        const selected = formData[question.for]?.includes(option.value) ?? false;
        
        const handleToggle = () => {
            const newFormData = {
                ...formData
            };

            if (!newFormData[question.for]) {
                newFormData[question.for] = [option.value];
            } else if (newFormData[question.for]?.includes(option.value)) {
                newFormData[question.for] = newFormData[question.for]?.filter(function(item) {
                    return item !== option.value
                }) ?? [];
            } else {
                newFormData[question.for] = [...newFormData[question.for] ?? [], option.value];
            }

            updateFormData(newFormData);
        }

        return (
            <button type="button" onClick={handleToggle} className={"mx-auto w-64 py-2 shadow rounded-lg border border-neutral-400 " + (selected ? "bg-amber-200" : "bg-white")}>
                {option.label}
            </button>
        )
    }

    useEffect(() => {
        if (!formData[question.for]) {
            const newFormData = {...formData};
            newFormData[question.for] = [];

            updateFormData(newFormData);
        }
    });

    const htmlOptions: JSX.Element[] = []
    const optionButtons: JSX.Element[] = []

    question.options.forEach((option, index) => {
        optionButtons.push(<OptionToggle key={index} option={option} />)
        htmlOptions.push(<option key={index} selected={formData[question.for]?.includes(option.value)} value={option.value.toString()}>{option.label}</option>)
    });
    
    return (
        <div className="text-center border-b border-neutral-400 py-4 mx-auto">
            <label htmlFor={question.for} className="font-bold border-b border-neutral-800 text-xl mb-2">{question.header}</label>
            <p className="text-md mb-2">{question.question}</p>
            <select className="hidden" name={question.for} multiple>
                {htmlOptions}
            </select>
            <div className="flex flex-col space-y-1 justify-center">
                {optionButtons}
            </div>
        </div>
    )
}

const SearchForm = ({questions}: {questions: Question<QuestionTypes>[]}) => {    
    const [formData, setFormData] = useState<(Record<string, QuestionTypes[]>)>({});
    
    const questionComponents = questions.map((question, index) => {
        return <ChoiceQuestion key={index} question={question} formData={formData} updateFormData={setFormData} />
    })

    return (
        <form action="/resources" className="py-4 flex flex-col">
            {questionComponents}
            <button className="mt-4 font-bold text-xl py-2 px-4 bg-white mx-auto rounded-xl border border-neutral-400 hover:border-neutral-800">search</button>
        </form>
    )
}

// const SearchPage = () => {
//     return <>
//         <div className="w-full max-w-xl mx-auto mt-4 mb-4 rounded-xl overflow-hidden border border-neutral-400 bg-neutral-200 drop-shadow-md">
//             <div className="px-4 py-2 bg-gradient-to-t from-neutral-900 to-neutral-700 mx-auto overflow-hidden">
//                 <h1 className="text-gray-300 font-bold">Search</h1>
//             </div>
//             <div>
//                 <SearchForm questions={questions} />
//             </div>
//         </div>
//     </>
// }

const SearchPage = () => {
    return (
        <div className="w-full max-w-xl mx-auto mt-4 mb-4 rounded-xl overflow-hidden border border-neutral-400 bg-neutral-200 drop-shadow-md">
            <GuidedSurvey questions={questions} />
        </div>
    )
}

export default SearchPage