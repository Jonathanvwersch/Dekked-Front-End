import { useAtom } from "jotai";
import { useQuery } from "react-query";
import { getFiles, getUser } from "../api";
import { getSessionCookie, uniqueApiKey } from "../helpers";
import { UserType } from "../shared";
import {
  bindersAtom,
  fileTreeAtom,
  foldersAtom,
  isAppLoadingAtom,
  studySetsAtom,
  userAtom,
} from "../store";

const useInitialiseApp = () => {
  const [, setIsLoading] = useAtom(isAppLoadingAtom);
  const [, setFileTree] = useAtom(fileTreeAtom);
  const [, setFolders] = useAtom(foldersAtom);
  const [, setBinders] = useAtom(bindersAtom);
  const [, setStudySets] = useAtom(studySetsAtom);
  const [, setUser] = useAtom(userAtom);

  useQuery<UserType>(uniqueApiKey("user"), getUser, {
    onSuccess: (data) => setUser(data),
    refetchOnMount: false,
    enabled: Boolean(getSessionCookie()),
  });

  useQuery<LoadFilesInterface>(uniqueApiKey("files"), getFiles, {
    onSuccess: (data) => {
      setFolders(data?.folders);
      setFileTree(data?.fileTree);
      setStudySets(data?.studySets);
      setBinders(data?.binders);
      setIsLoading(false);
    },
    refetchOnMount: false,
    enabled: Boolean(getSessionCookie()),
  });
};

export default useInitialiseApp;
