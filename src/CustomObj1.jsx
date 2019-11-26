import React, { Component } from 'react'
import { storeProducts } from "./data"

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
        var months = []
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

        console.log("result :", tempObj);
        var count = []
        var rowPush = []
        function pivotTablePlot(values) {
            // console.log("start ",values);
            Object.keys(values).forEach(function (k) {
                var subObj = values[k] // we will get new object from here
                // console.log("k ", values[k])
                var arr = ["Aug", "Sept", "Oct", "Dec", "Jan", "Feb"]
                var monthsArr = arr.map(i => {
                    return (
                        <td key={i} colSpan="2" style={{ textAlign: "left" }}>{i}</td>
                    )
                })
                let salesPerson = arr.map((i, index) => {
                    return (
                        <>
                            <td colSpan="2">Sales person {index + 1}</td>
                        </>
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
                    Object.keys(values[v]).forEach((key, index) => {
                        months.push(key)
                    })
                    var tempData = values[v]
                    var re = /^[A-Z ,]*$/; // Filter Customer name
                    if (re.test(v)) {
                        rowPush.push(
                            <>
                                <tr>
                                    <td  rowSpan="4" style={{ border: "1px solid black" }}>{k}</td>
                                        {typeof tempData === "object" && Object.keys(tempData).forEach(function (monthNameKey) {if (monthNameKey !== "type" && monthNameKey !== "key") {rowPush.push(
                                    <td style={{ textAlign: "left" }}>{monthNameKey}</td>)}})}
                                </tr>
                                <tr>
                                    {valQty}
                                </tr>
                            </>
                        )
                    }
                }
                customerNameOnly(k, monthsArr);

                if (values[k].value) {
                    count.push(1)
                    rowPush.push(
                        <>
                            {values[k].value !== '' &&
                                <>
                                    <td style={{ border: "1px solid black", padding: "10px" }}> {values[k].value}</td>
                                    <td style={{ border: "1px solid black", padding: "10px" }}> {values[k].qty}</td>
                                </>
                            }
                        </>
                    )
                    // }
                } else {  // loop through the object to skip 'type' and 'key' keys
                    Object.keys(subObj).forEach(function (itemKey, index) {
                        if (typeof subObj[itemKey] === 'object') {
                            // console.log("subobject ", subObj[itemKey]);
                            // console.log("A");
                            pivotTablePlot(subObj[itemKey]); // recursively call  
                            // console.log("B");

                        }
                    })
                }
            })
        }
        pivotTablePlot(tempObj);
        var monthFliterd = months.filter(function (number) {
            if (isNaN(number) && number !== "type" && number !== "value" && number !== "qty" && number !== "column" && number !== " NULL" && number !== "key") {
                return number
            }
        });
        let head = count.map((item, index) => {
            return (
                <>
                    <th>Value</th>
                    <th>Quantity</th>
                </>
            )
        })
        return (
            <>  <h4>Mission Pivot table</h4>
                <table border="1" style={{ borderCollapse: "collapse", border: "1px solid black", width: "100%" }}>
                    <thead>
                        <tr>
                            {/* <th style={{ border: "1px solid black", height: "50px" }}>Customer</th> */}
                            {/* {head} */}
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