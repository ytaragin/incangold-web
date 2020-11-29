import React from "react";


function Card() {
    return (
        <div className="Card">
            A Card
        </div>
    )
}


class PlayedArea extends React.Component {
    render() {
        return (
            <div className="PlayedArea">
                Cards
                <Card/>
            </div>
        )
    }
}


export default PlayedArea;
