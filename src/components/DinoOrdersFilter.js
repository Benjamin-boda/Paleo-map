import React, {useState, useEffect} from "react";
import {Form} from "react-bootstrap";

export const DinoOrdersFilter = ({loaded, dinosauriaOrderArray, setDinosauria}) => {
    const [order, setOrder] = useState("")

    const onOrderChange = (e) => {
        setOrder(e.target.value)
    }

    useEffect(() => {
        if (order !== "") {
            const NoUndefined = dinosauriaOrderArray.filter((dino) => dino.cll !== undefined)
            const orderFiltered = NoUndefined.filter((dino) => dino.cll === order)
            setDinosauria(orderFiltered)
        } else {
            setDinosauria(dinosauriaOrderArray)
        }
         
    }, [order, loaded])

    return (
        
            <Form.Control className="filters__select" as="select" onChange={onOrderChange}>
                <option value="">--Filter by order--</option>
                <option value="Saurischia">Saurischia</option>
                <option value="Ornithischia">Ornithischia</option>
                <option value="Aves">Aves</option>
            </Form.Control>
        
    )
}