import { del, get, patch, post } from "./utils";
import { AxiosResponse } from "axios";

export const getStudySets = async () => {
  const response: AxiosResponse<{
    [key: string]: StudySetInterface;
  }> = await get({
    apiUrl: "/study-sets",
    errorMessage: "There was an error getting the study set",
  });

  return response?.data;
};

export const addStudySet = async ({
  name,
  color,
  binder_id,
  id,
}: {
  name: string;
  color: string;
  binder_id: string;
  id?: string;
}): Promise<StudySetInterface> => {
  const payload = {
    color,
    name,
    binder_id,
    id,
  };
  const response: AxiosResponse<StudySetInterface> = await post({
    apiUrl: "/study-set",
    errorMessage: "There was an adding the study set",
    body: payload,
  });
  return response?.data;
};

export const updateStudySet = async (
  study_set_id: string,
  {
    name,
    color,
  }: {
    name?: string;
    color?: string;
  }
) => {
  const payload = {
    study_set_id,
    color,
    name,
  };
  const response = await patch({
    apiUrl: "/study-set",
    errorMessage: "There was an adding the study set",
    body: payload,
  });

  return response?.data;
};

export const deleteStudySet = async (study_set_id: string) => {
  const payload = {
    study_set_id,
  };
  const response = await del({
    apiUrl: "/study-set",
    errorMessage: "There was an error deleting the study set",
    body: payload,
  });
  return response?.data;
};
