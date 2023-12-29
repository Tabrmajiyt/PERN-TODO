import React, { Fragment } from 'react'
// Component
import { InputTodo, ListTodo } from './components/index'

const App = () => {
  return (
    <Fragment>
      <div className="container">
        <InputTodo />
        <ListTodo/>
      </div>
    </Fragment>
  )
}


// Export
export default App