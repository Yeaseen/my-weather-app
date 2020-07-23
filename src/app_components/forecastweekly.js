
import React from 'react';

const ForecastWeekly = (props) => {
    //console.log(typeof(props.daily))

    return (
        <div>
            {props.forecastWeekly ?
                (
                    <div>
                        <br></br>

                        <h1>Weather forecast of every 3 hours for next 5 days</h1>
                        <table className="table table-bordered table-dark">
                            <thead>
                                <tr>
                                    <th scope="col">Date</th>
                                    <th scope="col">Time</th>
                                    <th scope="col">Temperature</th>
                                    <th scope="col">Humidity</th>
                                    <th scope="col">Feels like</th>
                                    <th scope="col">Status</th>
                                    <th scope="col">Wind Speed (metre/sec)</th>
                                </tr>
                            </thead>
                            <tbody>
                                { 
                                    props.daily.map(record => {
                                        return (
                                            <tr key={record.dt}>
                                                <td>{new Date(record.dt * 1000).toLocaleDateString("en-US")}</td>
                                                {/* <td>{new Date(record.dt * 1000).toLocaleDateString("en-US", { weekday: "long" })}</td> */}
                                                <td>{record.dt_txt.split(" ")[1]}</td>
                                                <td>{record.main.temp}&deg;</td>
                                                <td>{record.main.humidity}&#37;</td>
                                                <td>{record.main.feels_like}&deg;</td>
                                                <td>{record.weather[0].description.charAt(0).toUpperCase() +
                                                    record.weather[0].description.slice(1)}</td>
                                                <td>{record.wind.speed}</td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>)

                : null}
        </div>
    );
};

export default ForecastWeekly;