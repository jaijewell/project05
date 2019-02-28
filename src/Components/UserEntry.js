import React, { Component } from 'react';
import firebase from 'firebase'

class UserEntry extends Component {
    constructor() {
        super();

        this.state = {
            date: [], //empty array to hold date, userInput re: exercises
            exercises: [], //empty array to hold exercises, userExerciseInput
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
        // console.log(this.state.userDateInput)

        const dbRef = firebase.database().ref()
        dbRef.push(this.state.userDateInput)

        this.setState({
            userDateInput: '' // on submit, empty the user input so they can enter a new date
        })
    } //handleSubmit ends here

    addExercise = () => {
        const copiedArray = Array.from(this.state.exercises); 
        copiedArray.push(this.state.userExerciseInput);
        //copy of state and push to copy and update 
        console.log(this.state.userExerciseInput);
        console.log(copiedArray)
        this.setState({
            exercises: copiedArray
        })
    }

    componentDidMount() {
        const dbRef = firebase.database().ref(); //var holds ref to DB

        dbRef.on('value', response => { //get val of database
            const newState = []; //once we have data from the on value, we create a new array and reset to this new array
            const data = response.val() //data is an object, we need an array of the dates 
            for (let key in data) {
                newState.push({
                    key: key, //ability to target indiv dates
                    day: data[key],  //push day
                   
                })
            }
            this.setState({
                date: newState
            })
        })
    }
render() {
    return (
        <div className="FormContainer">
            <ul>
                {
                this.state.date.map((dates) => {
                    return (
                        <li key={dates.key} id={dates.key}>
                            <p>{dates.day} - {dates.key}</p>
                        </li>
                    )
                })
            }
            {
                this.state.exercises.map((exercise) => {
                    return (
                <li key={exercise} id={exercise.key}>
                    <p>{exercise} - {exercise.key}</p>
                </li>
                    )
                })
     
            }
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
export default UserEntry