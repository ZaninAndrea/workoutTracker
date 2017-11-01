import React, {Component} from "react"
import gql from "graphql-tag"
import {graphql} from "react-apollo"
import "../styles/App.css"
import CreateWorkout from './CreateWorkout'

class App extends Component {
    render() {
        if (this.props.allWorkoutsQuery && this.props.allWorkoutsQuery.loading) {
            return <div>Loading</div>
        }
        if (this.props.allWorkoutsQuery && this.props.allWorkoutsQuery.error) {
            return <div>Error</div>
        }

        const workouts = this.props.allWorkoutsQuery.allWorkouts

        return (
            <div className="App">
                {workouts.map(workout=><div key={workout.id} className="workout">
                    <b>{workout.title}</b><br />
                    {workout.description}<br /><br />
                </div>)}
                <CreateWorkout />
            </div>
        )
    }
}

const ALL_WORKOUTS_QUERY = gql`
query AllWorkoutsQuery {
    allWorkouts {
        id
        title
        description
    }
}
`

export default graphql(ALL_WORKOUTS_QUERY, {name: "allWorkoutsQuery"})(App)
