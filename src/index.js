import React from "react"
import { render } from "react-dom"
import { Observable } from "rxjs"
import config from "recompose/rxjsObservableConfig"
import {
  setObservableConfig,
  componentFromStream,
  createEventHandler
} from "recompose"

setObservableConfig(config)

const SimpleForm = ({ text, onInput }) => (
  <div>
    <input type="text" onInput={onInput}/>
    <h2>{text}</h2>
  </div>
)

const SingleFormSteams = componentFromStream(props$ => {
  const {stream:onInput$, handler:onInput} = createEventHandler()

  const text$ = onInput$.map(e => e.target.value).delay(1000).startWith('')

  return text$.map(text => ({ text, onInput})).map(SimpleForm)
})

const logInput = e => console.log(e.target.value)


const App = () => (
  <div>
    <SingleFormSteams />
  </div>
)
render(
  <App/>, document.getElementById("root"))

