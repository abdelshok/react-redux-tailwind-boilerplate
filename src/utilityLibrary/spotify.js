// Utility library for Spotify functions

import axios from 'axios';

// TO DO:
// Check every function works correctly with and without all the parameters.
// See if there's any way to do function overloading to avoid having to call function with undefined
// Fix "Important issue"
// Document each function's params, restrictions, and add link to spotify web api
// Maybe add error logging if values are incorrect? 

class SpotifyAPI {
    constructor(accessToken) {
        this.accessToken = accessToken
    }

    // Behavior of API
    // Seems to respond with standard behavior when the body parameters that we pass have
    // undefined values (when no arguments were passed in the function call and even when the 
    // argument passed itself is undefined)
    // Let's see how it responds when the type of variable itself is erroneous (e.g. string instead
    // of integer or integer instead of string)
    // Seems to behave the same way when we pass undefined as when we pass nothing, which confirms
    // expectations
    // 400 bad request response status code when wrong variable type is inputted
    // The server cannot and will not process the request due to something perceived
    // as an error on the client side (e.g., malformed request syntax, etc.)

    getNewReleases = async (limit, country, offset) => {
        
        try {
            let newReleases;

            // if (!isString(country) || !Number.isInteger(limit) || !Number.isInteger(offset) ) {
            //     throw "Input type not valid"
            // }
    
            let paramObject = {
                country: country,
                limit: limit,
                offset: offset,
            }
            // if (limit == undefined && country == undefined && offset == undefined) {
            //     paramObject = {};
            // } else if (limit != undefined && country == undefined && offset == undefined) {
            //     paramObject = {
            //         limit: limit
            //     };
            // } else if (limit == undefined && country != undefined && offset == undefined) {
            //     paramObject = {
            //         country: country
            //     };
            // } else if (limit == undefined && country == undefined && offset != undefined) {
            //     paramObject = {
            //         offset: offset
            //     };
            // } else if (limit != undefined && country != undefined && offset == undefined) {
            //     paramObject = {
            //         limit: limit,
            //         country: country
            //     };
            // } else if (limit != undefined && country == undefined && offset != undefined) {
            //     paramObject = {
            //         limit: limit,
            //         offset: offset
            //     };
            // } else if (limit == undefined && country != undefined && offset != undefined) {
            //     paramObject = {
            //         country: country,
            //         offset: offset
            //     }
            // } else if (limit != undefined && country != undefined && offset != undefined) {
            //     paramObject = {
            //         country: country,
            //         offset: offset,
            //         limit: limit
            //     }
            // }
    
            try {
                let url = 'https://api.spotify.com/v1/browse/new-releases'
                newReleases = await axios.get(url, {
                    headers: {
                        'Authorization': 'Bearer ' + this.accessToken
                    },
                    params: paramObject
                })
            } catch (error) {
                console.error('Error returned from Spotify-API in GetNewReleases function', error);
            }
            console.log('New releases are', newReleases);
            return newReleases; 
        } catch (error) {
            console.error('Error found in GetNewReleases function: ', error)
        }

    }

    // Get Recommendations
    // Might add more attributes
    getRecommendations = async (limit, market) => {
        let recommendations;
        let paramObject = {
            limit: limit,
            market: market,
        } 
        try {
            let url = 'https://api.spotify.com/v1/recommendations'
            recommendations = await axios.get(url, {
                headers: {
                    'Authorization': 'Bearer ' + this.accessToken
                },
                params: paramObject
            })
        } catch (error) {
            console.error('Error caught in getRecommendations function', error);
        }
        console.log('New recommendations are', recommendations);
        return recommendations; 
    }

    // Get Featured Playlist
    getFeaturedPlaylist = async (locale, country, timestamp, limit, offset) => {
        let featuredPlaylist;
        let paramObject = {
            local: locale,
            country: country,
            timestamp: timestamp,
            limit: limit,
            offset: offset,
        };

        try {
            let url = 'https://api.spotify.com/v1/https://api.spotify.com/v1/browse/featured-playlists';
            featuredPlaylist = await axios.get(url, {
                headers: {
                    'Authorization': 'Bearer ' + this.accessToken
                },
                params: paramObject
            })
        } catch (error) {
            console.error('Error caught in getFeaturedPlaylist function', error);
        }
        console.log('featuredPlaylist are', featuredPlaylist);
        return featuredPlaylist; 
    }

    // Album related methods 

    // Gets information from one album
    getAlbum = async (albumID, market) => {
        let album;
        let bodyParam = {
            market: market
        }
        try {
            let url =  'https://api.spotify.com/v1/albums/'+ albumID
            album = await axios.get(url, {
                headers: {
                    'Authorization': 'Bearer ' + this.accessToken
                },
                params: bodyParam
            });
        } catch(error) {
            console.error('Error caught in the GetAlbum function', error);
        }
        return album;
    }

    // Get tracks for an album
    // Params: 
    // albumID: spotify ID of album (string)
    // limit: max number of tracs to return. default 20, minimum 1, max 50. (integer)
    // offset: the index of the first track to return. default 0.
    // market: an ISO 3166-1-alpha-2 country code (string)
    getAlbumTracks = async (albumID, limit, offset, market) => {
        let albumTracks;
        let bodyParam = {
            limit: limit,
            offset: offset,
            market: market
        }
        try {
            let url =  'https://api.spotify.com/v1/albums/' + albumID + '/tracks'
            albumTracks = await axios.get(url, {
                headers: {
                    'Authorization': 'Bearer ' + this.accessToken
                },
                params: bodyParam
            })
        } catch(error) {
            console.error('Error caught in the Get Album Tracks function');
        }
        return albumTracks;
    }


    // Get several albums at the same time
    getAlbums = async (albumIdStrings, market) => {
        let albumIDs;
        let bodyParam = {
            ids: albumIdStrings,
            market, market
        }
        try {
            let url =  'https://api.spotify.com/v1/albums'
            albumIDs = await axios.get(url, {
                headers: {
                    'Authorization': 'Bearer ' + this.accessToken
                },
                params: bodyParam
            })
        } catch(error) {
            console.error('Error caught in the Get Album IDs function');
        }
        return albumIDs;
    }

    getArtist = async (artistID) => {
        let artistData;
        try {
            let url =  'https://api.spotify.com/v1/artists' + artistID
            artistData = await axios.get(url, {
                headers: {
                    'Authorization': 'Bearer ' + this.accessToken
                }
            })
        } catch(error) {
            console.error('Error caught in the GetArtist function', error);
        }
        return artistData;
    }

    // Include-groups is a comma separated list of keywords that are used to filter the response
    // if not supplied, all album types will be returned. Valid values are: "album", "single", "appears_on",
    // "compilation"
    getArtistAlbums = async (artistID, includeGroups, country, limit, offset) => {
        let artistAlbums;
        let bodyParam = {
            include_groups: includeGroups, 
            country: country,
            limit: limit,
            offset: offset
        }
        try {
            let url =  'https://api.spotify.com/v1/artists' + artistID + '/albums';
            artistAlbums = await axios.get(url, {
                headers: {
                    'Authorization': 'Bearer ' + this.accessToken
                },
                params: bodyParam
            })
        } catch(error) {
            console.error('Error caught in the getArtistAlbums function', error);
        }
        return artistAlbums;
    }

    // Important : change bodyParam to queryParam
    getArtistTopTracks = async (artistID, country) => {
        let artistTopTracks;
        let queryParam = {
            country: country
        }
        try {
            let url =  'https://api.spotify.com/v1/artists' + artistID + '/top-tracks';
            artistTopTracks = await axios.get(url, {
                headers: {
                    'Authorization': 'Bearer ' + this.accessToken
                },
                params: queryParam
            })
        } catch(error) {
            console.error('Error caught in the getArtistTopTracks function', error);
        }
        return artistTopTracks;
    }

    // https://developer.spotify.com/documentation/web-api/reference/artists/get-related-artists/
    getRelatedArtists = async (artistID) => {
        let relatedArtists;
        try {
            let url =  'https://api.spotify.com/v1/artists' + artistID + '/related-artists';
            relatedArtists = await axios.get(url, {
                headers: {
                    'Authorization': 'Bearer ' + this.accessToken
                }
            })
        } catch(error) {
            console.error('Error caught in the getRelatedArtists function', error);
        }
        return relatedArtists;
    }

    // https://developer.spotify.com/documentation/web-api/reference/artists/get-several-artists/
    // Important: or getArtists 
    // ids: comma-sepaarated list of the Spotify-IDs for the artsits. MAximum 50 IDs.
    getSeveralArtists = async (artistIDs) => {
        let artistsData;
        let queryParam = {
            ids: artistIDs
        }

        try {
            let url =  'https://api.spotify.com/v1/artists';
            artistsData = await axios.get(url, {
                headers: {
                    'Authorization': 'Bearer ' + this.accessToken
                },
                params: queryParam
            })
        } catch(error) {
            console.error('Error caught in the getSeveralArtists function', error);
        }
        return artistsData;
    }

    
}

function isString (value) {
    return typeof value === "string" || value instanceof String;
}


export default SpotifyAPI;

