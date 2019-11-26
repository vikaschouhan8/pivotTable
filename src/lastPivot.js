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
        // var rows = ['customer_name','month'];
        // var cols = ['item_name','salesperson_name'];
        // var data = ['taxpaidamount','qty'];
        Object.keys(store).forEach(function (k) {
            var val = store[k];
            var customer = val['customer_name'];
            var month = val['month'];
            var itemName = val['item_name']
            var salesPerson = val['salesperson_name']

            if (!tempObj[customer])
                tempObj[customer] = {'type':'row','key':'customer_name'};

            if (!tempObj[customer][month])
                tempObj[customer][month] = {'type':'row','key':'month'}

            if (!tempObj[customer][month][itemName])
                tempObj[customer][month][itemName] = {'type':'column','key':'item_name'}

            if (!tempObj[customer][month][itemName][salesPerson])
                tempObj[customer][month][itemName][salesPerson] = {'type':'colum','key':'sales_person','data':{'value':0,'qty':0}}

            tempObj[customer][month][itemName][salesPerson]['data']['value'] = val['taxpaidamount'];
            tempObj[customer][month][itemName][salesPerson]['data']['qty'] = val['qty'];

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
