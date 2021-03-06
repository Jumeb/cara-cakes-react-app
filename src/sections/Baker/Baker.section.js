import React, { useEffect, useState } from 'react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import styles from './Baker.module.css';
import {BakersCard, Notification} from '../../Components';
import { BASE_URL } from '../../utils/globalVariable';
import { setBakers } from '../../redux/Actions/Data.actions';

const Baker = (props) => {

    const [bakers, setBakers] = useState([]);
    const [show, setShow] = useState(false);
    const [message, setMessage] = useState({});

    useEffect(() => {
        fetch(`${BASE_URL}/bakers`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })
        .then(res => {
            const statusCode = res.status;
            const response = res.json();
            return Promise.all([statusCode, response]);
        })
        .then(res => {
            const statusCode = res[0];
            const response = res[1];

            if (statusCode === 200) {
                props.setBakers(response.bakers);
                setBakers(response.bakers.sort((x, y) => y.total - x.total));
            }
        })
        .catch(err => {
            setShow(true);
                setMessage({
                    type: 'error',
                    title: 'Unexpected Error',
                    message: 'Please check your internet connection.'
                })
        })

        return () => {
        }

    }, []);

    return (
        <section className={styles.secDescription} id="stry">
            <h2 className={styles.title}>
                Our top expert bakers
            </h2>
            <div className={styles.dashScroll}>
                <div className={styles.dashContainer}>
                    {bakers.map((baker, index) => ((index <= 3) && <BakersCard baker={baker} key={index} />))}
                </div>
            </div>
            <Notification show={show} setShow={setShow} message={message} />
        </section>
    )
}
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ setBakers }, dispatch);
};

export default connect(null, mapDispatchToProps)(Baker);

