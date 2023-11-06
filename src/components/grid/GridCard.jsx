/* eslint-disable react/prop-types */
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GridCardItem } from "./GridCardItem";

// import { Image } from "./Image";

export const GridCard = (props) => {
  const {
    attributes,
    listeners,
    // isDragging,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: props.image.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <GridCardItem
      image={props.image}
      ref={setNodeRef}
      style={style}
      {...props}
      attributes= {attributes}
      listeners={listeners}
    />
  );
};
