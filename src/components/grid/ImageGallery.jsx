import {
  DndContext,
  DragOverlay,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  rectSortingStrategy,
} from "@dnd-kit/sortable";
import { useEffect, useState } from "react";
import { imagesData } from "../../constants";
import { DND_UPDATE_IMAGES } from "../../context/actionTypes";
import { useGalleryContext } from "../../hooks/useGalleryContext";
import Grid from "../ui/Grid";
import AddImages from "./AddImages";
import { GridCard } from "./GridCard";

const ImageGallery = () => {
  const { state, dispatch } = useGalleryContext();
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
  useEffect(() => {
    setItems(state?.images);
  }, [state]);

  function handleDragStart(event) {
    setActiveId(event.active.id);
  }

  function handleDragEnd(event) {
    const { active, over } = event;
    if (active.id !== over.id) {
      let oldIndex;
      let newIndex;
      setItems((items) => {
         oldIndex = items.findIndex((item) => item.id === active.id);
         newIndex = items.findIndex((item) => item.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });

      //Update the central state,
      dispatch({
        type: DND_UPDATE_IMAGES,
        payload: arrayMove(items, oldIndex, newIndex)
      })
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
          <GridCard
              key={items.find((i) => i.id === activeId)?.id}
              image={items.find((i) => i.id === activeId)}
              url={items.find((i) => i.id === activeId)?.url}
              index={items.findIndex((item) => item.id === activeId)}
            />
        ) : null}
      </DragOverlay>
    </DndContext>
  );
};

export default ImageGallery;
