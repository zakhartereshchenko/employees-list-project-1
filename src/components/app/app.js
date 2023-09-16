import { Component } from 'react'

import AppInfo from '../app-info/app-info'
import SearchPanel from '../search-panel/search-panel'
import AppFilter from '../app-filter/app-filter'
import EmployeesList from '../employees-list/employees-list'
import EmployeesAddForm from '../employees-add-form/employees-add-form'
import './app.css'



class App extends Component {
    constructor(props){
        super(props)
        this.state = {
            data: 
            [
                {name: 'John',salary: 800, increase: false, rise:true, id:1},
                {name: 'Alex',salary:2000, increase: false, rise:false, id:2},
                {name: 'Adam',salary:3000, increase: true, rise:false, id:3},
                {name: 'Sergio',salary:5000, increase: false, rise:false, id:4},
                {name: 'Travis',salary:1700, increase: false, rise:false, id:5}
            ],
            term: '',
            filter: 'all'
        }
        this.maxId = 6
    }
    deleteItem = (id) => {
        this.setState(({data})=>{
            return {
                data: data.filter(item => item.id !== id)
            }
        })
    }
    addItem = ({name, salary}) => {
        if(name && salary){
            this.setState(({data}) => {
                return {
                    data: [
                        ...data,
                        {
                            name: name, 
                            salary: salary, 
                            increase: false, 
                            rise:false,
                            id:this.maxId++
                        }
                    ]
                }
            })
        }
        
    }
    onToggleProp = (id, prop) => {
        this.setState(({data}) => ({
            data: data.map(item => {
                if(item.id === id){
                    console.log(item.name, item.salary)
                    return {...item, [prop]: !item[prop]}
                }
                return item
            })
        }))
    }
    searchEmployee = (items, term) => {
        if(term.length === 0){
            return items
        }

        return items.filter(item => {
            return item.name.indexOf(term) > -1
        })
    }   

    onUpdateSearch = (term) => {
        this.setState({term: term})
    }
    filterData = (data, filter) => {
        switch(filter){
            case 'rise':
                return data.filter(item => item.rise)
            case 'salaryMoreThen1000':
                return data.filter(item => item.salary > 1000)
            default:
                return data
        }
    }
    onFilterSelect = (filter) => {
        this.setState({filter: filter})
    }
    onUpdateSalary = (newSalary, idElement) => {
        this.setState(({data}) => ({
            data: data.map(item => {
                if(item.id === idElement){
                    return {...item, salary: newSalary}
                }
                return item
            })
        }))
    }
    
    render(){
        const {data, term, filter} = this.state
        const employees = data.length
        const increased = data.filter(item => item.increase === true).length


        const visiableData = this.filterData(this.searchEmployee(data, term), filter)

        return (
            <div className="app">
                <AppInfo 
                    employees={employees}
                    increased={increased}
                />
    
                <div className="search-panel">
                    <SearchPanel 
                        onUpdateSearch={this.onUpdateSearch}/>
                    <AppFilter 
                        filter={filter}
                        onFilterSelect={this.onFilterSelect}/>
                </div>
                <EmployeesList 
                    data={visiableData}
                    onDelete={this.deleteItem}
                    onToggleProp={this.onToggleProp}
                    onUpdateSalary={this.onUpdateSalary}
                />

                <EmployeesAddForm
                    onPushItem={this.addItem}
                />
            </div>
        )
    }
}

export default App