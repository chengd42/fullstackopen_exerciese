const Header = ({course}) =>
  <h1>{course}</h1>
const Content = ({part, exercises}) => 
  <p>{part} {exercises}</p>
const Total = ({all}) => 
  <p>Number of exercises {all}</p>

const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  
  
  return (
    <div>
      <Header course={course} />
      <Content part={part1} exercises={exercises1} />
      <Content part={part2} exercises={exercises2} />
      <Content part={part3} exercises={exercises3} />
      <Total all={exercises1+exercises2+exercises3} />
    </div>
  )
}

export default App