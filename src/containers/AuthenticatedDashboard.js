// Dashboard displayed once user successfully logs in

// External Packages
import React, { Component } from 'react';
import styled, { keyframes } from 'styled-components';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// Internal Modules
import NeumorphicLoginWrapper from '../styledComponents/NeumorphicLoginWrapper';


const logoAnimation = keyframes`
    0%{background-position:0% 61%}
    50%{background-position:100% 40%}
    100%{background-position:0% 61%}
`;


const ImageWrapper = styled.div`
    width: 100px;
    height: 100px;
    border-radius: 50%;
    margin: 0 auto;
    background: ${props => props.image ? `url(${props.image})` :  'linear-gradient(270deg, #d6d7d7, #a5a5a5, #d6d7d7, #a5a5a5)'};
    -webkit-animation: ${logoAnimation} 1s ease infinite;
    -moz-animation: ${logoAnimation} 1s ease infinite;
    animation: ${logoAnimation} 1s ease infinite;
    background-size: ${props => props.image ? '100px' :  '50000% 50000%'};
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 0px 0px 2px #ECF0F3, 0px 0px 0px 5px #ECF0F3, 8px 8px 15px #A7AAAF, -8px -8px 15px #FFFFFF;
`;

const TitleText = styled.div`
    text-align: center;
    font-size: 20px;
    padding-top: 24px;
    letter-spacing: 0.5px;
`;

const SubTitleText = styled.div`
    text-align: center;
    font-size: 13px;
    padding-top: 7px;
    font-weight: 600;
`;

class AuthenticatedDashboard extends Component {
    constructor(props){
        super(props);
        this.state = {
            // Empty for now
        }
    }

    render() {
        console.log('Dashboard rendered');
        console.log('Dashboard props', this.props);
        const { userData } = this.props;
        const userImage = userData.images ? userData.images[0].url : '';
        console.log('User data', userData);
        const displayName = userData.display_name ? userData.display_name : '';
        const  email = userData.email ? userData.email : '';
        const followerCount = userData.followers ? userData.followers.total : '';
        const userType = userData.type ? userData.type : '';
        const followerSentence = followerCount + ' followers';
        return (
            <NeumorphicLoginWrapper>
                <ImageWrapper image={userImage} />
                <TitleText> {displayName} </TitleText>
                <SubTitleText> { followerCount !== '' && followerSentence} </SubTitleText>
            </NeumorphicLoginWrapper>
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
			userData: state.spotify.userData
	};
}

export default connect(
  mapStateToProps,
)(AuthenticatedDashboard);


