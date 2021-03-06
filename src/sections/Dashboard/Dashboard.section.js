import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Redirect } from 'react-router';

import { ActivityTwo, BakerInfo, InfoCard, Language, Profile, SearchBar, UserInfo } from '../../Components';
import { BASE_URL } from '../../utils/globalVariable';
import styles from './Dashboard.module.css';
import { setRefresh } from '../../redux/Actions/Refresh.actions';

const Dashboard = (props) => {
    const { token, user } = props;
    const [lbakers, setLbakers] = useState(false);
    const [lusers, setLusers] = useState(false);
    const [users, setUsers] = useState([]);
    const [bakers, setBakers] = useState([]);
    const [obakers, setObakers] = useState([]);
    const [totalOrders, setTotalOrders] = useState(0);
    const [rbakers, setRbakers] = useState(false);
    const [rusers, setRusers] = useState(false);
    const [text, setText] = useState('');

    useEffect(() => {
        setLbakers(true);
        fetch(`${BASE_URL}/allbakers`, {
            method: 'GET',
            headers: {
                'Authorization': `Basic ${token}`,
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
                setLbakers(false);

                if (statusCode === 200) {
                    let sortByOrders = [...response.bakers];
                    let sortByTotal = [...response.bakers]
                    setBakers(sortByTotal.sort((x, y) => y.total - x.total));
                    setObakers(sortByOrders.sort((x, y) => y.orders.ordered.length - x.orders.ordered.length));
                    let total = response.bakers.reduce((sum, baker) => sum + baker.orders.ordered.length, 0);
                    setTotalOrders(total);
                    setRbakers(false);
                }
            })
            .catch(err => {
                console.log(err);
                setLbakers(false);
            })
        
        return () => {
            setLbakers(false);
            setBakers([]);
            setObakers([]);
        }
    }, [rbakers]);

    useEffect(() => {
        setLusers(true);
        fetch(`${BASE_URL}/allusers`, {
            method: 'GET',
            headers: {
                'Authorization': `Basic ${token}`,
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
                setLusers(false);

                if (statusCode === 200) {
                    setUsers(response.users.sort((x, y) => y.total - x.total));
                    setRusers(false);
                }
            })
            .catch(err => {
                console.log(err);
                setLusers(false);
            })
        
        return () => {
            setLusers(false);
            setUsers([]);
        }
    }, [rusers]);


    return (
        <div className={styles.dashboardContainer}>
            <div className={styles.dashboard}>
                <h2 className={styles.dashTitle}>General Info</h2>
                <div className={styles.dashScroll}>
                    <div className={styles.dashContainer}>
                        {lbakers ? <ActivityTwo /> :
                            <>
                                <InfoCard num={totalOrders} com="All orders" />
                                {obakers.map((obaker, index) => <InfoCard num={obaker.orders.ordered.length} com={obaker.companyName} key={index} />)}
                            </>
                        }
                    </div>
                </div>
                <h2 className={styles.dashTitle}>Top 10 Bakers</h2>
                <div className={styles.dashScroll}>
                    <div className={styles.dashContainer}>
                        {lbakers ? <ActivityTwo /> : bakers.map((baker, index) => <BakerInfo baker={baker} setRbakers={setRbakers} key={index} />)}
                    </div>
                </div>
                <h2 className={styles.dashTitle}>Top 10 Users</h2>
                <div className={styles.dashScroll}>
                    <div className={styles.dashContainer}>
                        {lusers ? <ActivityTwo /> : users.map((user, index) => <UserInfo user={user} setRusers={setRusers} key={index} />)}
                    </div>
                </div>
            </div>
            <div className={styles.panelEventHeader}>
                <div className={styles.panelPosition}>
                    <SearchBar setText={setText} />
                    <Language />
                    <Profile />
                </div>
            </div>
        </div>
    )
};


const mapStateToProps = ({ auth, refresh }) => {
    return {
        token: auth.token,
        refresh: refresh.refresh,
        user: auth.user,
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ setRefresh }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
