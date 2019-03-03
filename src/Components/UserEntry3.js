import React, {Component} from "react"
import firebase from 'firebase'

class UserEntry3 extends Component {
    constructor(props) {
        super()
        this.state = {
            workouts: [],
            userInputDate: "",
            userInputExercise: ""
        }
    } //constructor ends here

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    } //handleChange
    
    addDate = () => {
        const date = this.state.userInputDate;
        const exercise = this.state.userInputExercise;
        const workouts=this.state.workouts
        const dateObject = {
            dateKey: date,
            exercise: [exercise] 
        }
        // console.log(dateObject.exercise)
        workouts.push(dateObject.date)
        // const dbRef = firebase.database().ref()
        // dbRef.push(workouts)
        // this.setState(workouts)
    } //addDate ends here

    addExercise = () => {
        const date = this.state.date;
        console.log(date)
        const exercise = this.state.userInputExercise;
        console.log(exercise)
        const workouts = this.state.workouts;
        
        const dateObject = {
            dateKey: date,
            exerciseKey: [exercise]
        }

        dateObject[exerciseKey].push(exercise)
       
        // dateObject[exerciseKey].push(exercise);
        
        // this.setState(workouts)
        // const dbRef = firebase.database().ref()
        // dbRef.push(exercise)
        // this.setState(workouts)
    }

    // handleSubmit = (e) => {
    //     e.preventDefault()
    //     const workouts = this.state.workouts
    //     const workout = {
    //         [this.state.userInputDate]: this.state.userInputExercise
    //     }
    //     workouts.push(workout) // push individual workout object to the workouts array
    //     this.setState({workouts}) 

    //     const dbRef = firebase.database().ref()
    //     dbRef.push(workout)
    // } //handleSubmit ends here

    componentDidMount() {
        const dbRef = firebase.database().ref()
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
        removeExercise=(exerciseId)=>{
            const dbRef = firebase.database().ref(exerciseId)
            dbRef.remove()
        }
    
render() {
    return (         
        <div className="wrapper">
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
                <button type="button" className="dateSubmit" onClick={this.addDate}>Add Date</button>
                
                <input
                    type="text"
                    name="userInputExercise"
                    onChange={this.handleChange}
                    placeholder="enter exercise"
                    value={this.state.userExerciseInput}
                />
                <button type="button" className="exercieSubmit" onClick={this.addExercise}>Add exercise</button> 

                <button type="submit">submit workout</button>
            </form>       
        <div>
            <h2>Current Workouts</h2>
            <ul>
                {this.state.workouts.map(workout => {
                    return (
                 
                        <li key={workout.key}>
                            <h3> {Object.keys(workout)}</h3>
                            
                            <div>
                            <p key={workout.key}> {Object.values(workout)}</p> 
                                <button onClick={()=>this.removeExercise(Object.values(workout))}><i className="far fa-times-circle"></i></button>
                            </div>


                        </li> 
                    )
                    })}
            </ul>
            </div> 
        </div>
    )}
}

export default UserEntry3
{/* 
// have a state of input numbers - and then for amount of inputs, render component called input // this will keep rendering on click, it'd increment the state once.  */}