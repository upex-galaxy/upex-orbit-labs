"use client"

import { useState } from "react"
import { DragDropContext, Droppable, Draggable, type DropResult } from "react-beautiful-dnd"

const initialItems = [
  { id: "item1", content: "Item 1" },
  { id: "item2", content: "Item 2" },
  { id: "item3", content: "Item 3" },
]

export default function DragAndDropPage() {
  const [items, setItems] = useState(initialItems)
  const [lastAction, setLastAction] = useState("")

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return
    }

    const newItems = Array.from(items)
    const [reorderedItem] = newItems.splice(result.source.index, 1)
    newItems.splice(result.destination.index, 0, reorderedItem)

    setItems(newItems)
    setLastAction(`Moved ${result.draggableId} from index ${result.source.index} to index ${result.destination.index}`)
  }

  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold text-center text-[#00FFFF]">Drag and Drop</h1>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="list">
          {(provided) => (
            <ul {...provided.droppableProps} ref={provided.innerRef} className="space-y-2">
              {items.map((item, index) => (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {(provided) => (
                    <li
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className="p-4 bg-[#1A2C5A] rounded-lg cursor-move"
                    >
                      {item.content}
                    </li>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
      <p className="text-center mt-4">Last action: {lastAction}</p>
    </div>
  )
}

