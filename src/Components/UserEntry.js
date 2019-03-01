import React, {Component} from "react"
import firebase from 'firebase'

class UserEntry extends Component {
    constructor() {
        super()
        this.state = {
            userInputDate: "",
            userInputExercise: "",
            workouts: [] //Array where InputDate and Exercises are pushed
        }
    }
    
    handleSubmit = (e) => {
        e.preventDefault()
        const workouts = this.state.workouts
        const workout = {
            //workout is equal to an date as array key with excercise as its value
            [this.state.userInputDate]: this.state.userInputExercise
        }
        workouts.push(workout) //push individual workout object (each day is it's own workout), to the workouts array
        this.setState({workouts}) 

        const dbRef = firebase.database().ref()
        console.log(workout)
        dbRef.push(workout) //note: not this.state.workout as it does not exist
    }

    handleChange = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }

    componentDidMount() {
        const dbRef = firebase.database().ref()

        dbRef.on('value', response => { //get val of database
            const newState = []; //once we have data from the on value, we create a new array and reset to this new array
            const data = response.val() //data is an object, we need an array of the dates 
            // for (let key in data){
            //     newState.push({
            //         key: key,
            //         exercise:data[key]
            //     })
            })
        
            // this.setState({
            //     workouts: newState //prints to page
            // })
        }

    
 render() {
     return (         
         <div>
             <h1>Workout Journal</h1>
             <div>
                <h2>Current Workouts</h2>
                <ul>
                {this.state.workouts.map( workout => {
                    return (
                        <li>{Object.keys(workout)} -  {Object.values(workout)}</li>
                    )
                })}
                </ul>
             </div>
                 <form
                     action="submit"
                     onSubmit={this.handleSubmit}
                     className="dateInputForm"
                 >

                     <input
                         type="date"
                         name="userInputDate"
                         onChange={this.handleChange}
                         placeholder="enter date"
                        //  value={this.state.userDateInput}
                     />

                     <input
                         type="text"
                         name="userInputExercise"
                         onChange={this.handleChange}
                         placeholder="enter exercise"
                        //  value={this.state.userExerciseInput} 
                         />                    
                    <button type="submit">Submit Workout</button>

                 </form>
             
             
         </div>
     )
 }
}

export default UserEntry

//have a state of input numbers - and then for amount of inputs, render component called input // this will keep rendering on click, it'd increment the state once. 