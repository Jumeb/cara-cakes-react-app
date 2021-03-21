import React, { useState } from 'react';
import { IoTrashBinSharp } from 'react-icons/io5';
import { Notification, Verification } from '..';

import { pans2 } from '../../res/img';
import { BASE_URL } from '../../utils/globalVariable';
import styles from './UserTable.module.css';

const UserTable = (props) => { 
    const {users, token} = props;
    const [loading, setLoading] = useState(false);
    const [show, setShow] = useState(false);
    const [verify, setVerify] = useState(false);
    const [message, setMessage] = useState({});

    const Delete = (data) => {
        setVerify(true);
        setMessage({
            type: 'danger',
            data: data,
            title: 'Deletion imminent',
            message: `Are you sure you want to delete user ${data.name}. They might have pending orders.`
        })
    }

    const DeleteAuth = (id) => {
        fetch(`${BASE_URL}/user/delete/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Basic ${token}`
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
                setMessage({
                    type: 'success',
                    title: 'Success',
                    message: response.message,
                })

                setTimeout(() => {
                    setVerify(false);
                }, 2000)
            }

        })
        .catch(err => {
            setShow(true);
            setMessage({
                type: 'error',
                title: 'Unexpected Error',
                message: 'Please check your internet connection.',
            })
        })
    }

    const Suspend = (id) => {
        fetch(`${BASE_URL}/user/suspend/${id}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Basic ${token}`
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
                setShow(true);
                setMessage({
                    type: 'success',
                    title: 'Success',
                    message: response.message,
                })
            }

        })
        .catch(err => {
            setShow(true);
            setMessage({
                type: 'error',
                title: 'Unexpected Error',
                message: 'Please check your internet connection.',
            })
        })
    }

    return (
        <>
            <div className={styles.cartSeparator}>
                <table className={styles.cartTable}>
                    <thead className={styles.cartTableHeader}>
                        <td className={styles.cartTableHeadeData}>Name</td>
                        <td className={styles.cartTableHeaderData}>Telephone</td>
                        <td className={styles.cartTableHeaderData}>Ordered</td>
                        <td className={styles.cartTableHeaderData}>Suspended</td>
                        <td className={styles.cartTableHeaderData}>Actions</td>
                    </thead>

                    {users.map((user, index) => 
                        <tr className={styles.cartTableRow}>
                            <td className={[styles.cartTableData, styles.cartTableImageContainer].join(' ')}>
                                <img src={pans2} alt={user.name} className={styles.cartTableDataImage} />
                                <b>{user.name}</b>
                            </td>
                            <td className={styles.cartTableData}>{user.telNumber}</td>
                            <td className={styles.cartTableData}>{user.ordered || 0}</td>
                            <td className={styles.cartTableData}>{user.suspend ? 'True' : 'False'}</td>
                            <td className={styles.cartTableData}>
                                <button className={[styles.cartButton, styles.suspend].join(' ')} onClick={() => Suspend(user._id)}>{user.suspend ? 'Unsuspend' : 'Suspend'}</button>
                                <button className={[styles.cartButton, styles.details].join(' ')} onClick={() => console.log('Ordered')}>Details</button>
                                <button className={[styles.cartDelete, styles.suspend].join(' ')} onClick={() => Delete(user)}><IoTrashBinSharp /></button>
                            </td>
                        </tr>
                    )}
                </table>
            </div>
            <Notification show={show} setShow={setShow} message={message} />
            <Verification verify={verify} setVerify={setVerify} message={message} onClick={(id) => DeleteAuth(id)} />
        </>
    )
}

export default UserTable;
