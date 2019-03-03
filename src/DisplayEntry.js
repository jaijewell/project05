import React, { Component } from 'react';
import firebase from 'firebase';

class DisplayEntry extends Component {
    constructor(props){
        super(props);

        this.state={
             workouts:[]
        }
    }

    componentDidMount(){
        const dbRef = firebase.database().ref();
        dbRef.on('value', response => {
            const newState = []
            const data=response.val()
            for (let key in data) {
                newState.push({
                    key: key,
                title:data                
            })}
            this.setState({
                workouts: newState
            })
        })
    }


    render(){
        return(
            <div className="DisplayEntry">
                <ul>
                    {this.state.workouts.map(workout => {
                        return (
                            <li key={workout.key}>
                                <h3> {Object.keys(workout)}</h3>

                                <div>
                                    <p key={workout.key}> {Object.values(workout)}</p>
                                    <button onClick={() => this.removeExercise(Object.values(workout))}><i className="far fa-times-circle"></i></button>
                                </div>


                            </li>
                        )
                    })}

                </ul>
            
            </div>
        )

    }
}

export default DisplayEntry 
