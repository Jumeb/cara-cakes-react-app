import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { AOrderTable } from '../../Components';
import styles from './Order.module.css';
import { setRefresh } from '../../redux/Actions/Refresh.actions';

const Orders = () => {
    return(
       <div className={styles.bakerSection}>
           <div className={styles.bakerLength}>
               <h2 className={styles.bakerLengthTitle}>5 Orders</h2>
           </div>
           <div className={styles.bakerCat}>
               <button className={styles.bakerChoice}>All Orders</button>
               <button className={styles.bakerChoice}>New Orders</button>
               <button className={styles.bakerChoice}>Processing</button>
               <button className={styles.bakerChoice}>Registered</button>
               <button className={styles.bakerChoice}>On the Way</button>
               <button className={styles.bakerChoice}>Delivered</button>
           </div>
           <AOrderTable />
       </div>
    )
}

const mapStateToProps = ({auth, refresh}) => {
    return {
        user: auth.user,
        token: auth.token,
        refresh: refresh.refresh,
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({setRefresh}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Orders);