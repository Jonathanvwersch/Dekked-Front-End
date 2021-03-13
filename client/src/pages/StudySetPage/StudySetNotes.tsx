import React from "react";
import { HFlex, LinkedFlashcard, VFlex } from "../../common";

interface StudySetNotesProps {
  flashcardSize: number;
}

const StudySetNotes: React.FC<StudySetNotesProps> = ({ flashcardSize }) => {
  return (
    <>
      <VFlex>
        <HFlex>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
          fringilla ante vitae risus aliquet, sed condimentum magna varius. Cras
          sem dui, pellentesque eu laoreet vel, convallis vitae orci. Maecenas
          ullamcorper, quam pulvinar rhoncus dignissim, lacus nulla varius
          dolor, vitae accumsan neque mi vitae sem. Proin mollis libero risus,
          eu tincidunt felis congue vitae. Aenean egestas elementum iaculis.
          Fusce sit amet nisl quis lorem efficitur finibus quis nec est. Nullam
          vel turpis eget neque condimentum maximus ut nec nulla. Cras lacinia
          nisi vitae enim facilisis volutpat. Morbi bibendum nunc at consectetur
          congue.
        </HFlex>
        <br></br>
        <HFlex>
          Nunc et quam vitae elit tempor euismod. Ut varius felis at tincidunt
          fermentum. Praesent porttitor lectus iaculis neque tempus auctor.
          Etiam in odio in sem tincidunt convallis. Donec non nisl sed tellus
          vulputate porttitor. Duis lacus libero, porta eget nisi sit amet,
          sagittis dictum enim. Phasellus maximus id nibh in auctor. Morbi
          vestibulum libero et ullamcorper viverra. Interdum et malesuada fames
          ac ante ipsum primis in faucibus. Nulla sagittis nisl ac sapien
          fermentum, in ornare felis euismod.
        </HFlex>
        <br></br>
        <HFlex>
          Nulla non erat eu enim varius hendrerit. Curabitur vel quam laoreet
          sapien convallis maximus in vel ante. Donec scelerisque euismod neque,
          ut venenatis ligula. Suspendisse felis lectus, posuere non purus nec,
          egestas ultrices augue. Nullam sit amet eros nec turpis dignissim
          dignissim et non elit. Vestibulum vitae elit ut enim imperdiet varius
          eget eu mi. Quisque scelerisque metus non bibendum mollis. Morbi
          sodales dui gravida ex imperdiet, id facilisis turpis lobortis.
          Vestibulum a justo vitae nisi ultrices iaculis. In eleifend
          scelerisque porta. Nulla ullamcorper purus et urna pulvinar faucibus.
          Nullam tincidunt leo at sapien facilisis elementum. Vivamus at cursus
          mi. In at vestibulum neque. Sed ac pretium neque. Maecenas et felis
          velit.
        </HFlex>
        <br></br>
        <HFlex>
          Nulla non erat eu enim varius hendrerit. Curabitur vel quam laoreet
          sapien convallis maximus in vel ante. Donec scelerisque euismod neque,
          ut venenatis ligula. Suspendisse felis lectus, posuere non purus nec,
          egestas ultrices augue. Nullam sit amet eros nec turpis dignissim
          dignissim et non elit. Vestibulum vitae elit ut enim imperdiet varius
          eget eu mi. Quisque scelerisque metus non bibendum mollis. Morbi
          sodales dui gravida ex imperdiet, id facilisis turpis lobortis.
          Vestibulum a justo vitae nisi ultrices iaculis. In eleifend
          scelerisque porta. Nulla ullamcorper purus et urna pulvinar faucibus.
          Nullam tincidunt leo at sapien facilisis elementum. Vivamus at cursus
          mi. In at vestibulum neque. Sed ac pretium neque. Maecenas et felis
          velit.
        </HFlex>{" "}
        <br></br>
        <HFlex>
          Nulla non erat eu enim varius hendrerit. Curabitur vel quam laoreet
          sapien convallis maximus in vel ante. Donec scelerisque euismod neque,
          ut venenatis ligula. Suspendisse felis lectus, posuere non purus nec,
          egestas ultrices augue. Nullam sit amet eros nec turpis dignissim
          dignissim et non elit. Vestibulum vitae elit ut enim imperdiet varius
          eget eu mi. Quisque scelerisque metus non bibendum mollis. Morbi
          sodales dui gravida ex imperdiet, id facilisis turpis lobortis.
          Vestibulum a justo vitae nisi ultrices iaculis. In eleifend
          scelerisque porta. Nulla ullamcorper purus et urna pulvinar faucibus.
          Nullam tincidunt leo at sapien facilisis elementum. Vivamus at cursus
          mi. In at vestibulum neque. Sed ac pretium neque. Maecenas et felis
          velit.
        </HFlex>{" "}
        <br></br>
        <HFlex>
          Nulla non erat eu enim varius hendrerit. Curabitur vel quam laoreet
          sapien convallis maximus in vel ante. Donec scelerisque euismod neque,
          ut venenatis ligula. Suspendisse felis lectus, posuere non purus nec,
          egestas ultrices augue. Nullam sit amet eros nec turpis dignissim
          dignissim et non elit. Vestibulum vitae elit ut enim imperdiet varius
          eget eu mi. Quisque scelerisque metus non bibendum mollis. Morbi
          sodales dui gravida ex imperdiet, id facilisis turpis lobortis.
          Vestibulum a justo vitae nisi ultrices iaculis. In eleifend
          scelerisque porta. Nulla ullamcorper purus et urna pulvinar faucibus.
          Nullam tincidunt leo at sapien facilisis elementum. Vivamus at cursus
          mi. In at vestibulum neque. Sed ac pretium neque. Maecenas et felis
          velit.
        </HFlex>
      </VFlex>
      <LinkedFlashcard flashcardSize={flashcardSize} />
    </>
  );
};

export default StudySetNotes;
