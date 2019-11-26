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
        var monthPush = []
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
                function customerNameOnly(customerName, mo) {
                    var tempData = values[customerName]
                    console.log("tempData", tempData);

                    // console.log("need salesperson name : ", tempData); 
                    var re = /^[A-Z ,]*$/; // Filter Customer name
                    if (re.test(customerName)) {
                        var td = []
                        var sales_person_name = []
                        rowPush.push(
                            <>
                                <tr>
                                    <td rowSpan="7" style={{ border: "1px solid black", fontWeight: "bolder" }}>
                                        {customerName}
                                    </td>
                                </tr>
                                <tr>
                                    {/* <td>sale person</td> */}
                                    {/* Need to dynamically set colSpan for Sale person logically */}
                                    {typeof tempData === "object" && Object.keys(tempData).forEach(function (monthNameKey) {
                                        if (monthNameKey !== "type" && monthNameKey !== "key") {
                                            td.push(monthNameKey)
                                            {
                                            typeof tempData[monthNameKey] === "object" &&
                                                Object.keys(tempData[monthNameKey]).forEach(function (saleP) {
                                                    let x = tempData[monthNameKey][saleP]
                                                    if (x !== "row" && x !== "month") {
                                                        // console.log("hereee");
                                                        // console.log("tempData[monthNameKey][saleP] ", x);
                                                        Object.keys(x).forEach(function (sales_person) {
                                                            if (sales_person !== "type" && sales_person !== "key") {
                                                                // console.log("sale person ", sales_person);
                                                                td.push(sales_person)
                                                            }
                                                        })
                                                    }
                                                })
                                            }
                                        }
                                    })}
                                    {td.map((monthName) => {
                                        return (
                                            <td colSpan="2"
                                                style={{ fontFamily: "fantasy", fontSize: "20px", fontWeight: "bolder", }}
                                                >
                                                {monthName}
                                            </td>
                                            )
                                    })}
                                    {/* <td>{sales_person_name}</td> */}
                                </tr>
                            </>
                        )
                    }
                }
                customerNameOnly(k, monthsArr);
                if (values[k].value) {
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
                } else {  // loop through the object to skip 'type' and 'key' keys
                    Object.keys(subObj).forEach(function (itemKey, index) {
                        if (typeof subObj[itemKey] === 'object') {
                            pivotTablePlot(subObj[itemKey]); // recursively call  
                        }
                    })
                }
            })
        }
        pivotTablePlot(tempObj);

        let monthName = []
        let sales_person = []
        for (let index = 0; index < 4; index++) {
            monthName.push(<td colSpan={index + 4}>Month {index + 1}</td>)
            sales_person.push(<td colSpan="2">Sales person {index + 1}</td>)
        }

        let valQty = []
        for (let index = 0; index < 10; index++) {
            valQty.push(
                <>
                    <td>Value</td>
                    <td>Quantity</td>
                </>)
        }
        return (
            <>  <h4>Mission Pivot table</h4>
                <table border="1" style={{ borderCollapse: "collapse", border: "1px solid black", width: "100%" }}>
                    <thead style={{ fontSize: "18px", fontWeight: "bold" }}>
                        <tr>
                            <td rowSpan="3" style={{ color: "#fff" }}>customer_name</td>
                            {monthName}
                        </tr>
                        <tr>
                            {sales_person}
                            {sales_person}
                        </tr>
                        <tr>
                            {valQty}
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