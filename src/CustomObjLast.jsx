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
        var rowPush = []
        function pivotTablePlot(values) {
            // console.log("start ",values);
            Object.keys(values).forEach(function (k) {
                var subObj = values[k] // we will get new object from here
                // console.log("find month name ", values[k]);
                // console.log("key ", k);
                if (values[k] == "month") {
                    // create a new row
                    // for a customer display sales value and quantity for each month 
                    // like aug, sept and so on  
                }
                // function to filter Cunstomer name only 
                var arr = ["Aug", "Sept", "Oct", "Dec", "Jan", "Feb"]
                var mo = arr.map(i => {
                    return (
                        <td key={i} colSpan="2" style={{ textAlign: "left" }}>{i}</td>
                    )
                })
                let valQty = arr.map(i => {
                    return (
                        <>
                            <td>Value</td>
                            <td>Quantity</td>
                        </>
                    )
                })
                function customerNameOnly(v, mo) {
                    console.log("c n o", values[v]);
                    var re = /^[A-Z ,]*$/;
                    if (re.test(v)) {
                        // console.log("yes it's a customer v ", v);
                        rowPush.push(
                            <>
                                <tr>
                                    <td rowSpan="3" style={{ border: "1px solid black" }}>{k}</td>
                                    {mo}
                                </tr>
                                <tr>
                                    {valQty}
                                </tr>
                            </>
                        )
                    }
                    else {
                        // console.log("Not our  customer ", v)
                    }
                }
                customerNameOnly(k, mo);

                if (values[k] == "row") {
                    // rowPush.push(
                    //     <tr>
                    //         <td rowSpan="2">{k}</td>
                    //         {/* <td rowSpan="2">{values[k]}</td> */}
                    //     </tr>
                    // );

                }
                var subTempObj = values[k]
                var size = Object.keys(subTempObj).length

                if (values[k].value) {
                    count.push(1)
                    rowPush.push(
                        <>
                            {values[k].value != '' &&
                                <>
                                    <td style={{ border: "1px solid black", padding: "10px" }}> {values[k].value}</td>
                                    <td style={{ border: "1px solid black", padding: "10px" }}> {values[k].qty}</td>
                                </>
                            }
                        </>
                    )

                } else {  // loop through the object to skip 'type' and 'key' keys
                    Object.keys(subObj).forEach(function (itemKey, index) {
                        if (typeof subObj[itemKey] == 'object') {
                            // console.log("subobject ", subObj[itemKey]);
                            pivotTablePlot(subObj[itemKey]); // recursively call   
                        }
                    })
                }
                console.log("count ", count);

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

        return (
            <>  <h4>Mission Pivot f table</h4>
                <table border="1" style={{ borderCollapse: "collapse", border: "1px solid black", width: "100%" }}>
                    <thead>
                        <tr>
                            <th style={{ border: "1px solid black", height: "50px" }}>Customer</th>
                            {head}
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
