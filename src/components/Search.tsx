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
    maxSelect?: number,
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
            <h1 className="text-center text-xl font-extrabold mb-8 max-w-sm">Welcome to the auditory training resource search tool!</h1>
            <p className="mx-auto text-center text-neutral-500 italic max-w-sm">We will ask a few questions about the patient and then recommend the best auditory training resources based on your answers!</p>
            <button onClick={getStartedClick} className="bottom-0 mt-8 py-2 px-4 bg-yellow-100 mx-auto rounded-md border border-neutral-900 ease-out duration-200 shadow-lg hover:shadow-md hover:bg-yellow-300">Get Started!</button>
        </div>
    )
}

/**
 * Single question component for a guided search
 */
const QuestionPage = ({isLastPage, page, question, updatePage, formData, updateFormData, dontCareData, setDontCareData}: {
    isLastPage: boolean,
    page: number,
    question: Question<QuestionTypes>,
    updatePage: (pageNumber: number) => void,
    formData: Record<string, QuestionTypes[]>,
    updateFormData: Dispatch<SetStateAction<Record<string, QuestionTypes[]>>>,
    dontCareData: Record<string, boolean>,
    setDontCareData: Dispatch<SetStateAction<Record<string, boolean>>>,

}) => {
    const dontCare = dontCareData[question.for] ?? false;

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

        if (dontCare) {
            return (
                <button disabled type="button" onClick={handleToggle} className={"line-through mx-auto w-64 py-2 shadow rounded-lg border border-neutral-400 " + (selected ? "bg-amber-200" : "bg-white")}>
                    {option.label}
                </button>
            )
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

    const dontCareToggle = () => {
        if (formData[question.for]) {
            const newFormData = {
                ...formData
            };

            newFormData[question.for] = [];
            updateFormData(newFormData);
        }

        const newDontCareData = {
            ...dontCareData
        }

        newDontCareData[question.for] = !dontCare;
        setDontCareData(newDontCareData);
    }

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
                    <button onClick={backClick} className="inline mx-auto bottom-0 py-2 px-4 bg-yellow-100 mx-auto rounded-md border border-neutral-900 ease-out duration-200 shadow-lg hover:shadow-md hover:bg-yellow-300">back</button>
                    <button onClick={nextClick} className="inline mx-auto bottom-0 py-2 px-4 bg-yellow-100 mx-auto rounded-md border border-neutral-900 ease-out duration-200 shadow-lg hover:shadow-md hover:bg-yellow-300">next</button>
                </div>
                :
                <div className="flex flex-col space-y-2 mt-4">
                    <button onClick={backClick} className="mx-auto bottom-0 py-2 px-4 bg-yellow-100 mx-auto rounded-md border border-neutral-900 ease-out duration-200 shadow-lg hover:shadow-md hover:bg-yellow-300">back</button>
                    <button form="search-form" type="submit" className="mx-auto bottom-0 py-2 px-4 bg-yellow-100 mx-auto rounded-md border border-neutral-900 ease-out duration-200 shadow-lg hover:shadow-md hover:bg-yellow-300">submit</button>
                </div>
                }
            </section>
        )
    };

    return (
        <div className="h-full flex flex-col justify-between text-center">
            <section className="mt-4">
                <h2 className="text-neutral-400 italic text-xl">{question.header}</h2>
                <h1 className="text-neutral-900 font-bold text-xl">{question.question}</h1>
                <h3 className="text-neutral-600 text-sm">Select all that apply from below</h3>
            </section>

            <section className="flex flex-col space-y-1 justify-center">
                {question.options.map((option, index) => {
                    return (
                        <OptionToggle key={index} option={option} />
                    );
                })}
            </section>
            {question.optional ?
                <button type="button" onClick={dontCareToggle} className={"mx-auto w-64 py-2 shadow rounded-lg border border-neutral-400 " + (dontCare ? "bg-amber-200" : "bg-white")}>
                    No Preference
                </button>
            : undefined}
            <div className="mb-4">
                <AdvanceButtons />
            </div>
        </div>
    )
}

/**
 * Wrapper for last and current page to enable the transition animation
 */
const PageTransition = ({backwards, lastPage, currentPage}: {
    backwards: boolean,
    lastPage: JSX.Element | null,
    currentPage: JSX.Element,
}) => {
    return (
        <div className={"h-[500px] w-[200%] flex " + (backwards ? "flex-row animate-slide_search_page_backwards" : "flex-row-reverse translate-x-[-50%] animate-slide_search_page")}>    
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
 * Main guided search component.
 * Page 0 = greeting page.
 */
const GuidedSearch = ({questions}: {
    questions: Question<QuestionTypes>[],
}) => {
    const [page, setPage] = useState<number>(0);
    const [formData, setFormData] = useState<(Record<string, QuestionTypes[]>)>({});
    const [dontCareData, setDoneCareData] = useState<(Record<string, boolean>)>({});
    const [previousPage, setPreviousPage] = useState<number | undefined>(undefined);

    const updatePage = (pageNumber: number) => {
        setPreviousPage(page);
        setPage(pageNumber);
    };

    const SearchPage = ({pageNumber}: {
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
            <QuestionPage dontCareData={dontCareData} setDontCareData={setDoneCareData} isLastPage={isLastPage} page={page} formData={formData} updateFormData={setFormData} updatePage={updatePage} question={question} />
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

    const lastPage = <SearchPage pageNumber={previousPage} />;
    const currentPage = <SearchPage pageNumber={page} />;
    const backwards = (previousPage ?? -1) >= page;

    return (
        <div>
            <div className="px-4 py-2 bg-gradient-to-t from-neutral-900 to-neutral-700 mx-auto overflow-hidden">
                <h1 className="text-gray-300 font-bold">Search</h1>
            </div>

            <PageTransition backwards={backwards} key={page} lastPage={lastPage} currentPage={currentPage}/>

            {/** Hidden html */}
            <form action="/resources" id='search-form' className="hidden">
                {questions.map((question, index) => {
                    return <HTMLQuestion key={index} question={question} />
                })}
            </form>
        </div>
    )
}

export {
    GuidedSearch,
}