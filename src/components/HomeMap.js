import React, {useState, useEffect} from "react";
import { ComposableMap, Geographies, Geography, Marker, ZoomableGroup} from "react-simple-maps";
import world from '../map/world.json';
import {MarkerModal} from "./MarkerModal";
import {DinoFilter} from "./DinoFilter";
import {DinoSearch} from "./DinoSearch";

export const HomeMap = () => {
    const [dinosauria, setDinosauria] = useState([])
    const [idModal, setIdModal] = useState(0)
    const [modalIsOpen, setModalIsOpen] = useState(false)
    const [continentOrCountry, setContinentOrCountry] = useState([])
    const [loaded, setLoaded] = useState(false)
    const [dinosauriaOrderArray, setDinosauriaOrderArray] = useState([])
    const [textId, setTextId] = useState("")

    useEffect(() => {
        async function getPBDBApi() {
            setLoaded(false)
            await fetch(`https://paleobiodb.org/data1.2/specs/list.json?datainfo&rowcount&base_name=Dinosauria&idqual=certain${continentOrCountry}&show=class,abund,coll,coords,loc,geo,acconly&textresult`)
                .then((req) => req.json())
                .then((res) => {
                    setDinosauria(res.records)
                    setDinosauriaOrderArray(res.records)
                    setLoaded(true)
                })
        }

        getPBDBApi()
    }, [continentOrCountry])

    return (
        <div>
            <DinoSearch loaded={loaded} dinosauria={dinosauria} setIdModal={setIdModal} setModalIsOpen={setModalIsOpen}/>

            <div className="map">
                <ComposableMap width={window.innerWidth} height={window.innerHeight * 0.8}>
                    <ZoomableGroup zoom={1} center={[0,0]}>
                        <Geographies geography={world}>
                            {({ geographies }) =>
                                geographies.map(geo => <Geography key={geo.rsmKey} geography={geo} fill="#000000" stroke="#FFF"/>)
                            }
                        </Geographies>
                        {dinosauria.map((dino) =>
                            
                            
                            <Marker key={dino.oid} coordinates={[dino.lng, dino.lat]} 
                                onMouseEnter={() => setTextId(dino.oid)}
                                onMouseLeave={() => setTextId("")}
                                style={{
                                    default: { fill: "#666" },
                                    hover:   { fill: "#ff4500" },
                                    pressed: { fill: "#fff44f" },
                                }}>
                                
                                <circle 
                                    onClick={() => {
                                        setModalIsOpen(!modalIsOpen)
                                        setIdModal(dino.oid)}}
                                        cx="12" cy="10" r="3"  
                                />
                                {textId === dino.oid ? <text className="marker__text" style={{ fontFamily: "OpenSansRegular"}} textAnchor="middle">{dino.gnl}</text> : undefined}
                                {idModal === dino.oid ? <MarkerModal dino={dino} modalIsOpen={modalIsOpen} setModalIsOpen={setModalIsOpen} /> : undefined}
                            </Marker>
                        )}  
                    </ZoomableGroup>   
                </ComposableMap>
            </div>
            
            <DinoFilter
                loaded={loaded}
                continentOrCountry={continentOrCountry}  
                setContinentOrCountry={setContinentOrCountry} 
                dinosauriaOrderArray={dinosauriaOrderArray} 
                setDinosauria={setDinosauria}
            />
        </div>
    )
}