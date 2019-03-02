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
    } //constructor ends here
    
    handleSubmit = (e) => {
        e.preventDefault()

        const workouts = this.state.workouts
        const workout = {
            // if({ workouts }.includes([this.state.userInputDate])).push()
            [this.state.userInputDate]: [this.state.userInputExercise]
        }

        // I want to create a function, map through this.state.userInputDate, if that date already exists, (.find) push the value(userInputExercise) to that same objectKey. if it does not exist, create a new array with that objectKey. Where does this go??? 

        workouts.push(workout) //push individual workout object (each day is it's own workout), to the workouts array
        this.setState({workouts}) 

        const dbRef = firebase.database().ref()
        // console.log(workout)
        dbRef.push(workout) //note: not this.state.workout as it does not exist

    } //handleSubmit ends here

    handleChange = (e) => {
        this.setState({[e.target.name]: e.target.value})
    } //handleChange

    componentDidMount() {
        const dbRef = firebase.database().ref() //referencing database,  

        //shouldn't this be getting the value from the database?
        dbRef.on('value', response => { //get val from the database to update
            const newState = []; //once we have data from the on value, we create a new array and reset to this new array 

            const data = response.val() //data is an object, we need an array of the dates 
            
            // console.log(data)
            //loop through the database,
            // for (let key in data){
            //     newState.push({
            //         key: key,
            //         [Object.keys(data[key])]:Object.values(data[key])
            //     })
            // }
            // console.log(newState)
            // this.setState({
            //     workouts: newState //prints to page
            // })  
        })
    } //componentdidmount ends here

    // addExercise = () => {
    //     const copiedArray = Array.from(this.state.workouts); 
    //     copiedArray.push(this.state.userInputDate);
    //     //copy of state and push to copy and update 
    //     console.log(this.state.userInputExercise);
    //     // console.log(copiedArray)
    //     this.setState({
    //         workouts: copiedArray
    //     })
    // }
    
        // give user option to delete an exercise - currently get an error, stretch goal.
        // removeExercise=(exerciseId)=>{
        //     const dbRef = firebase.database().ref(exerciseId)
        //     //
        //     dbRef.remove()
        // }
    
 render() {
    return (         
        <div className="wrapper">
            <h1>Workout Journal</h1>
             
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
                         value={this.state.userDateInput}
                    />

                    <input
                        type="text"
                        name="userInputExercise"
                        onChange={this.handleChange}
                        placeholder="enter exercise"
                        value={this.state.userExerciseInput} 
                         />    
                    <button type="button" onClick={this.addExercise}>Add entry</button>                
                    <button type="submit">Submit Workout</button>

                </form>
            <div>
                <h2>Current Workouts</h2>
                <ul>
                    {this.state.workouts.map(workout => {
                        return (
                          
                            <li key={workout.key}>
                                <p>{Object.keys(workout)} -  {Object.values(workout)}</p>
                             
                                
                                
                            </li>    
                        )
                     })}
                 </ul>
             </div> 
         </div>
    )}
}

export default UserEntry

//have a state of input numbers - and then for amount of inputs, render component called input // this will keep rendering on click, it'd increment the state once. 