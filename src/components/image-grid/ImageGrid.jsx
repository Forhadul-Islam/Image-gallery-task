/* eslint-disable react/prop-types */

// import { StrictModeDroppable as Droppable } from "../../helpers/StrictModeDroppable";
import {
  DndContext,
  DragOverlay,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors
} from "@dnd-kit/core";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";
import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { useGalleryContext } from "../../hooks/useGalleryContext";
import AddImages from "./AddImages";
import GridListItem from "./GridListItem";

// //grid list
// const GridListItem= ({ img, index, imageList }) => {





//   //Featured image
//   if (index === 0) {
//     return <ImageCard image={imageList[0]} />;
//   }

//   //other grid images
//   if (index > 0) {
//     return <ImageCard key={img.id} image={img} />;
//   }
// };

const ImageGrid = () => {
  const {state, dispatch } = useGalleryContext();
  console.log({state})
  const [images, setImages] = useState([]);
  const [activeCard, setActiveCard] = useState(false)
  // const [imagesList, setImagesList] = useState(images)
  const imageId = useMemo(() => images?.map((img) => img?.id), [images]);

  useEffect(()=>{
    setImages(state.images);
  }, [state])

  // const sensors = useSensors(
  //   useSensor(PointerSensor, {
  //     activationConstraint: {
  //       distance: 10,
  //     },
  //   })
  // );
  const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor));
  const onDragStart = (e) => {
    console.log("Drag start",e);
    setActiveCard(e.active.data?.id);
    return;
  };
  const onDragEnd = (e) => {
    console.log("DRAG END",e);
    const {active , over} = e;
    if(!over) return;
    if (active.id !== over.id) {
      const oldIndex = images.findIndex((item) => item.id === active.id);
      const newIndex = images.findIndex((item) => item.id === over.id);
      const convertedArray = arrayMove(images, oldIndex, newIndex);
      console.log({convertedArray})
      return setImages(convertedArray)


    }

    setActiveCard(null);

  };
  const onDragOver = (e) => {
    console.log(e);
  };

  return (
    <div>
      <DndContext
        sensors={sensors}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        onDragOver={onDragOver}
      >
        <section className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
          <SortableContext items={imageId}>
            {images?.length > 0 &&
              images.map((img, index, imageList) => {
                return (
                  <div
                    key={img.id}
                    className={`${index == 0 && "col-span-2 row-span-2"}`}
                  >
                    <GridListItem
                      img={img}
                      index={index}
                      imageList={imageList}
                    />
                  </div>
                );
              })}
          </SortableContext>

          <AddImages />
        </section>
        {createPortal(<DragOverlay>
          {activeCard && <GridListItem 
             img={images.find((i) => i.id === activeCard)}
             index={images.findIndex((item) => item.id === activeCard)}
          />}
        </DragOverlay>, document.body)}
      </DndContext>
    </div>
  );
};

export default ImageGrid;
