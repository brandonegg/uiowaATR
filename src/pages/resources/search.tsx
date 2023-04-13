import Footer from "~/components/Footer";
import Header from "~/components/Header";
import { GuidedSearch, type Question, type QuestionTypes } from "~/components/Search";

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

const SearchPage = () => {
    return <>
        <Header />
        <div className="w-full max-w-xl mx-auto mt-4 mb-4 rounded-xl overflow-hidden border border-neutral-400 bg-neutral-200 drop-shadow-md">
            <GuidedSearch questions={questions} />
        </div>
        <Footer />
    </>
}

export default SearchPage