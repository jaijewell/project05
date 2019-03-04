import React, {Component} from 'react';
import firebase from 'firebase';

class UserEntry extends Component {
    constructor(props) {
        super(props);

        this.state = {
            // Initial state for user input is empty
            inputDate: '',
            inputExercise: '',
            workouts: []
            //creating a workout array, end result should look like an array of objects for each date e.g. 
            // workouts: [
            //  {
            //   date: 'yyyy mm dd',
            //   exercise: ["squat",  "bench", "deadlift"]
            //   }
            // ]
        }
    } 
    
    // Function updating the state with the user's input values
    handleChange = (e) => {
        this.setState(
            {
                [e.target.name]: e.target.value
            }
        )
    }

    // When 'Log Workout' button is clicked:
        // clone array to not update state directly
        // use .find to determine if the inputDate is an existing object in the workout array
        // if no existing date is found in the workout array set up an exercises array and push the inputExercise to said array
        //create new object "entry" to hold the inputDate and the exercises array, push "entry" to the workout clone, to not update state directly.
        //if the date does exist push the user's input exercise into the object
    handleSubmit = (e) => {
        e.preventDefault();
        const dbRef = firebase.database().ref();
        let workouts = this.state.workouts;
        let workoutsClone = [...workouts];
        
        let inputDate = this.state.inputDate;

        const dateExist = workoutsClone.find( (item) => {
            return item.date === inputDate; 
        })
        let input = this.state.inputExercise;
        // If the date is not found in the workout array
        if(!dateExist) {     
            let exercises = [];
            exercises.push(input);
            
            const entry = {
                date: inputDate,
                exercises: exercises
            }
            workoutsClone.push(entry);
        
        // Else, if the date does exist already in the workouts array
        } else {
            dateExist.exercises.push(input);
            dbRef.push(dateExist)
        }   

        //push to firebase
        dbRef.push(workoutsClone)
        this.setState({
            workouts: workoutsClone 
        });
    }

    componentDidMount(){
        const dbRef = firebase.database().ref();
        dbRef.on('value', response => {
            const newState = [];
            const data = response.val(); 
                // can we talk about this section? I cannot figure it out. Can you confirm that the/a best way to do this, would to have componentDidMount as a separate component, as well as maybe have a date component, and an exercise component?
                for (let key in data) {
                    newState.push({
                        key: key,
                        dateObj: data[key]
                    })
                }   
            
                this.setState({ 
                    workouts2: newState // this prints to page.  
                })
            })
    }

    render() {
        return (  
            <div className="wrapper">
                <form onSubmit={this.handleSubmit}>
                    <label 
                        htmlFor="inputDateId">
                        Select date of workout:
                    </label>
                    <input 
                        type="date"
                        name="inputDate"
                        id="inputDateId"
                        required
                        // every time user updates the input, 
                        // calls handleChange and update state
                        onChange={this.handleChange}
                        />
                    <label
                        htmlFor="inputExerciseId"
                        className="visuallyHidden">
                        Enter exercise Details
                    </label>
                    <input 
                        type="text"
                        placeholder="Enter exercise details"
                        name="inputExercise"
                        id="inputExerciseId"
                        required
                        // every time user updates the input,
                        // calls handleChange and update state
                        onChange={this.handleChange}
                        />
                    <button>Log Workout!</button>
                </form>
                <div>
                    <ul>
                        {this.state.workouts.map((workout,i) => {
                            return (
                                <li key={i}>
                                   <h3> {Object.values(workout.date)}</h3>
                                    <ul>
                                        <li className="workoutList">
                                            {Object.values(workout.exercises).map((exercise, i)=>{
                                                return (<p key={i}>{exercise}</p>)
                                            })}
                                        </li>
                                    </ul>
                                </li>
                            )
                        })}
                    </ul>
                </div>
            </div>
        )
    }
}
export default UserEntry;