import React, { Component } from 'react'

const productSpecification = [
    {
        productType: "abc", contents: [
            { type: "abc", count: 231 },
            { type: "abc", count: 56 },
            { type: "abc", count: 54 },
            { type: "abc", count: 544 },
            { type: "abc", count: 54 },
            { type: "abc", count: 564 },
            { type: "abc", count: 4 },
            { type: "abc", count: 4564 },
            { type: "abc", count: 4531 },
            { type: "abc", count: 234 },
            { type: "abc", count: 57 },
            { type: "abc", count: 7 }
        ]
    }
];
export default class Table extends Component {
    getTableContent = (arr) => {
        let result = [];
        arr.forEach(function (item, i) {
            result.push(
                <table key={i}>
                    <thead>{item.productType}</thead>
                    <tbody>
                        {item.contents.forEach(function (nextItem, j) {
                            result.push(
                                <tr key={j+1}>
                                    <td>{nextItem.type}</td>
                                    <td>{nextItem.count}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            );
        });
        return result;
    };

    render() {
        return (
            <div>{this.getTableContent(productSpecification)}</div>
        );
    }
}
