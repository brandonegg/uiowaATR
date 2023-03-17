import { type PaymentType, type Platform, type RangeInput, type Skill, type SkillLevel } from "@prisma/client"
import { useState } from "react";

type QuestionTypes = Platform | Skill | SkillLevel | PaymentType | RangeInput;

interface Option<T> {
    label: string,
    value: T,
}

interface Question<T> {
    header: string,
    options: Option<T>[]
}

const questions: Question<QuestionTypes>[] = [
    {
        header: "Age of Patient",
        options: [
            {
                label: "Child",
                value: {min: 0, max: 9}
            },
            {
                label: "Teen",
                value: {min: 10, max:20}
            },
            {
                label: "Adult",
                value: {min: 21, max: 100}
            },
        ],
    },
    {
        header: "Desired Platforms",
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
        header: "Skill Level",
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
    {
        header: "Skills Practiced",
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
    }
]

const ChoiceQuestion = ({question}: {question: Question<QuestionTypes>}) => {
    const Option = ({option}: {option: Option<QuestionTypes>}) => {
        const [selected, setSelected] = useState<boolean>(false);

        const handleToggle = () => {
            setSelected(!selected);
        }

        return (
            <div>
                <button onChange={handleToggle} className={"w-64 shadow rounded-lg border border-neutral-400 " + (selected ? "bg-amber-200" : "bg-white")} type="button" onClick={handleToggle}>
                    <span className="text-xl">{option.label}</span>
                    <input onChange={()=>{return;}} className="hidden" name={option.label} checked={selected} type="checkbox" value={option.value.toString()} />
                </button>
            </div>
        )
    }

    const optionsComponents = question.options.map((option, index) => {
        return <Option key={index} option={option} />
    });
    
    return (
        <div className="text-center border-b border-neutral-400 py-4 mx-auto">
            <h1 className="font-bold text-xl mb-2">{question.header}</h1>
            <div className="space-y-2">
                {optionsComponents}
            </div>
        </div>
    )
}

const SearchForm = ({questions}: {questions: Question<QuestionTypes>[]}) => {
    const questionComponents = questions.map((question, index) => {
        return <ChoiceQuestion key={index} question={question} />
    })

    return (
        <form className="py-4 flex flex-col">
            {questionComponents}
            <button className="pt-4 font-bold text-xl">Search</button>
        </form>
    )
}

const SearchPage = () => {
    return <>
        <div className="w-full max-w-xl mx-auto mt-4 mb-4 rounded-xl overflow-hidden bg-neutral-200 drop-shadow-md">
            <div className="px-4 py-2 bg-gradient-to-t from-neutral-900 to-neutral-700 mx-auto overflow-hidden border border-neutral-400">
                <h1 className="text-gray-300 font-bold">Search</h1>
            </div>
            <div>
                <SearchForm questions={questions} />
            </div>
        </div>
    </>
}

export default SearchPage