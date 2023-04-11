import { type PaymentType, type Platform, type Skill, type SkillLevel } from "@prisma/client"
import { type Dispatch, type SetStateAction, useState, useEffect } from "react";

export type QuestionTypes = Platform | Skill | SkillLevel | PaymentType | string;

export interface Option<T> {
    label: string,
    value: T,
}

export interface Question<T> {
    for: string,
    header: string,
    question: string,
    optional: true,
    options: Option<T>[]
}

const GreetingPage = ({updatePage}: {
    updatePage: (pageNumber: number) => void,
}) => {
    const getStartedClick = () => {
        updatePage(1);
    }

    return (
        <div className="flex flex-col text-center">
            <h1 className="text-xl font-extrabold">Welcome to the resources survey!</h1>
            <p className="text-neutral-500 italic max-w-sm">We will ask a few questions about the patient and then recommend the best resources based on your answers!</p>
            <button onClick={getStartedClick} className="bottom-0 mt-8 py-2 px-4 bg-yellow-100 mx-auto rounded-md border border-neutral-900 ease-out duration-200 shadow-lg hover:shadow-md hover:bg-yellow-300">Get Started!</button>
        </div>
    )
}

/**
 * Single question component for a guided survey
 */
const QuestionPage = ({isLastPage, page, question, updatePage, formData, updateFormData}: {
    isLastPage: boolean,
    page: number,
    question: Question<QuestionTypes>,
    updatePage: (pageNumber: number) => void,
    formData: Record<string, QuestionTypes[]>,
    updateFormData: Dispatch<SetStateAction<Record<string, QuestionTypes[]>>>,
}) => {
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

    const nextClick = () => {
        updatePage(page + 1);
    }

    const backClick = () => {
        updatePage(page - 1);
    }

    const AdvanceButtons = () => {
        return (
            <section className="">
                {!isLastPage ? 
                <div className="space-x-4">
                    <button onClick={backClick} className="inline mx-auto bottom-0 mt-8 py-2 px-4 bg-yellow-100 mx-auto rounded-md border border-neutral-900 ease-out duration-200 shadow-lg hover:shadow-md hover:bg-yellow-300">back</button>
                    <button onClick={nextClick} className="inline mx-auto bottom-0 mt-8 py-2 px-4 bg-yellow-100 mx-auto rounded-md border border-neutral-900 ease-out duration-200 shadow-lg hover:shadow-md hover:bg-yellow-300">next</button>
                </div>
                :
                <div className="flex flex-col space-y-2 mt-4">
                    <button onClick={backClick} className="mx-auto bottom-0 py-2 px-4 bg-yellow-100 mx-auto rounded-md border border-neutral-900 ease-out duration-200 shadow-lg hover:shadow-md hover:bg-yellow-300">back</button>
                    <button form="survey-form" type="submit" className="mx-auto bottom-0 py-2 px-4 bg-yellow-100 mx-auto rounded-md border border-neutral-900 ease-out duration-200 shadow-lg hover:shadow-md hover:bg-yellow-300">submit</button>
                </div>
                }
            </section>
        )
    };

    return (
        <div className="p-8 h-full flex flex-col justify-between text-center">
            <section>
                <h2></h2>
                <h1>{question.question}</h1>
            </section>

            <section className="flex flex-col space-y-1 justify-center">
                {question.options.map((option, index) => {
                    return (
                        <OptionToggle key={index} option={option} />
                    );
                })}
            </section>
            <AdvanceButtons />
        </div>
    )
}

const PageTransition = ({lastPage, currentPage}: {
    lastPage: JSX.Element | null,
    currentPage: JSX.Element,
}) => {
    return (
        <div className={"h-[450px] w-[200%] flex flex-row-reverse translate-x-[-50%] animate-slide_survey_page"}>    
            <div className="relative w-1/2 h-full grid place-items-center">
                {currentPage}
            </div>

            {/** last page */}
            <div className="relative w-1/2 h-full grid place-items-center">
                {lastPage}
            </div>
        </div>
    );
};

/**
 * Main guided survey component.
 * Page 0 = greeting page.
 */
const GuidedSurvey = ({questions}: {
    questions: Question<QuestionTypes>[],
}) => {
    const [page, setPage] = useState<number>(0);
    const [formData, setFormData] = useState<(Record<string, QuestionTypes[]>)>({});
    const [previousPage, setPreviousPage] = useState<number | undefined>(undefined);

    const updatePage = (pageNumber: number) => {
        setPreviousPage(page);
        setPage(pageNumber);
    };

    const SurveyPage = ({pageNumber}: {
        pageNumber?: number,
    }) => {
        if (pageNumber === undefined) {
            return null;
        }

        if (pageNumber === 0) {
            return (
                <GreetingPage updatePage={updatePage} />
            );
        }

        const question = questions[pageNumber-1];
        if (!question) {
            return null;
        }

        const isLastPage = pageNumber === questions.length
    
        return (
            <QuestionPage isLastPage={isLastPage} page={page} formData={formData} updateFormData={setFormData} updatePage={updatePage} question={question} />
        );
    }

    /**
     * Renders the hidden html form selectors
     */
    const HTMLQuestion = ({question}: {question: Question<QuestionTypes>}) => {
        return (
            <select className="hidden" name={question.for} multiple>
                {question.options.map((option, index) => {
                        return (
                            <option key={index} selected={formData[question.for]?.includes(option.value)} value={option.value.toString()}>
                                {option.label}
                            </option>
                        );
                    })
                }
            </select>
        );
    }

    const lastPage = <SurveyPage pageNumber={previousPage} />;
    const currentPage = <SurveyPage pageNumber={page} />;

    return (
        <div>
            <div className="px-4 py-2 bg-gradient-to-t from-neutral-900 to-neutral-700 mx-auto overflow-hidden">
                <h1 className="text-gray-300 font-bold">Search</h1>
            </div>

            <PageTransition key={page} lastPage={lastPage} currentPage={currentPage}/>

            {/** Hidden html */}
            <form action="/resources" id='survey-form' className="hidden">
                {questions.map((question, index) => {
                    return <HTMLQuestion key={index} question={question} />
                })}
            </form>
        </div>
    )
}

export {
    GuidedSurvey,
}
