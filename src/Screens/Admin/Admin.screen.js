import React from 'react';
import { Route } from 'react-router';

import { WorkArea } from '../../Components';
import { ABakers, AUsers, AdminNav, Dashboard, AOrders, APastry, APastryS, AProfile, SOrders } from '../../sections';
import styles from './Admin.module.css';

const Admin = () => {
    return (
        <div className={styles.admin}>
            <AdminNav />
            <WorkArea>
                <Route path="/admin/dashboard" exact component={Dashboard} />
                <Route path="/admin/dashboard/bakers" component={ABakers} />
                <Route path="/admin/dashboard/users" component={AUsers} />
                <Route path="/admin/dashboard/orders" component={AOrders} />
                <Route path="/admin/dashboard/orders-super" component={SOrders} />
                <Route path="/admin/dashboard/pastry" component={APastry} />
                <Route path="/admin/dashboard/pastry-super" component={APastryS} />
                <Route path="/admin/dashboard/profile" component={AProfile} />
            </WorkArea>
        </div>
    )
}

export default Admin;
