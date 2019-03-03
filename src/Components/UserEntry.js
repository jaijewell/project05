import React, {Component} from "react"
import firebase from 'firebase'

class UserEntry extends Component {
    constructor(props) {
        super()
        this.state = {
            workouts: [], //Array where InputDate and Exercises are pushed
            userInputDate: "",
            userInputExercise: ""
        }
    } //constructor ends here

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    } //handleChange
    
    // combArrays = () => {
    //     const workouts = this.state.workouts;
    //     const dateArray=this.state.dateArray;
    //     workouts.push(dateArray)
    //     const dbRef=firebase.database().ref()
    //     dbRef.push(workouts)
    //     this.setState(workouts)
    // } creating a this.state.dateArray as an empty array and pushing an array into the workouts array .. did not work.

    addDate = () => {
        const date = this.state.userInputDate;
        //date returns date when console.log
        const workouts=this.state.workouts
        // console.log(workouts) returns an array
        workouts.push(date)
        const dbRef = firebase.database().ref()
        dbRef.push(date)

        this.setState(workouts)
    }

    addExercise = () => {
        const date = this.state.userInputDate;
        console.log(date)

        const exercise = this.state.userInputExercise;
        console.log(exercise)
        // console.log(exercise)
        const workouts = this.state.workouts
        // const userInputDate;
        // const workouts = this.state.workouts
        date.push(exercise)
        // this.setState(workouts)
        const dbRef = firebase.database().ref()
        dbRef.push(exercise)
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
                            <h3> {Object.values(workout)} </h3>
                        </li>    
                    )
                    })}

                {/* this.state.dateArray.map(exercise => {
                    return (
                        <li>
                            <p>{Object.values(exercise)}</p>
                        </li>
                    )
                }) */}
            </ul>
            </div> 
        </div>
    )}
}

export default UserEntry

//have a state of input numbers - and then for amount of inputs, render component called input // this will keep rendering on click, it'd increment the state once. 