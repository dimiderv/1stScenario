import React, {useEffect, useState} from 'react';
// import {Link} from 'react-router-dom';

function ReadAsset() {
    useEffect( () => {
        fetchItems();
    }, []);

    const [items, setItems] = useState([]);

    const fetchItems = async () => {
        const data = await fetch('/readAsset');
        const items = await data.json();
        setItems(items);
    };

    return(
        <section>
            {
            items.map(item => (
                <div className="container-fluid p-3 w-50">
                    <div className="card-deck">
                        <div className="card">
                            <div className="card-body p-1">
                                <h6 className="card-title">{item.ID}</h6>
                                <p className="card-text">{item.color}</p>
                                <p className="card-text"><i>by {item.weight}</i></p>
                                <p className="card-text"><i>Owner  {item.owner}</i></p>
                                <p className="card-text"><i>Creator {item.creator}</i></p>
                                <p className="card-text"><i>Expires {item.expirationDate}</i></p>
                            </div>
                        </div>
                    </div>
                </div>
             ))
            }
        </section>
    );
}

export default ReadAsset;