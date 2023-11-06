/* eslint-disable react/prop-types */
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import { useState } from "react";
import ImageCard from "./ImageCard";

const GridListItem = ({ img, index, imageList }) => {
  const [editMode, setEditMode] = useState(false);

  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: img?.id,
    data: {
      img,
    },
    disabled: editMode,
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };


//   if (isDragging) {
//     return (
//       <div
//         ref={setNodeRef}
//         style={style}
//         className="
//       bg-columnBackgroundColor
//       opacity-40
//       border-2
//       border-pink-500
//       w-[200px]
//       h-[200px]
//       max-h-[500px]
//       rounded-md
//       flex
//       flex-col
//       "
//       ></div>
//     );
//   }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      onClick={() => {
        setEditMode(true);
      }}
    >
      {index == 0 ? (
        <ImageCard image={imageList[0]} />
      ) : (
        <ImageCard key={img.id} image={img} />
      )}
    </div>
  );

  //   //Featured image
  //   if (index === 0) {
  //     return <ImageCard image={imageList[0]} />;
  //   }

  //   //other grid images
  //   if (index > 0) {
  //     return <ImageCard key={img.id} image={img} />;
  //   }
  // };
};

export default GridListItem;
