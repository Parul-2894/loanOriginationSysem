import React, { useState } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { ResizeableBox } from 'react-resizable';
import 'react-resizable/css/styles.css';


const WorkflowComponent = ({ id, text, moveComponent, resizeComponent }) => {
    const [{ isDragging }, drag] = useDrag(() => ({
        type: 'COMPONENT',
        item: { id },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
    }));

    const [, drop] = useDrop(() => ({
        accept: 'COMPONENT',
        hover: (item) => {
            if (item.id !== id) {
                moveComponent(item.id, id);
            }
        },
    }));

    return (
        <ResizeableBox
            width={200}
            height={200}
            onResizeStop={(e, data) => resizeComponent(id, data.size)}
        >
            <div
                ref={(node) => drag(drop(node))}
                style={{
                    opacity: isDragging ? 0.5 : 1,
                    border: '1px solid black',
                    padding: '10px',
                }}
            >
                {text}
            </div>
        </ResizeableBox>
    );
};


const LosWorkflow = () => {
 const [components, setComponents] = useState([
   { id: 1, text: 'Component 1' },
   { id: 2, text: 'Component 2' },
 ]);


 const moveComponent = (draggedId, hoveredId) => {
   const draggedIndex = components.findIndex((comp) => comp.id === draggedId);
   const hoveredIndex = components.findIndex((comp) => comp.id === hoveredId);
   const newComponenets = [...components];
   const [draggedComponent] = newComponenets.splice(draggedIndex);
   newComponenets.splice(hoveredIndex, 0, draggedComponent);
   setComponents(newComponenets);
 };
 const resizeComponent = (id, size) => {
   setComponents((prevComponents) =>
     prevComponents.map((comp) => (comp.id === id ? { ...comp, size } : comp))
   );
 };


 return (
   <DndProvider backend={HTML5Backend}>
     <div>
       {components.map((comp) => (
         <WorkflowComponent
           key={comp.id}
           id={comp.id}
           text={comp.text}
           moveComponent={moveComponent}
           resizeComponent={resizeComponent}
         />
       ))}
     </div>
   </DndProvider>
 );
};
export default LosWorkflow;