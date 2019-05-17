import React, { Component } from "react";
import { List, AutoSizer } from "react-virtualized";
import TicketComponent from "./ticketComponent";

import "./scrollableTicketList.css";

/**
 * Accepts a list of tickets and renders them as a scrollable list.
 */
class ScrollableTicketList extends Component {
  static defaultProps = {
    rowHeight: 90,
  };

  render() {
    return (
      <div className="scrollableTicketList">
        <AutoSizer>
          {({ width, height }) => {
            console.log("width is " + width + " height is " + height);
            return (
              <List
                width={width}
                height={height}
                rowHeight={this.props.rowHeight}
                rowRenderer={this.renderRow.bind(this)}
                rowCount={this.props.ticketList.length}
                overscanRowCount={5}
              />
            );
          }}
        </AutoSizer>
      </div>
    );
  }

  renderRow({ index, key, style }) {
    return (
      <TicketComponent
        ticketList={this.props.ticketList}
        index={index}
        key={key}
        style={style}
      />
    );
  }
}

export default ScrollableTicketList;
