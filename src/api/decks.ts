import { get } from "./utils";
import { AxiosResponse } from "axios";

export const getDeckByStudySetId = async ({
  studySetId,
}: {
  studySetId: string;
}): Promise<DeckInterface> => {
  const response: AxiosResponse<DeckInterface> = await get({
    apiUrl: `/decks/study-sets/${studySetId}`,
  });

  return response?.data;
};

export const getAllDueSrDecks = async (): Promise<DueSpacedRepetitionDecks> => {
  const response: AxiosResponse<DueSpacedRepetitionDecks> = await get({
    apiUrl: `/decks/spaced-repetition`,
  });
  return response?.data;
};
