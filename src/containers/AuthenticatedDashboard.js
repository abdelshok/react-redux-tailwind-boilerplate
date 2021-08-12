// Dashboard displayed once user successfully logs in

// External Packages
import React, { Component } from 'react';
import styled, { keyframes } from 'styled-components';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// Internal Modules

class AuthenticatedDashboard extends Component {
    constructor(props){
        super(props);
        this.state = {
            // Empty for now
        }
    }

    handleSignOut = () => {
    }

    render() {
        const { userData } = this.props;
        const userImage = userData.images ? userData.images[0].url : '';
        const displayName = userData.display_name ? userData.display_name : 'No name yet';
        const  email = userData.email ? userData.email : '';
        const followerCount = userData.followers ? userData.followers.total : 'No';
        const userType = userData.type ? userData.type : '';
        const followerSentence = followerCount + ' followers';
        return (
            <div>
            </div>
        )
    }
}

// Typechecking for the AuthenticatedDashboard's passed in props 
AuthenticatedDashboard.propTypes = {
	userData: PropTypes.object,
};

// Sets the default props of the AuthenticatedDashboard container
AuthenticatedDashboard.defaultProps = {
	userData: {}
};

// Maps the store's properties to the AuthenticatedDashboard container's props in order to render the
// correct application UI when user authenticates
function mapStateToProps(state) {
	return {
	};
}

export default connect(
  mapStateToProps,
)(AuthenticatedDashboard);


