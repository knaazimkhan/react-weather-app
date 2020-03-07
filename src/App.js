import React, { Component } from "react";
import moment from "moment";

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentTemperature: {
                actual: "",
                feels: "",
                summary: "",
                icon: ""
            },
            daily: [],
            location: {
                name: "Toronto, canada",
                lat: 43.6532,
                lng: -79.38323
            }
        };

    }

    componentDidMount() {
        // navigator.geolocation.getCurrentPosition(position =>
        //     console.log(position)
        // );

        const skycons = new window.Skycons({ color: "white" });


        fetch(
            `https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/ca307ada319c01e70496ee5cc6b78e7e/${this.state.location.lat},${this.state.location.lng}?units=ca`
        )
            .then(response => response.json())
            .then(data => {
                this.setState({
                    currentTemperature: {
                        actual: Math.round(data.currently.temperature),
                        feels: Math.round(data.currently.apparentTemperature),
                        summary: data.currently.summary,
                        icon: data.currently.icon
                    },
                    daily: [...data.daily.data]
                });

                skycons.add(
                    "iconCurrent",
                    `${this.state.currentTemperature.icon}`
                );
                skycons.play();

                skycons.add(
                    "icon1",
                    document.getElementById("icon1").getAttribute("data-icon")
                );
                skycons.add(
                    "icon2",
                    document.getElementById("icon2").getAttribute("data-icon")
                );
                skycons.add(
                    "icon3",
                    document.getElementById("icon3").getAttribute("data-icon")
                );
                skycons.add(
                    "icon4",
                    document.getElementById("icon4").getAttribute("data-icon")
                );
                skycons.add(
                    "icon5",
                    document.getElementById("icon5").getAttribute("data-icon")
                );
                skycons.play();
            });

        var placesAutocomplete = window.places({
            appId: 'plV6X3BNJ94E',
            apiKey: 'de4d08b6c1fbb8fbeb09728eed04a234',
            container: document.querySelector('#address')
        });

        var $address = document.querySelector('#address-value')
        placesAutocomplete.on('change', function (e) {
            $address.textContent = e.suggestion.value
            console.log(e.suggestion)

        });

        placesAutocomplete.on('clear', function () {
            $address.textContent = 'none';
        });
        // this.setState({
        //     location: {
        //         name: e.suggestion.value,
        //         lat: e.suggestion.latlng.lat,
        //         lng: e.suggestion.latlng.lng
        //     }
        // });

    }



    render() {
        const daily = this.state.daily;
        return (
            <div className='flex justify-center pt-16'>
                <div className='text-white mb-8'>
                    <div className='places-input text-gray-800'>
                        <input type="search" id="address" className="form-control" placeholder="Where are we going?"

                        />

                        <p>Selected: <strong id="address-value">none</strong></p>
                    </div>
                    <div className='weather-container font-sans w-128 max-w-lg rounded-lg overflow-hidden bg-gray-900 shadow-lg mt-4'>
                        <div className='current-weather flex items-center justify-between px-6 py-8'>
                            <div className='flex items-center'>
                                <div>
                                    <div className='text-6xl font-semibold'>
                                        {this.state.currentTemperature.actual}
                                        °C
                                    </div>
                                    <div>
                                        {`feels like 
                                        ${this.state.currentTemperature.feels}`}
                                        °C
                                    </div>
                                </div>
                                <div className='mx-5'>
                                    <div className='font-semibold'>
                                        {this.state.currentTemperature.summary}
                                    </div>
                                    <div>{this.state.location.name}</div>
                                </div>
                            </div>
                            <div>
                                <canvas
                                    ref='iconCurrent'
                                    id='iconCurrent'
                                    width='96'
                                    height='96'
                                ></canvas>
                            </div>
                        </div>
                        {daily.slice(0, 5).map((day, index) => {
                            return (
                                <div
                                    key={day.time}
                                    className='future-weather text-sm bg-gray-800 px-6 py-8 overflow-hidden'
                                >
                                    <div
                                        className={`flex items-center${
                                            index > 0 ? " mt-2" : ""
                                            }`}
                                    >
                                        <div className='w-1/6 text-lg text-gray-200'>
                                            {moment
                                                .unix(day.time)
                                                .format("ddd")}
                                        </div>
                                        <div className='w-4/6 px-4 flex items-center'>
                                            <div>
                                                <canvas
                                                    id={`icon${index + 1}`}
                                                    data-icon={day.icon}
                                                    width='24'
                                                    height='24'
                                                ></canvas>
                                            </div>
                                            <div className='ml-3'>
                                                {day.summary}
                                            </div>
                                        </div>
                                        <div className='w-1/6 text-right'>
                                            <div>{day.temperatureHigh} °C</div>
                                            <div>{day.temperatureLow} °C</div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
