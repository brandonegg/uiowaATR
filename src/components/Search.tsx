import {
  type PaymentType,
  type Platform,
  type Skill,
  type SkillLevel,
} from "@prisma/client";
import { type Dispatch, type SetStateAction, useState, useEffect } from "react";
import { TopLabel } from "./Labels";

export type QuestionTypes =
  | Platform
  | Skill
  | SkillLevel
  | PaymentType
  | string;

export interface Option<T> {
  label: string;
  value: T;
}

export interface Question<T> {
  for: string;
  header: string;
  question: string;
  maxSelect?: number;
  optional: true;
  options: Option<T>[];
}

const GreetingPage = ({
  updatePage,
}: {
  updatePage: (pageNumber: number) => void;
}) => {
  const getStartedClick = () => {
    updatePage(1);
  };

  return (
    <div className="flex flex-col text-center">
      <h1 className="mb-8 max-w-sm text-center text-xl font-extrabold">
        Welcome to the auditory training resource search tool!
      </h1>
      <p className="mx-auto max-w-sm text-center italic text-neutral-500">
        We will ask a few questions about the patient and then recommend the
        best auditory training resources based on your answers!
      </p>
      <button
        onClick={getStartedClick}
        className="bottom-0 mx-auto mt-8 rounded-md border border-neutral-900 bg-yellow-100 py-2 px-4 shadow-lg duration-200 ease-out hover:bg-yellow-300 hover:shadow-md"
      >
        Get Started!
      </button>
    </div>
  );
};

/**
 * Single question component for a guided search
 */
const QuestionPage = ({
  isLastPage,
  page,
  question,
  updatePage,
  formData,
  updateFormData,
  dontCareData,
  setDontCareData,
}: {
  isLastPage: boolean;
  page: number;
  question: Question<QuestionTypes>;
  updatePage: (pageNumber: number) => void;
  formData: Record<string, QuestionTypes[]>;
  updateFormData: Dispatch<SetStateAction<Record<string, QuestionTypes[]>>>;
  dontCareData: Record<string, boolean>;
  setDontCareData: Dispatch<SetStateAction<Record<string, boolean>>>;
}) => {
  const dontCare = dontCareData[question.for] ?? false;

  const OptionToggle = ({ option }: { option: Option<QuestionTypes> }) => {
    const selected = formData[question.for]?.includes(option.value) ?? false;

    const handleToggle = () => {
      const newFormData = {
        ...formData,
      };

      if (!newFormData[question.for]) {
        newFormData[question.for] = [option.value];
      } else if (newFormData[question.for]?.includes(option.value)) {
        newFormData[question.for] =
          newFormData[question.for]?.filter(function (item) {
            return item !== option.value;
          }) ?? [];
      } else {
        newFormData[question.for] = [
          ...(newFormData[question.for] ?? []),
          option.value,
        ];
      }

      updateFormData(newFormData);
    };

    if (dontCare) {
      return (
        <button
          disabled
          type="button"
          onClick={handleToggle}
          className={
            "mx-auto w-64 rounded-lg border border-neutral-400 py-2 line-through shadow " +
            (selected ? "bg-amber-200" : "bg-white")
          }
        >
          {option.label}
        </button>
      );
    }

    return (
      <button
        type="button"
        onClick={handleToggle}
        className={
          "mx-auto w-64 rounded-lg border border-neutral-400 py-2 shadow " +
          (selected ? "bg-amber-200" : "bg-white")
        }
      >
        {option.label}
      </button>
    );
  };

  useEffect(() => {
    if (!formData[question.for]) {
      const newFormData = { ...formData };
      newFormData[question.for] = [];

      updateFormData(newFormData);
    }
  });

  const dontCareToggle = () => {
    if (formData[question.for]) {
      const newFormData = {
        ...formData,
      };

      newFormData[question.for] = [];
      updateFormData(newFormData);
    }

    const newDontCareData = {
      ...dontCareData,
    };

    newDontCareData[question.for] = !dontCare;
    setDontCareData(newDontCareData);
  };

  const nextClick = () => {
    updatePage(page + 1);
  };

  const backClick = () => {
    updatePage(page - 1);
  };

  const AdvanceButtons = () => {
    return (
      <section className="">
        {!isLastPage ? (
          <div className="space-x-4">
            <button
              onClick={backClick}
              className="bottom-0 mx-auto mx-auto inline rounded-md border border-neutral-900 bg-yellow-100 py-2 px-4 shadow-lg duration-200 ease-out hover:bg-yellow-300 hover:shadow-md"
            >
              back
            </button>
            <button
              onClick={nextClick}
              className="bottom-0 mx-auto mx-auto inline rounded-md border border-neutral-900 bg-yellow-100 py-2 px-4 shadow-lg duration-200 ease-out hover:bg-yellow-300 hover:shadow-md"
            >
              next
            </button>
          </div>
        ) : (
          <div className="mt-4 flex flex-col space-y-2">
            <button
              onClick={backClick}
              className="bottom-0 mx-auto mx-auto rounded-md border border-neutral-900 bg-yellow-100 py-2 px-4 shadow-lg duration-200 ease-out hover:bg-yellow-300 hover:shadow-md"
            >
              back
            </button>
            <button
              form="search-form"
              type="submit"
              className="bottom-0 mx-auto mx-auto rounded-md border border-neutral-900 bg-yellow-100 py-2 px-4 shadow-lg duration-200 ease-out hover:bg-yellow-300 hover:shadow-md"
            >
              submit
            </button>
          </div>
        )}
      </section>
    );
  };

  return (
    <div className="flex h-full flex-col justify-between text-center">
      <section className="mt-4">
        <h2 className="text-xl italic text-neutral-400">{question.header}</h2>
        <h1 className="text-xl font-bold text-neutral-900">
          {question.question}
        </h1>
        <h3 className="text-sm text-neutral-600">
          Select all that apply from below
        </h3>
      </section>

      <section className="flex flex-col justify-center space-y-1">
        {question.options.map((option, index) => {
          return <OptionToggle key={index} option={option} />;
        })}
      </section>
      {question.optional ? (
        <button
          type="button"
          onClick={dontCareToggle}
          className={
            "mx-auto w-64 rounded-lg border border-neutral-400 py-2 shadow " +
            (dontCare ? "bg-amber-200" : "bg-white")
          }
        >
          No Preference
        </button>
      ) : undefined}
      <div className="mb-4">
        <AdvanceButtons />
      </div>
    </div>
  );
};

/**
 * Wrapper for last and current page to enable the transition animation
 */
const PageTransition = ({
  backwards,
  lastPage,
  currentPage,
}: {
  backwards: boolean;
  lastPage: JSX.Element | null;
  currentPage: JSX.Element;
}) => {
  return (
    <div
      className={
        "flex h-[500px] w-[200%] " +
        (backwards
          ? "animate-slide_search_page_backwards flex-row"
          : "translate-x-[-50%] animate-slide_search_page flex-row-reverse")
      }
    >
      <div className="relative grid h-full w-1/2 place-items-center">
        {currentPage}
      </div>

      {/** last page */}
      <div className="relative grid h-full w-1/2 place-items-center">
        {lastPage}
      </div>
    </div>
  );
};

/**
 * Main guided search component.
 * Page 0 = greeting page.
 */
const GuidedSearch = ({
  questions,
}: {
  questions: Question<QuestionTypes>[];
}) => {
  const [page, setPage] = useState<number>(0);
  const [formData, setFormData] = useState<Record<string, QuestionTypes[]>>({});
  const [dontCareData, setDoneCareData] = useState<Record<string, boolean>>({});
  const [previousPage, setPreviousPage] = useState<number | undefined>(
    undefined
  );

  const updatePage = (pageNumber: number) => {
    setPreviousPage(page);
    setPage(pageNumber);
  };

  const SearchPage = ({ pageNumber }: { pageNumber?: number }) => {
    if (pageNumber === undefined) {
      return null;
    }

    if (pageNumber === 0) {
      return <GreetingPage updatePage={updatePage} />;
    }

    const question = questions[pageNumber - 1];
    if (!question) {
      return null;
    }

    const isLastPage = pageNumber === questions.length;

    return (
      <QuestionPage
        dontCareData={dontCareData}
        setDontCareData={setDoneCareData}
        isLastPage={isLastPage}
        page={page}
        formData={formData}
        updateFormData={setFormData}
        updatePage={updatePage}
        question={question}
      />
    );
  };

  /**
   * Renders the hidden html form selectors
   */
  const HTMLQuestion = ({
    question,
  }: {
    question: Question<QuestionTypes>;
  }) => {
    return (
      <select className="hidden" name={question.for} multiple>
        {question.options.map((option, index) => {
          return (
            <option
              key={index}
              selected={formData[question.for]?.includes(option.value)}
              value={option.value.toString()}
            >
              {option.label}
            </option>
          );
        })}
      </select>
    );
  };

  const lastPage = <SearchPage pageNumber={previousPage} />;
  const currentPage = <SearchPage pageNumber={page} />;
  const backwards = (previousPage ?? -1) >= page;

  return (
    <div>
      <TopLabel>
        <h1 className="font-bold text-gray-300">Search</h1>
      </TopLabel>

      <PageTransition
        backwards={backwards}
        key={page}
        lastPage={lastPage}
        currentPage={currentPage}
      />

      {/** Hidden html */}
      <form action="/resources" id="search-form" className="hidden">
        {questions.map((question, index) => {
          return <HTMLQuestion key={index} question={question} />;
        })}
      </form>
    </div>
  );
};

export { GuidedSearch };
