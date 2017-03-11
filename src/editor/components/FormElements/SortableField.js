import React from 'react';
import { DragSource, DropTarget } from 'react-dnd';
import { findDOMNode } from 'react-dom';
import flow from 'lodash/flow';

const textFieldSource = {
  beginDrag(props) {
    const item = { id: props.children.props.id };
    return item;
  }
};

const textFieldTarget = {
    hover(props, monitor, component) {
        const dragIndex = monitor.getItem().index;
        const hoverIndex = props.index;
        console.log(dragIndex);
        // Don't replace items with themselves
        if (dragIndex === hoverIndex) {
            return;
        }

        if (dragIndex === undefined || hoverIndex === undefined) {
            // console.log(dragIndex + " :: " + hoverIndex);
            // return;
        }

        // Determine rectangle on screen
        const hoverBoundingRect = findDOMNode(component).getBoundingClientRect();

        // Get vertical middle
        const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

        // Determine mouse position
        const clientOffset = monitor.getClientOffset();

        // Get pixels to the top
        const hoverClientY = clientOffset.y - hoverBoundingRect.top;

        // Only perform the move when the mouse has crossed half of the items height
        // When dragging downwards, only move when the cursor is below 50%
        // When dragging upwards, only move when the cursor is above 50%

        // Dragging downwards
        if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
            return;
        }

        // Dragging upwards
        if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
            return;
        }

        props.onMoveField(dragIndex, hoverIndex);

        monitor.getItem().index = hoverIndex;
    }
}

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  }
}

function collectTarget(connect, monitor) {
    return {
        connectDropTarget: connect.dropTarget()
    }
}

/*
function SortableField(FieldComponent) {
    return class extends React.Component {
        render() {
            const { connectDragSource, connectDropTarget } = this.props;
            return connectDragSource(connectDropTarget(
                <FieldComponent {...this.props}/>
            ));
        }
    }
}
*/

class SortableField extends React.Component{

    render() {
        const { connectDragSource, connectDropTarget } = this.props;
        return connectDragSource(connectDropTarget(
            <div>{this.props.children}</div>
        ));
    }
}

export default flow(
  DragSource('field', textFieldSource, collect),
  DropTarget('field', textFieldTarget, collectTarget)
)(SortableField);