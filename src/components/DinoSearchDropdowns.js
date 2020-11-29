import React, {useEffect, useState} from "react";
import {Dropdown} from "react-bootstrap";

export const DinoSearchDropdowns = ({dinosauria, setOpenDropdown, keyword, setIdModal, setModalIsOpen}) => {
    const [dinoSearch, setdinoSearch] = useState([])

    useEffect(() => {
        const NoUndefined = dinosauria.filter((dino) => dino.gnl !== undefined)
        const NoOtherProperties = NoUndefined.map(({gnl, oid, cll}) => ({gnl, oid, cll}))
        const NoDuplicate = NoOtherProperties.filter((dino, index, self) =>
            index === self.findIndex((element) => (
                element["gnl"] === dino["gnl"]
            ))
        )
        const search = NoDuplicate.filter((dino) => dino.gnl.toLowerCase().indexOf(keyword) > -1)
        setdinoSearch(search.slice(0,10))
        
        if (keyword === "") {
            setOpenDropdown(false)
        }
    }, [keyword])

    return (
        <div>
            {dinoSearch.map((dino) => 
                <li className="header__dropdown" key={dino.oid} 
                    onClick={() => {
                        setModalIsOpen(true)
                        setIdModal(dino.oid)
                        setOpenDropdown(false)
                }}>
                    {dino.gnl} - {dino.cll}
                </li>
            )}
            <Dropdown.Divider />
            <li className="header__dropdown" onClick={() => setOpenDropdown(false)} >Close</li>
        </div>
    )
}