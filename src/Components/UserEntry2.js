import React, { Component } from 'react';
import firebase from 'firebase'

class UserEntry2 extends Component {
    constructor(props) {
        super(props);

        this.state = {
            allWorkouts: [],
            workout: [], //empty object to hold date and user exercises
            
            userDateInput: '', // set initial date input to be blank
            userExerciseInput: ''
        }
    } //constructor ends here

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    } //handleChange ends here

    handleSubmit = (event) => {
        event.preventDefault();
        const {userDateInput, userExerciseInput, workout} = this.state

        const newEntry = {
            [userDateInput]: userExerciseInput
        }

        const dbRef = firebase.database().ref()
    
        workout.push(newEntry)
        dbRef.push(this.state.workout)

        this.setState({
            userDateInput: '' // on submit, empty the user input so they can enter a new date
        })
    } //handleSubmit ends here

    // addExercise = () => {
    //     const copiedArray = Array.from(this.state.exercises); 
    //     copiedArray.push(this.state.userExerciseInput);
    //     //copy of state and push to copy and update 
    //     console.log(this.state.userExerciseInput);
    //     console.log(copiedArray)
    //     this.setState({
    //         exercises: copiedArray
    //     })
    // }

    componentDidMount() {
        const dbRef = firebase.database().ref(); //var holds ref to DB

        dbRef.on('value', response => { //get val of database
            const newState = []; //once we have data from the on value, we create a new array and reset to this new array
            const data = response.val() //data is an object, we need an array of the dates 
            Object.keys(data).map(item => {
                return (
                    newState.push(data[item])
                )
            })
            // const exerciseData = response.val()
                
            this.setState({
                workout: newState
            })
        })
    }
render() {
    if (this.state.workout){
        
        return (
            <div className="FormContainer">
            <ul>
                {Object.keys(this.state.workout).map((date,key) => {
                    return (
                        <div>
                        
                        {console.log(this.state.workout)}
                        </div>
                        
                    )
                })}
            </ul>
                <form
                    action="submit"
                    onSubmit={this.handleSubmit}
                    className="dateInputForm"
                >
    
                    <input
                        type="date"
                        name="userDateInput"
                        onChange={this.handleChange}
                        placeholder="enter date"
                        value={this.state.userDateInput}
                    />
    
                    <input
                        type="text"
                        name="userExerciseInput"
                        onChange={this.handleChange}
                        placeholder="enter exercise"
                        value={this.state.userExerciseInput} />
                    <button type="button" onClick={this.addExercise}>Add entry</button>
                    <button type="submit">submit workout</button>
    
                    { /*    <form className="inputExercise">
                        <input type="text" className="exerciseName">Exercise</input>
                        <form action="" className="exerciseDetails">
                        <input type="number" className="sets">Sets</input>
                        <input type="number" className="reps">Reps</input>
                        <input type="text" className="notes">Notes</input>
                        </form>
                </form> */}
    
                </form>
            </div>
        );
    }
}
}
export default UserEntry2

