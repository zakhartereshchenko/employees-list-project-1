import './app-filter.css'

const AppFilter = (props) => {
    const buttonsData = [
        {name:'all', label:'All employees'},
        {name:'rise', label:'Up for promotion'},
        {name:'salaryMoreThen1000', label:'Salary more then 1000$'}
    ]

    const buttons = buttonsData.map(({name, label}) => {
        const active = props.filter === name ?  true : false
        const clazz = active ? 'btn-light' : 'btn-outline-light'
        return (
            <button 
                className={`btn ${clazz}`}
                type="button"
                key={name}
                onClick = {() => props.onFilterSelect(name)}>
                    {label}
            </button>
        )
    })
    return (
        <div className="btn-group">
            {buttons}
        </div>
    )
}

export default AppFilter