import React, { Component } from 'react'
import { storeProducts } from "./data"
import { isObject } from 'util';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';


export default class CustomObjLast extends Component {
    constructor(props) {
        super(props)
        this.state = {
            store: storeProducts.data,
            tempObjData: '',
            title: ''
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
        var count = []
        var p = ''
        var rowPush = []
        function pivotTablePlot(values) {
            // console.log("start ",values);
            Object.keys(values).forEach(function (k) {
                var subObj = values[k] // we will get new object from here
                // console.log("values[k] ", values[k]);
                // console.log("key ", k);
                if (values[k] == "month") {
                    // create a new row
                    // for a customer display sales value and quantity for each month 
                    // like aug, sept and so on  
                }
                // if (k !== "type" && k != "key" && k != "data") {
                if (values[k] == "row") {
                    rowPush.push(
                        <tr>
                            <td rowSpan="6">{values[k]}</td>
                        </tr>
                    )
                }
                var subTempObj = values[k]
                var size = Object.keys(subTempObj).length
                console.log("Size ", size);
                
                // console.log("tempArr ",tempArr)
                
                if (values[k].value) {
                    count.push(1)
                    rowPush.push(
                        <>
                            {values[k].value != '' &&
                                <>
                                    <td> {values[k].value}</td>
                                    <td> {values[k].qty}</td>
                                </>
                            }
                        </>
                    )
                }

                else {  // loop through the object to skip 'type' and 'key' keys
                    Object.keys(subObj).forEach(function (itemKey, index) {
                        if (typeof subObj[itemKey] == 'object') {
                            // console.log("subobject ", subObj[itemKey]);
                            pivotTablePlot(subObj[itemKey]); // recursively call   
                        }
                    })
                }
            })
        }
        pivotTablePlot(tempObj);

        let head = count.map((item, index) => {
            return (
                <>
                    <th>Value</th>
                    <th>Quantity</th>
                </>
            )
        })
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
                {/* <h4>{this.state.title}--dsdsds</h4> */}
                <p>
                    row push
                </p>
                <table border="1">

                    {/* start */}
                    <thead>
                        <tr >
                            <th>Customer</th>
                            {/* <th>Value</th>
                            <th>Quantity</th> */}
                            {head}
                        </tr>
                    </thead>
                    <tbody>
                        {/* <tr>
                                <td rowSpan="2">Customer name</td>
                                <td colSpan="2">Month</td>
                            </tr>
                            <tr>
                                <td>Value</td>
                                <td rowSpan="2">qty</td>
                            </tr> */}
                        {/* <tr> */}
                        {rowPush}
                        {/* </tr> */}
                    </tbody>
                </table>
            </>
        )
    }
}
