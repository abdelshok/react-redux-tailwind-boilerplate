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

    //
    // Retrieves New Releases
    // @params {integer} (optional) limit: number of releases to be retrieved. default: 20, min: 1, max: 50.
    // @params {string} (optional) country: an ISO 3166-1 alpha-2 country code. 
    // @params {integer} (optional) offset: the index of the first item to return. Default: 0
    // @example: 
    // .getNewReleases(10) --> Returns 10 first newest releases for all countries <=> equivalent to .getNewReleases(10, undefined, undefinded)
    // .getNewReleases(undefined, 'FR', 10) --> Gets top 10-30 newest track for France (ISO code: "FR")
    // .getNewReleases(10, undefined, 10) --> Gets # 10 to 20 newest release all over the world (10 is limit and offset is 10 so we start at track 10)
    // @returns An object newReleases containing the newest releases if the call to the API is successful 
    // 
    getNewReleases = async (limit, country, offset) => {
        
        try {
            let newReleases;

            let paramObject = {
                country: country,
                limit: limit,
                offset: offset,
            }
   
    
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

    // 
    // Retrieve list of Spotify featuerd playlists
    // @params {string} (optional) locale: desired language as lowercase ISO 639-1 language code & uppercase ISO 3166-1 alpha-2
    // country code. e.g. es_MX --> "Spanish (Mexico)"
    // @params {string} (optional) country: ISO 3166-1 alpha-2 country code. if you want a list
    // of returned items to be relevant to a particular country. e.g. "FR"
    // @params {string} (optional) timestamp: ISO 8601 format --> yyyy-MM--ddTHH:mm:ss to get results
    // tailed for that specific time and day
    // @params {integer} (optional) limit: max num of items to return. default: 20, min: 1, max: 50.
    // @params {integer} (optional) offset: index of first item to return. default 0.
    // @returns object featuredPlaylists containing all the necessary data :)
    //
    getFeaturedPlaylists = async (locale, country, timestamp, limit, offset) => {
        let featuredPlaylists;

        let paramObject = {
            locale: locale,
            country: country,
            timestamp: timestamp,
            limit: limit,
            offset: offset,
        }

        try {
            let url = 'https://api.spotify.com/v1/browse/featured-playlists';
            featuredPlaylists = await axios.get(url, {
                headers: {
                    'Authorization': 'Bearer ' + this.accessToken
                },
                params: paramObject
            })
        } catch (error) {
            console.error('Error returned from Spotify-API in getFeaturedPlaylists function', error);
        }
        console.log('New releases are', featuredPlaylists);
        return featuredPlaylists; 

    }

    // Important: add max_*, min_*, etc?

    // Get Recommendations from Seed Data: https://developer.spotify.com/documentation/web-api/reference/browse/get-recommendations/
    // Note: Only one type of seed data is required at minimum (e.g. seed_artists or seed_genres) but a combination
    // of all of them can be used together
    // @params {integer} (optional) limit: target size of the list of recommended tracks. default: 20, min: 1, max: 100.
    // @params {string} (optional) market: ISO 3166-1 alpha-2 country code. 
    // @params {string} (required) seedArtists: comma separated list of spotify artists. up to 5 seed values.
    // @params {string} (required) seedGenres: comma-separated list of any genres in teh set of available genre seeds.
    // up to 5 seed values.
    // @params {string} (required) seedTracks: comma-separed list of spotify IDs for a seed track. Up to 5 values.
    // @returns recommendations object containing all of the recommendation data
    getRecommendations = async (limit, market, seedArtists, seedGenres, seedTracks) => {
        let recommendations;
        let paramObject = {
            limit: limit,
            market: market,
            seed_artists: seedArtists,
            seed_genres: seedGenres,
            seed_tracks: seedTracks,
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


// Get New Releases function

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