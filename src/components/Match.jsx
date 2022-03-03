import React from "react"
const Match = ({match}) => {
    return(
        <div>
            <h5>Home: {match.home}</h5>
            <h5>Away: {match.away}</h5>
            <h5>Date: {match.date}</h5>
            <h5>Time: {match.time}</h5>
        </div>
    )
}
export default Match