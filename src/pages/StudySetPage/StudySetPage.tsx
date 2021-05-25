import { convertFromRaw, convertToRaw, EditorState } from "draft-js";
import { isEmpty, isNull } from "lodash";
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { Route, useParams } from "react-router-dom";
import { InsetPage } from "../../components/common";
import MainFrame from "../../components/common/MainFrame/MainFrame";
import { convertBlocksToContent } from "../../components/notetaking/Editor/Editor.helpers";
import {
  StudySetFlashcardsContainer,
  StudySetHeader,
  StudySetNotesContainer,
} from "../../components/study-set";
import { CurrentBlockContextProvider } from "../../contexts/CurrentBlockContext";
import { FlashcardsContextProvider } from "../../contexts/FlashcardsContext";
import { SavingEditorContextProvider } from "../../contexts/SavingEditorContext";
import { useResize } from "../../hooks/useResize";
import CustomSwitch from "../../Router/CustomSwitch";
import { useBlocks } from "../../services/note-taking/useBlocks";
import { usePage } from "../../services/note-taking/usePage";
import { FILETREE_TYPES, Params, SIZES, TAB_TYPE } from "../../shared";

interface StudySetPageProps {}

const StudySetPage: React.FC<StudySetPageProps> = () => {
  const headerRef = useRef<HTMLDivElement>(null);
  const [initialWidth, setInitialWidth] = useState(0);
  const [pageEditorState, setPageEditorState] = useState<EditorState>(
    EditorState.createEmpty()
  );
  const { dimensions, position } = useResize(headerRef);
  const { id } = useParams<Params>();
  const { page, getPageByStudyPackId } = usePage(id);
  const pageId = page?.id;
  const blocks = useBlocks(pageId);
  const [loading, setLoading] = useState<boolean>(false);

  // This ref is used to get the initial width of the flashcard as the headerRef is undefined on mount
  const initialRef = useCallback((node) => {
    if (node !== null) {
      setInitialWidth(node.getBoundingClientRect().width);
    }
  }, []);

  // Store page editor state in local storage and update
  // the store editor state everytime the editor state changes
  const storeRaw = localStorage.getItem("page-editor");

  const saveRaw = useCallback(() => {
    var contentRaw = convertToRaw(pageEditorState.getCurrentContent());
    localStorage.setItem("page-editor", JSON.stringify(contentRaw));
  }, [pageEditorState]);

  useEffect(() => {
    saveRaw();
  }, [pageEditorState, saveRaw]);

  // Every time a user navigates to new study pack, get the new page
  useLayoutEffect(() => {
    localStorage.removeItem("page-editor");
    id && getPageByStudyPackId();
    setLoading(true);
  }, [id]); // eslint-disable-line react-hooks/exhaustive-deps

  // If on mount there exists an editor in local storage, set the page editor to that state value
  // This allows for the page editor state to be cached as you switch study set tabs (flashcard/notes)
  useEffect(() => {
    if (storeRaw) {
      setLoading(false);
      const rawContentFromStore = convertFromRaw(JSON.parse(storeRaw));
      setPageEditorState(EditorState.createWithContent(rawContentFromStore));
    }
  }, []);

  // Set editor state on mount with the blocks from the get requested,
  // only if the blocks exist i.e. only when a user switches study packs
  // we are not caching multiple page editor states, only one at a time
  useEffect(() => {
    if (blocks && !isEmpty(blocks) && blocks[0] !== null) {
      const savedState = convertBlocksToContent(blocks);
      setPageEditorState(EditorState.createWithContent(savedState));
    } else {
      setPageEditorState(EditorState.createEmpty());
    }
    setLoading(false);
  }, [blocks]);

  return (
    <CurrentBlockContextProvider>
      <SavingEditorContextProvider>
        <FlashcardsContextProvider>
          <MainFrame>
            <InsetPage size={SIZES.SMALL}>
              <StudySetHeader
                editorState={pageEditorState}
                setEditorState={setPageEditorState}
                headerRef={headerRef}
              />
              <CustomSwitch>
                <Route
                  path={`/${FILETREE_TYPES.STUDY_SET}/:id/${TAB_TYPE.NOTES}`}
                  render={() => (
                    <StudySetNotesContainer
                      pageId={pageId}
                      editorState={pageEditorState}
                      setEditorState={setPageEditorState}
                      notesRef={initialRef}
                      loading={loading}
                      flashcardSize={
                        dimensions.width ? dimensions.width : initialWidth
                      }
                      flashcardPosition={position.left && position.left}
                    />
                  )}
                />
                <Route
                  path={`/${FILETREE_TYPES.STUDY_SET}/:id/${TAB_TYPE.FLASHCARDS}`}
                  component={StudySetFlashcardsContainer}
                />
              </CustomSwitch>
            </InsetPage>
          </MainFrame>
        </FlashcardsContextProvider>
      </SavingEditorContextProvider>
    </CurrentBlockContextProvider>
  );
};

export default StudySetPage;
