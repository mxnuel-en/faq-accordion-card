import { useState } from "react";
import { qaList } from "./faqQA";

interface ListProps {
  questions: {
    id: string;
    question: string;
    answer: string;
  }[];
  onSetOpenAccordion: (id: string) => void;
  openAccordion: {
    [id: string]: boolean;
  };
}

interface ListItemsProps {
  question: string;
  answer: string;
  openAccordion: boolean;
}

function App() {
  const [openAccordion, setOpenAccordion] = useState<{ [id: string]: boolean }>(
    {}
  );

  const handleOpenAccordion = (id: string) => {
    setOpenAccordion((prevState) => {
      const newOpenAccordion = { ...prevState };
      newOpenAccordion[id] = !prevState[id]; // Update the state of the clicked accordion

      // Close all other accordions
      for (const key in newOpenAccordion) {
        if (key !== id) {
          newOpenAccordion[key] = false;
        }
      }

      return newOpenAccordion;
    });
  };

  return (
    <div className="container">
      <section className="hero">
        <div className="hero_illustration">
          <picture>
            <source
              media="(max-width: 1023px)"
              srcSet="images/illustration-woman-online-mobile.svg"
            />
            <img
              className="hero_illustration--image"
              src="./images/illustration-woman-online-desktop.svg"
              alt="illustration woman online"
            />
          </picture>
          <picture>
            <source
              media="(max-width: 1023px)"
              srcSet="images/bg-pattern-mobile.svg"
            />
            <img
              className="hero_illustration--shadow"
              src="./images/bg-pattern-desktop.svg"
              alt="background pattern"
            />
          </picture>
        </div>

        <img
          className="hero_illustration--box"
          src="images/illustration-box-desktop.svg"
          alt="box illustration"
        />
      </section>

      <QAList
        questions={qaList}
        onSetOpenAccordion={handleOpenAccordion}
        openAccordion={openAccordion}
      />
    </div>
  );
}

function QAList({ questions, onSetOpenAccordion, openAccordion }: ListProps) {
  return (
    <main>
      <h2 className="title">faq</h2>
      <ul>
        {questions.map((qa) => (
          <li
            key={qa.id}
            className="faq"
            onClick={() => onSetOpenAccordion(qa.id)}
          >
            <QuestionAnswerItem
              question={qa.question}
              answer={qa.answer}
              openAccordion={openAccordion[qa.id]}
            />
          </li>
        ))}
      </ul>
    </main>
  );
}

function QuestionAnswerItem({
  question,
  answer,
  openAccordion,
}: ListItemsProps) {
  return (
    <>
      <div className="question">
        <h3 style={{ fontWeight: openAccordion ? "bolder" : "initial" }}>
          {question}
        </h3>

        <svg
          className={`arrow${openAccordion ? "--active" : ""}`}
          width="10"
          height="7"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1 .799l4 4 4-4"
            stroke="#F47B56"
            strokeWidth="2"
            fill="none"
            fillRule="evenodd"
          />
        </svg>
      </div>
      <div className={`answer_container${openAccordion ? "--active" : ""}`}>
        <p className="answer_content">{answer}</p>
      </div>
    </>
  );
}

export default App;
