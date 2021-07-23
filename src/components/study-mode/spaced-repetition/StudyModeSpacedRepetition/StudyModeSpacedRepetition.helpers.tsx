import { FlashcardLearningStatus } from "../../../../shared";

export const calculateNumberOfCardsGroupedByLearningStatus = (
  flashcards: FlashcardInterface[] | undefined
) => {
  let numberOfNewCards = 0;
  let numberOfLearningCards = 0;
  let numberOfLearnedCards = 0;

  flashcards?.forEach((flashcard) => {
    if (flashcard.learning_status === FlashcardLearningStatus.LEARNING) {
      numberOfLearningCards += 1;
    } else if (
      flashcard.learning_status === FlashcardLearningStatus.LEARNED ||
      flashcard.learning_status === FlashcardLearningStatus.DUE
    ) {
      numberOfLearnedCards += 1;
    } else if (flashcard.learning_status === FlashcardLearningStatus.NEW) {
      numberOfNewCards += 1;
    }
  });

  return { numberOfLearnedCards, numberOfNewCards, numberOfLearningCards };
};
