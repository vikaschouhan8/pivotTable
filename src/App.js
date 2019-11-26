import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import Table from './Table';
import CustomObj from './CustomObj';
import LastCustomObj from './LastCustomObj';
import CustomObjSalesPewrsonDoneButMonthPartiallyDone2Working from './CustomObjSalesPewrsonDoneButMonthPartiallyDone2Working'
class App extends Component {
  render() {
    return (
      <div className="App">
        {/* <Table /> */}
        {/* <CustomObj /> */}
        {/* <LastCustomObj /> */}
        {/* <CustomObjLast /> */}
        <CustomObjSalesPewrsonDoneButMonthPartiallyDone2Working />
      </div>
    );
  }
}

export default App;
