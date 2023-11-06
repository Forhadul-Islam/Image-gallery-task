import {
  DndContext,
  DragOverlay,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  rectSortingStrategy,
} from "@dnd-kit/sortable";
import { useEffect, useState } from "react";

import { imagesData } from "../../constants";
import { useGalleryContext } from "../../hooks/useGalleryContext";
import AddImages from "./AddImages";
import { Grid } from "./Grid";
import { GridCard } from "./GridCard";
import { Image } from "./Image";

const ImageGallery = () => {
  const {state} = useGalleryContext();
  console.log({state: state.images, selected: state.selectedImages})
  const [items, setItems] = useState(imagesData);
  const [activeId, setActiveId] = useState(null);
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10,
      },
    })
  );

  //load the initial data
  useEffect(()=>{
    setItems(state?.images);
  }, [state])


  function handleDragStart(event) {
    setActiveId(event.active.id);
    console.log({ event });
  }

  function handleDragEnd(event) {
    const { active, over } = event;

    if (active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);

        return arrayMove(items, oldIndex, newIndex);
      });
    }

    setActiveId(null);
  }

  function handleDragCancel() {
    setActiveId(null);
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragCancel={handleDragCancel}
    >
      <SortableContext items={items} strategy={rectSortingStrategy}>
        <Grid>
          {items.map((image, index) => (
            <GridCard
              key={image.id}
              image={image}
              url={image.url}
              index={index}
            />
          ))}
      <AddImages />
        </Grid>
      </SortableContext>

      <DragOverlay adjustScale={true}>
        {activeId ? (
          <Image
            url={items.find((i) => i.id === activeId)?.url}
            index={items.findIndex((item) => item.id === activeId)}
          />
        ) : null}
      </DragOverlay>
    </DndContext>
  );
};

export default ImageGallery;
