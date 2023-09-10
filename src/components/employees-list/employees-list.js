import EmployeesListItem from "../employees-list-item/employees-list-item"

import './employees-list.css'


const EmployeesList = ({data, onDelete, onToggleProp, onUpdateSalary}) => {

    const elements = 
    data.length ? 
    data.map(item => {
        const {id, ...itemProps} = item
        return (
            <EmployeesListItem key = {id} 
            {...itemProps}
            onDelete={()=> onDelete(id)}
            onToggleProp={(e)=>onToggleProp(id, e.currentTarget.getAttribute(['data-toggle']))}
            onUpdateSalary = {(e)=>onUpdateSalary(e.target.value.slice(0,-1), id)}/>
        )
    })
    :(
        <li className="list-group-item d-flex justify-content-between">
            <span className="list-group-item-label">
                Your list is empty
            </span>
        </li>
    )

    return (
        <ul className="app-list list-group">
            {elements}
        </ul>
    )
}

export default EmployeesList