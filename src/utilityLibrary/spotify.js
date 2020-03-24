// Utility library for Spotify functions

import axios from 'axios';

// TO DO:
// Check every function works correctly with and without all the parameters.
// See if there's any way to do function overloading to avoid having to call function with undefined
// Fix "Important issue"
// Document each function's params, restrictions, and add link to spotify web api
// Maybe add error logging if values are incorrect? 

// Albums: Done
// Artists: Done
// Browse
    // GetCategory: Done
    // GetCategoryPlaylists: Done
    // GetListOfCategories
    // GetListOfFeaturedPlaylists: Done
    // GetListOfNewReleases: Done
    // GetRecommendations: Done but incomplete
// Episode (new)
// Follow
// Library
// Personalization
// PLayer
// Playlists
// Search
// Shows
// Tracks
// Users profile
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


    // Gets a Category
    // @params: categoryID {string} (required): spotify category ID for the category. e.g. "party"
    // @params: country {string} (optional): ISO 3166-1 alpha-2 country code. provide it to ensure categ exists for a country
    // @params: locale {string} (optional): desired language consisting of ISO 639-1 language code and ISO 3166 country code
    // @example:
    // .getCategory("party") --> gets the single category "party" used to tag items in spotify
    // .getCategory("party", undefined, "es_MX") --> gets category returned in "Spanish (Mexico)"
    // @returns an object containing the category information
    //

    getCategory = async (categoryID, country, locale) => {
        let category;

        let paramObject = {
            country: country,
            locale: locale
        };

        try {
            let url = 'https://api.spotify.com/v1/browse/categories/' + categoryID;
            category = await axios.get(url, {
                headers: {
                    'Authorization': 'Bearer ' + this.accessToken
                },
                params: paramObject
            })
        } catch (error) {
            console.error('Error returned from Spotify-API in getCategory function', error);
        }

        console.log('Category is', category);
        return category; 
    }


    //
    // Gets list of Spotify playlists tagged with a particular category
    // @params: categoryID {string} (required): spotify category ID for the category
    // @params: country {string} (optional): ISO 3166-1 alpha-2 country code 
    // @params: limit {integer} (optional): max number of items to return. default: 20, min: 1, max: 50
    // @params: offset {integer} (optional): index of the first item to return. default: 0. 
    // @example:
    // .getCategoryPlaylists("party", undefined, 20) --> Gets first 20 spotify "party" playlists
    // @returns an object containing playlists for that category
    // 
    getCategoryPlaylists = async (categoryID, country, limit, offset) => {
        let categoryPlaylists;

        let paramObject = {
            country: country,
            limit: limit,
            offset: offset
        }

        try {
            let url = 'https://api.spotify.com/v1/browse/categories/';
            
            categoryPlaylists = await axios.get(url, {
                headers: {
                    'Authorization': 'Bearer ' + this.accessToken
                },
                params: paramObject
            })
        } catch (error) {
            console.error('Error returned from Spotify-API in getCategoryPlaylists function', error);
        }

        console.log('Category Playlists are', categoryPlaylists);
        return categoryPlaylists; 
    }


    // 
    // Get a list of categories used to tag items in Spotify
    // Link: https://developer.spotify.com/documentation/web-api/reference/browse/get-list-categories/
    // @params: country {string} (optional): ISO 3166-1 alpha-2 country code
    // @params: locale {string} (optional): ISO 639-1 language code with ISO 3166-1 alpha-2 country code. e.g. "es_MX"
    // @params: limit {integer} (optional): max num of categories to return. default: 20, min: 1, max: 50.
    // @params: offset {integer} (optional): index of first item. default: 0 (first object). 
    // @example:
    // .getListOfCategories(undefined, undefined, 20, 20) --> Get 20 categories offset by 20 (so categories number 20-40)
    // .getListOfCategories("FR") ==> equivalent to: .getListOfCategories("FR", undefined, undefined, undefined) --> Gets default number of categories (20) for France
    // @returns an Object containing a list of categories
    // 
    getListOfCategories = async (country, locale, limit, offset) => {
        let listOfCategories;

        let paramObject = {
            country: country,
            locale: locale,
            limit: limit,
            offset: offset,
        }

        try {
            let url = 'https://api.spotify.com/v1/browse/categories/' + categoryID + '/play';
            
            listOfCategories = await axios.get(url, {
                headers: {
                    'Authorization': 'Bearer ' + this.accessToken
                },
                params: paramObject
            })
        } catch (error) {
            console.error('Error returned from Spotify-API in getListOfCategories function', error);
        }

        console.log('Categories  are', listOfCategories);
        return listOfCategories; 
    }
    //
    // Retrieves New Releases
    // @params: limit {integer} (optional): number of releases to be retrieved. default: 20, min: 1, max: 50.
    // @params: country {string} (optional): an ISO 3166-1 alpha-2 country code. 
    // @params: offset {integer} (optional): the index of the first item to return. Default: 0
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
    // @params: locale {string} (optional): desired language as lowercase ISO 639-1 language code & uppercase ISO 3166-1 alpha-2
    // country code. e.g. es_MX --> "Spanish (Mexico)"
    // @params: country {string} (optional): ISO 3166-1 alpha-2 country code. if you want a list
    // of returned items to be relevant to a particular country. e.g. "FR"
    // @params: timestamp {string} (optional): ISO 8601 format --> yyyy-MM--ddTHH:mm:ss to get results
    // tailed for that specific time and day
    // @params: limit {integer} (optional): max num of items to return. default: 20, min: 1, max: 50.
    // @params: offset {integer} (optional): index of first item to return. default 0.
    // @returns: a featuredPlaylists object containing all the necessary data :)
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

    // Get Recommendations from Seed Data
    // Link: https://developer.spotify.com/documentation/web-api/reference/browse/get-recommendations/
    // @params: limit {integer} (optional): target size of the list of recommended tracks. default: 20, min: 1, max: 100.
    // @params: market {string} (optional): ISO 3166-1 alpha-2 country code. 
    // @params: seedArtists {string} (required): comma separated list of spotify artists. up to 5 seed values.
    // @params seedGenres {string} (required): comma-separated list of any genres in teh set of available genre seeds.
    // up to 5 seed values.
    // @params: seedTracks {string} (required): comma-separed list of spotify IDs for a seed track. Up to 5 values.
    // @returns: recommendations object containing all of the recommendation data
    // Note: Only one type of seed data is required at minimum (e.g. seed_artists or seed_genres) but a combination
    // of all of them can be used together
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

    // ALBUM RELATED METHODS

    // 
    // Retrieves specific album's data
    // Link: https://developer.spotify.com/documentation/web-api/reference/albums/get-album/
    // @params: albumID  {string} (required): spotify's ID for the album
    // @params: market {string} (optional): ISO 3166-1 alpha-2 country code
    // @returns: album object containing all album data
    //
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

    //
    // Get tracks for an album
    // Link: https://developer.spotify.com/documentation/web-api/reference/albums/get-albums-tracks/
    // @params: albumID {string} (required) 
    // @params: limit {integer) (optional): max number of trackss to return. default = 20, min = 1, max = 50. 
    // @params: offset {integer} (optional): the index of the first track to return. default 0.
    // @params: market {string} (optional): an ISO 3166-1-alpha-2 country code (string)
    // @returns: an albumTracks object containing all of the album's track data
    // 
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

    //
    // Retrieves information about several albums
    // Link:https://developer.spotify.com/documentation/web-api/reference/albums/get-several-albums/
    // @params: albumIdStrings {string} (required): comma-separated list of the spotify IDs for the album. max = 20.
    // @params: market {string} (optional): An ISO 3166-1 alpha-2 country code
    // @returns: albumIDs object containing all of the albums' data 
    // 
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