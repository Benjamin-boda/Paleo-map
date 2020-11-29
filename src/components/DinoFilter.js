import React, { useEffect, useState } from "react";
import {countryList} from "../map/country";
import {DinoOrdersFilter} from "./DinoOrdersFilter";
import {Form} from "react-bootstrap";

export const DinoFilter = ({loaded, continentOrCountry, setContinentOrCountry, dinosauriaOrderArray, setDinosauria}) => {
    const [continentName, setContinentName] = useState(null)
    const [countryFiltered, setCountryFiltered] = useState(countryList)

    useEffect(() => {
        if (continentName === null || continentOrCountry === "") {
            setCountryFiltered(countryList)
        } else {
            setCountryFiltered(countryList.filter((country) => country.Continent_Name === continentName)) 
        }
       
    }, [continentName])
    

    

    const onContinentChange = (e) => {
        setContinentOrCountry(e.target.value)
        setContinentName(e.target.selectedOptions[0].outerText)
    }

    const onCountryChange = (e) => {
        setContinentOrCountry(e.target.value)
    }

    return (
        <div className="filters__background">
            <div className="filters">

                <Form.Control id="continent" className="filters__select" as="select" onChange={onContinentChange}>
                    <option value="">--Filter by continent--</option>
                    <option value="&cc=ATA">Antarctica</option>
                    <option value="&cc=AFR">Africa</option>
                    <option value="&cc=ASI">Asia</option>
                    <option value="&cc=EUR">Europe</option>
                    <option value="&cc=NOA">North America</option>
                    <option value="&cc=OCE">Oceania</option>
                    <option value="&cc=SOA">South America</option>
                </Form.Control>

                <Form.Control className="filters__select" as="select" onChange={onCountryChange}>
                    <option value="">--Filter by country--</option>
                    {countryFiltered.map((country) => 
                        <option key={country.Country_Name + country.Continent_Code} value={`&cc=${country.Two_Letter_Country_Code}`}>
                            {country.Country_Name.includes(",") ? country.Country_Name.substring(0, country.Country_Name.indexOf(",")) : country.Country_Name}
                        </option>   
                    )}
                </Form.Control>

                <DinoOrdersFilter
                    loaded={loaded}
                    dinosauriaOrderArray={dinosauriaOrderArray} 
                    setDinosauria={setDinosauria}
                />
            </div>
        </div>
        
    )
}