import React, { Component } from 'react'
import { storeProducts } from "./data"

export default class CustomObj extends Component {
    constructor(props) {
        super(props)
        this.state = {
            store: storeProducts.data,
            tempObjData: ''
        }
    }

    render() {
        let store = this.state.store;
        var tempObj = {};
        var rows = ['customer_name','month'];
        var cols = ['item_name','salesperson_name'];
        var data = ['taxpaidamount','qty'];
        Object.keys(store).forEach(function (k) {
            var val = store[k];

            if (!tempObj[rows[0]])
                tempObj[rows[0]] = {};

            if (!tempObj[rows[0]][rows[1]])
                tempObj[rows[0]][rows[1]] = {}

            if (!tempObj[rows[0]][rows[1]][cols[0]])
                tempObj[rows[0]][rows[1]][cols[0]] = {}

            if (!tempObj[rows[0]][rows[1]][cols[0]][cols[1]])
                tempObj[rows[0]][rows[1]][cols[0]][cols[1]] = {}

            tempObj[rows[0]][rows[1]][cols[0]][cols[1]][data[0]] = val['taxpaidamount'];
            tempObj[rows[0]][rows[1]][cols[0]][cols[1]][data[1]] = val['qty'];

        });

        console.log("result :", tempObj);
        var tempObjData = JSON.stringify(tempObj)
        
        console.log("JSON stringify",tempObjData) 
        document.write(tempObjData)

        return(
          <>
                    <ul>
                        {/* {dataa} */}
                        dfsfdsf
                    </ul>
          </>
      )
    }
}
