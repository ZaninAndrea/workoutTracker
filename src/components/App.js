import React, {Component} from "react"
import gql from "graphql-tag"
import {graphql} from "react-apollo"
import "../styles/App.css"
import CreateWorkout from "./CreateWorkout"

class App extends Component {
    componentDidMount() {
        this._subscribeToNewLinks()
    }

    _subscribeToNewLinks = () => {
        this.props.allWorkoutsQuery.subscribeToMore({
            document: gql`
                subscription {
                    Workout {
                        mutation
                        node {
                            id
                            title
                            description
                        }
                        previousValues {
                            id
                        }
                    }
                }
            `,
            updateQuery: (previous, {subscriptionData}) => {
                const workout = subscriptionData.Workout
                if (workout.mutation==="CREATED"){
                    const newAllWorkouts = [
                        workout.node,
                        ...previous.allWorkouts,
                    ]
                    const result = {
                        ...previous,
                        allWorkouts: newAllWorkouts,
                    }
                    return result
                }
                else if (workout.mutation==="DELETED"){
                    const result = {
                        ...previous,
                        allWorkouts: previous.allWorkouts.filter(wk => wk.id!==workout.previousValues.id),
                    }
                    return result
                }
                else if (workout.mutation==="UPDATED"){
                    const result = {
                        ...previous,
                        allWorkouts: previous.allWorkouts.map(wk => wk.id===workout.previousValues.id ? workout.node : wk),
                    }
                    return result
                }
            },
        })
    }

    render() {
        if (
            this.props.allWorkoutsQuery &&
            this.props.allWorkoutsQuery.loading
        ) {
            return <div>Loading</div>
        }
        if (this.props.allWorkoutsQuery && this.props.allWorkoutsQuery.error) {
            return <div>Error</div>
        }

        const workouts = this.props.allWorkoutsQuery.allWorkouts

        return (
            <div className="App">
                <CreateWorkout />
                <div className="calendar" />
                {workouts.map(workout => (
                    <div key={workout.id} className="workout">
                        <b>{workout.title}</b>
                        <br />
                        {workout.description}
                        <br />
                        <br />
                    </div>
                ))}
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
