import React, { Component } from 'react'
import { storeProducts } from "./data"
import { isObject } from 'util';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';


export default class CustomObj extends Component {
    constructor(props) {
        super(props)
        this.state = {
            store: storeProducts.data,
            tempObjData: ''
        }

        this.textInput = React.createRef();
        this.myRef = React.createRef();
    }

    render() {
        let store = this.state.store;
        var tempObj = {};
        // document.write(store);

        Object.keys(store).forEach(function (k) {
            var val = store[k];
            var customer = val['customer_name'];
            var month = val['month'];
            var itemName = val['item_name']
            var salesPerson = val['salesperson_name']

            if (!tempObj[customer])
                tempObj[customer] = { 'type': 'row', 'key': 'customer_name' };

            if (!tempObj[customer][month])
                tempObj[customer][month] = { 'type': 'row', 'key': 'month' }

            if (!tempObj[customer][month][itemName])
                tempObj[customer][month][itemName] = { 'type': 'column', 'key': 'item_name' }

            if (!tempObj[customer][month][itemName][salesPerson])
                tempObj[customer][month][itemName][salesPerson] = { 'type': 'column', 'key': 'sales_person', 'data': { 'value': 0, 'qty': 0 } }

            tempObj[customer][month][itemName][salesPerson]['data']['value'] = val['taxpaidamount'];
            tempObj[customer][month][itemName][salesPerson]['data']['qty'] = val['qty'];

        });

        // console.log("result :", tempObj);
        // Start Recursion

        var dataValue = ''
        var dataQty = ''
        var count = 0
        var p = ''
        var rowPush = []
        function pivotTablePlot(values) {
            // console.log("start ",values);
            Object.keys(values).forEach(function (k) {
                var subObj = values[k] // we will get new object from here
                console.log("values[k] ", values[k]);
                console.log("keyssss ", k);
                if (values[k] == "month") {
                    // create a new row
                    // for a customer display sales value and quantity for each month 
                    // like aug, sept and so on  
                }
                if (k !== "type" && k != "key" && k != "data") {
                    // console.log("keyss ", k)
                    rowPush.push(
                        <>
                            <td colSpan="2">{k}</td>
                        </>
                    )
                }
                if (values[k].value) {
                    // if (type == "row") {
                    //     rowPush.push(
                    //         <>
                    //             <td> {values[k].value}</td>
                    //             <td rowSpan="2"> {values[k].qty}</td>
                    //         </>
                    //     )
                    // }else{
                    rowPush.push(
                        <>
                            {values[k].value == "row" &&
                                <td rowSpan="4">
                                    unread messages.
                                </td>
                            }

                            <td> {values[k].value}</td>
                            <td rowSpan="2"> {values[k].qty}</td>
                        </>
                    )
                    // }
                }

                else {  // loop through the object to skip 'type' and 'key' keys
                    Object.keys(subObj).forEach(function (itemKey, index) {
                        if (typeof subObj[itemKey] == 'object') {
                            console.log("subobject ", subObj[itemKey]);
                            pivotTablePlot(subObj[itemKey]); // recursively call   
                        }
                    })
                }
            })
        }
        pivotTablePlot(tempObj);

        console.log("dataValue", dataValue);
        console.log("dataQty", dataQty);

        // })
        // End recursion 

        var rows = {
            'row1': {
                'cp': { 2: '22', '2': 'fff' },
                'cp2': { 'asd': 'sad' },
            },
            'row2': { 'test': 'pop', 'test2': 1 }
        };


        function iterate(obj, stack) {
            for (var property in obj) {
                if (obj.hasOwnProperty(property)) {
                    if (typeof obj[property] == "object") {
                        iterate(obj[property], stack + '.' + property);
                    } else {
                        // console.log(property + "   " + obj[property]);
                        // $('#output').append($("<div/>").text(stack + '.' + roperty))
                    }
                }
            }
        }

        iterate(rows, '')

        return (
            <>
                <table border="1">
                    <thead>
                        <tr >
                            <th>Value</th>
                            <th>Qty</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rowPush}
                    </tbody>
                </table>
            </>
        )
    }
}
