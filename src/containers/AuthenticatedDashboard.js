// Dashboard displayed once user successfully logs in

// External Packages
import React, { Component } from 'react';
import styled, { keyframes } from 'styled-components';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// Internal Modules
import NeumorphicLoginWrapper from '../styledComponents/NeumorphicLoginWrapper';


const loadingAnimation = keyframes`
    0%{background-position:0% 61%}
    50%{background-position:100% 40%}
    100%{background-position:0% 61%}
`;

const ImageWrapper = styled.div`
    width: 100px;
    height: 100px;
    border-radius: 50%;
    margin: 0 auto;
    background: ${props => props.imageLoaded ? `url(${props.imageLoaded})` :  'linear-gradient(270deg, #e1e1e1, #cdcdcd, #e1e1e1, #cdcdcd, #e1e1e1, #cdcdcd)'};
    -webkit-animation: ${loadingAnimation} 1s ease infinite;
    -moz-animation: ${loadingAnimation} 1s ease infinite;
    animation: ${loadingAnimation} 1s ease infinite;
    background-size: ${props => props.imageLoaded ? '100px' :  '50000% 50000%'};
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 0px 0px 2px #ECF0F3, 0px 0px 0px 5px #ECF0F3, 8px 8px 15px #A7AAAF, -8px -8px 15px #FFFFFF;
`;

const TextWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`
const TitleText = styled.div`
    text-align: center;
    font-size: 20px;
    letter-spacing: 0.5px;
    background: ${props => props.imageLoaded ? 'transparent' :  'linear-gradient(270deg, #e1e1e1, #cdcdcd, #e1e1e1, #cdcdcd, #e1e1e1, #cdcdcd)'};
    -webkit-animation: ${loadingAnimation} 1s ease infinite;
    -moz-animation: ${loadingAnimation} 1s ease infinite;
    animation: ${loadingAnimation} 1s ease infinite;
    background-size: ${props => props.imageLoaded ? '100px' :  '50000% 50000%'};
    color: ${props => props.imageLoaded ? 'black': 'transparent'};
    margin-top: 30px;
    width: ${props => props.imageLoaded ? 'auto' : '150px'};
    margin-bottom 20px;
    border-radius: 25px;
`;
// box-shadow: ${props => props.imageLoaded ? '0px 0px 0px' : '13px 13px 20px #CBCED1, -13px -13px 20px #FFFFFF'};

const SubTitleText = styled.div`
    text-align: center;
    font-size: 13px;
    font-weight: 600;
    background: ${props => props.imageLoaded ? 'transparent' :  'linear-gradient(270deg, #e1e1e1, #cdcdcd, #e1e1e1, #cdcdcd, #e1e1e1, #cdcdcd)'};
    -webkit-animation: ${loadingAnimation} 1s ease infinite;
    -moz-animation: ${loadingAnimation} 1s ease infinite;
    animation: ${loadingAnimation} 1s ease infinite;
    background-size: ${props => props.imageLoaded ? '120px' :  '50000% 50000%'};
    width: ${props => props.imageLoaded ? 'auto' : '90px'};
    color: ${props => props.imageLoaded ?'black' : 'transparent'};
    border-radius: 25px;
`;
// box-shadow: ${props => props.imageLoaded ? '0px 0px 0px' : '13px 13px 20px #CBCED1, -13px -13px 20px #FFFFFF'};

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
        const displayName = userData.display_name ? userData.display_name : 'No name yet';
        const  email = userData.email ? userData.email : '';
        const followerCount = userData.followers ? userData.followers.total : 'No';
        const userType = userData.type ? userData.type : '';
        const followerSentence = followerCount + ' followers';
        return (
            <NeumorphicLoginWrapper>
                <ImageWrapper imageLoaded={userImage} />
                <TextWrapper>
                    <TitleText imageLoaded={userImage} > {displayName} </TitleText>
                    <SubTitleText imageLoaded={userImage}> { followerCount !== '' && followerSentence} </SubTitleText>
                </TextWrapper>
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


