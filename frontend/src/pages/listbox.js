import React, { useState } from "react";
import { FixedSizeList } from "react-window";

const LISTBOX_PADDING = 8;

function renderRow(props) {
  const { data, index, style } = props;
  const item = data[index];

  if (!React.isValidElement(item)) return null; // 👈 safety check

  return React.cloneElement(item, {
    style: {
      ...style,
      top: style.top + LISTBOX_PADDING,
    },
  });
}

const ListboxComponent = React.forwardRef(function ListboxComponent(
  props,
  ref
) {
  const { children, ...other } = props;
  const itemData = React.Children.toArray(children);

  const [visibleCount, setVisibleCount] = useState(25); // initial 25 items

  const loadMoreItems = (e) => {
    const list = e.currentTarget;
    if (list.scrollTop + list.clientHeight >= list.scrollHeight - 20) {
      // near bottom, load 25 more
      setVisibleCount((prev) => Math.min(prev + 25, itemData.length));
    }
  };

  const height = Math.min(visibleCount, 8) * 36 + 2 * LISTBOX_PADDING; // show max 8 items at a time

  return (
    <div ref={ref} onScroll={loadMoreItems} {...other}>
      <FixedSizeList
        height={height}
        width="100%"
        itemSize={36}
        itemCount={itemData.slice(0, visibleCount).length} // use actual length
        itemData={itemData.slice(0, visibleCount)}
        overscanCount={5}
      >
        {renderRow}
      </FixedSizeList>
    </div>
  );
});

export default ListboxComponent;
