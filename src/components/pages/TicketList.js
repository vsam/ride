import loremIpsum from 'lorem-ipsum';
import React, { Component } from 'react';

const rowCount = 100;

class TicketList extends Component {

    constructor() {
        super();
        this.list = Array(rowCount).fill().map((val, idx) => {
            return {
                id: idx,
                name: 'John Doe',
                image: 'http://via.placeholder.com/40',
                text: loremIpsum({
                    count: 1,
                    units: 'sentences',
                    sentenceLowerBound: 4,
                    sentenceUpperBound: 8
                })
            }
        });
    }
    render() {
        return (
            <div className="TicketList">
                <header className="App-header">
                    {/*<img src={logo} className="App-logo" alt="logo" />*/}
                    <h1 className="App-title">Welcome to React</h1>
                </header>
                <div className="list">
                    {this.list.map(this.renderRow)}
                </div>
            </div>
        );
    }

    renderRow(item) {
        return (
            <div key={item.id} className="row">
                <div className="image">
                    <img src={item.image} alt="" />
                </div>
                <div className="content">
                    <div>{item.name}</div>
                    <div>{item.text}</div>
                </div>
            </div>
        );
    }


}
export default TicketList;
