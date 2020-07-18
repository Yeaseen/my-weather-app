
import React from "react";
import "./weather_design.style.css";
const maxminTemp = (min, max) => {
    if (max && min) {
        return (
            <h3>
                <span className="px-4">Min Temp: {min}&deg;</span>
                <span className="px-4">Max Temp: {max}&deg;</span>
            </h3>
        );
    }
}
const Weather = (props) => {
    return (
        <div>

            {props.dataAvailable ?

                (<div className="container">
                    <div className="Card">
                        <h1 className="py-3">{props.cityname}</h1>

                        <h1 className="py-2">Temperature: {props.temp_celsius}&deg;</h1>

                        <h1 className="py-2">Humidity: {props.hum}&#37;</h1>

                        <h1 className="py-2">Feels Like: {props.feels}&deg;</h1>

                        {maxminTemp(props.temp_min, props.temp_max)}

                        <h4 className="py-3">
                            Status: {props.description.charAt(0).toUpperCase() +
                                props.description.slice(1)}
                        </h4>

                    </div>
                </div>)
                : null}
        </div>


    );
};

export default Weather;