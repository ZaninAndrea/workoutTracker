import React, {Component} from "react"
import gql from "graphql-tag"
import {graphql} from "react-apollo"

class CreateWorkout extends Component {
    render() {
        return (
            <div className="createWorkout" onClick={this._createLink}>
                create workout
            </div>
        )
    }

    _createLink = async () => {
      const { description, title, userId } = {
          description: "bal bla",
          title: "TITLE",
          userId: "cj9gw4kg66hso01755c4gfhbr"
      }
      await this.props.createWorkoutMutation({
        variables: {
          description,
          title,
          userId
        }
      })
    }
}

const CREATE_WORKOUT_MUTATION = gql`
  mutation CreateWorkoutMutation($title: String!, $description: String!, $userId:ID!) {
    createWorkout(
      description: $description,
      title: $title,
      userId: $userId
    ) {
      id
    }
  }
`

// 3
export default graphql(CREATE_WORKOUT_MUTATION, { name: 'createWorkoutMutation' })(CreateWorkout)
