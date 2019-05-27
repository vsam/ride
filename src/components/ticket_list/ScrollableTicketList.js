import React, { Component } from "react";
import { List, AutoSizer } from "react-virtualized";
import TicketComponent from "./TicketComponent";
import "./ScrollableTicketList.css";

/**
 * Accepts a list of tickets and renders them as a scrollable list.
 */
class ScrollableTicketList extends Component {
  static defaultProps = {
    rowHeight: 90,
  };

  renderRow({ index, key, style }) {
    return (
      <TicketComponent
        ticket={this.props.tickets[index]}
        index={index}
        key={key}
        style={style}
      />
    );
  }

  render() {
    return (
      <div className="scrollableTicketList">
        <AutoSizer>
          {({ width, height }) => (
            <List
              width={width}
              height={height}
              rowHeight={this.props.rowHeight}
              rowRenderer={this.renderRow.bind(this)}
              rowCount={this.props.tickets.length}
              overscanRowCount={5}
            />
          )}
        </AutoSizer>
      </div>
    );
  }
}

export default ScrollableTicketList;
