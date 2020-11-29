import React, {useState, useEffect} from "react";
import {Modal, Button} from "react-bootstrap";

export const MarkerModal = ({dino, modalIsOpen, setModalIsOpen}) => {
    const [wikiInfos, setWikiInfos] = useState([])
    const [sourceError, setSourceError] = useState(false)
    

    useEffect(() => {
        async function getWikiApi() {
            await fetch(`https://en.wikipedia.org/w/api.php?origin=*&action=query&prop=pageimages&titles=${dino.gnl}&pithumbsize=500&format=json`)
                .then((req) => req.json())
                .then((res) => {
                    const wikiSource = res.query.pages
                    setWikiInfos(Object.values(wikiSource).map(({ thumbnail }) => thumbnail)[0].source)
                    setSourceError(false)
                })
                .catch((err) => setSourceError(true))
        }

        getWikiApi()
    }, [])

    return (
        <Modal aria-labelledby="contained-modal-title-vcenter" centered show={modalIsOpen} onHide={() => setModalIsOpen(!modalIsOpen)}>
            <Modal.Header className="modal__title">{dino.gnl}</Modal.Header>
            <Modal.Body>
                {sourceError ? undefined : <img className="modal__image" src={wikiInfos}/>}
                <p className="modal__text"><span className="modal__text__bold">Location : </span>{dino.ggc}</p>
                <p className="modal__text__bold">Clade : <a className="modal__link" target="_blank" href={`https://en.wikipedia.org/wiki/${dino.cll}`}>{dino.cll}</a></p>
                <p className="modal__text__bold">Details on Wikipedia : <a className="modal__link" target="_blank" href={`https://en.wikipedia.org/wiki/${dino.gnl}`}>{dino.gnl}</a></p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" size="sm" onClick={() => setModalIsOpen(!modalIsOpen)}>Close</Button>
            </Modal.Footer>
        </Modal>
    )
}