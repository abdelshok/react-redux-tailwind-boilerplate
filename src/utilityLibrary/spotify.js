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
// Browse: DONE
    // GetCategory: Done
    // GetCategoryPlaylists: Done
    // GetListOfCategories: Done
    // GetListOfFeaturedPlaylists: Done
    // GetListOfNewReleases: Done
    // GetRecommendations: Done but incomplete
// EPISODE: Endpoints for retrieving information about one or more episodes from the Spotify catalog
    // GetEpisode: Done
    // GetSeveralEpisodes: Done
// Follow
    // checkIfFollowsArtistUser:
    // checkIfFollowsPlaylist:
    // followArtistsOrUsers:
    // followPlaylist:
    // getUserFollowedArtist:
    // unfollowArtistOrUser:
    // unfollowPlaylist:
// Library
    // checkIfUserSavedAlbum
    // checkIfUserSavedShow
    // checkIfUserSavedTrack
    // getUserSavedAlbums
    // getUserSavedShows
    // getUserSavedTracks
    // removeAlbumsFromUser
    // removeShowFromUser (plural)
    // removeTracks
    // saveAlbums
    // saveShows
    // saveTracks
// PERSONALIZATION: DONE
    // getUserTopTracks: Done
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

    // 
    // getEpisode()
    //
    // Gets Spotify catalog info for a single episode identified by its unique Spotify ID
    // Link: https://developer.spotify.com/documentation/web-api/reference/episodes/get-an-episode/
    //
    // @params: episodeID {string} (required): based 64 identifier representing the spotify ID for the episode
    // @params: market {string} (required): an ISO 3166-1 alpha-2 country code. 
    // If a country is specified, only shows and episodes available in that country are returned
    // If a valid user access token is specified in the request header, the country associated w/ theuser account will 
    // take priority over this parameter
    //
    // @returns an object containing information about the specified episode (duration, description, images, etc.)
    // 
    getEpisode = async(episodeID, market) => {
        let episodeData;

        let queryParam = {
            market: market
        }

        try {
            let url = 'https://api.spotify.com/v1/episodes/' + episodeID;
            episodeData = await axios.get(url, {
                headers: {
                    'Authorization': 'Bearer ' + this.accessToken
                },
                params: queryParam
            })
        } catch(error) {
            console.error('Error caught in getEpisode function', error);
        }
        
        console.log('Episode data',episodeData);
        return episodeData
    }


    // 
    // getSeveralEpisodes()
    //
    // Gets Spotify catalog information for multiple episodes based on their Spotify ID
    // Link: https://developer.spotify.com/documentation/web-api/reference/episodes/get-several-episodes/
    //
    // @params: ids {string} (required): comma-separated list of Spotify IDs for teh episodes. max: 50 IDs.
    // @params: market {string} (optional): ISO 3166-1 alpha-2 country code: If country code is specified, only shows and epsiodes available
    // in that market will be returned. same other rules apply as in .getEpisode method.
    // More info can be found in the above link
    // 
    // @returns an object contain the several episode's respective information
    //
    getSeveralEpisodes = async(listOfEpisodeIDs, market) => {
        let severalEpisodeData;

        let queryParam = {
            ids: listOfEpisodeIDs,
            market: market
        }

        try {
            let url = 'https://api.spotify.com/v1/episodes/';
            severalEpisodeData = await axios.get(url, {
                headers: {
                    'Authorization': 'Bearer ' + this.accessToken
                },
                params: queryParam
            })
        } catch(error) {
            console.error('Error caught in getSeveralEpisodes function', error);
        }
        
        console.log('Several episodes data', severalEpisodeData);
        return severalEpisodeData
    }

    //
    // getUserTop()
    // 
    // Gets the current user's top artists or tracks based on calculated affinity
    // Link: https://developer.spotify.com/documentation/web-api/reference/personalization/get-users-top-artists-and-tracks/
    //
    // @params: type {string} (required): Only two options "artists" or "tracks"
    // @params: limit {integer} (optional): Num of entities to return. Default: 20, min: 1, max: 50.
    // @params: offset {integer} (optional): Index of first entity to return. Default: 0 (the first track)
    // @params: timeRange {string} (optional): over what time frame affinities are computed.
    // Valid values include "long_term" (several years of data), "medium_term" (-6 months of data), "short_term" (-4 weeks)
    // 
    // @example:
    // .getUserTop("artists", 30) --> Get's user's top 30 artists
    // .getUserTop("tracks", 40, undefined, "short_term") --> Get's user's top 40 tracks over past 4 weeks
    // .getUserTop("tracks", undefined, undefined, "long_term") --> Gets user's top tracks over past several years
    // .getUserTop("artists") --> Get's user's top artists over medium_term (which is default value)
    //
    // @returns an object containing top user track's or artists
    // 
    getUserTopTracks = async (type, limit, offset, timeRange) => {
        let userTopTracks;

        let queryParam = {
            limit: limit,
            offset: offset,
            timeRange: timeRange
        }
        
        try {
            let url = 'https://api.spotify.com/v1/me/top/' + type;
            userTopTracks = await axios.get(url, {
                headers: {
                    'Authorization': 'Bearer ' + this.accessToken
                },
                params: queryParam
            })
        } catch(error) {
            console.error('Error caught in getUserTopTracks function', error)
        }

        console.log('User top tracks returned are', userTopTracks);
        return userTopTracks;
    }


    // LIBRARY API ENDPOINTS


    //
    // checkIfAlbumSaved()
    // 
    // Check if one or more albums is already saved in current Spotify user's 'Your Music' library
    // Link: https://developer.spotify.com/documentation/web-api/reference/library/check-users-saved-albums/
    //
    // @params: albumIDs {string} (required): comma-separated list of the Spoitfy IDs for the albums
    // @example
    // .checkIfAlbumSaved('0pJJgBzj26qnE1nSQUxaB0,5ZAKzV4ZIa5Gt7z29OYHv0, 8744Bzj26Adjeieo5ZAKzV4ZIa5Gt7z29OYHv0')
    //
    // @returns an array of true or false values in same order in which tie ids were specified
    // e.g. [true, false]
    //

    checkIfAlbumSaved = async(albumIDs) => {
        let isAlbumSaved;
        
        let queryParam = {
            ids: albumIDs
        }
        
        try {
            let url = 'https://api.spotify.com/v1/me/albums/contains';
            isAlbumSaved = await axios.get(url, {
                headers: {
                    'Authorization': 'Bearer ' + this.accessToken
                },
                params: queryParam
            })
        } catch (error) {
            console.error('Error caught in checkIfAlbumSaved function', error);
        }

        console.log('Is album saved for user?', isAlbumSaved);
        return isAlbumSaved
    }


    //
    // checkIfShowSaved()
    // 
    // Check if one or more shows is already saved in current Spotify user's library
    // Link: https://developer.spotify.com/documentation/web-api/reference/library/check-users-saved-shows/
    //
    // @params: showIDs {string} (required): comma-separated list of the Spoitfy IDs for the shows
    // @example
    // .checkIfShowSaved('5AvwZVawapvyhJUIx71pdJ,2C6ups0LMt1G8n81XLlkbsPo,2C5AvwZVawapvyhJUIx71pdJ')
    //
    // @returns an array of true or false values in same order in which the ids were specified
    // e.g. [true, false]
    //

    checkIfShowSaved = async(showIDs) => {
        let isShowSavedArray;
        
        let queryParam = {
            ids: showIDs
        }
        
        try {
            let url = 'https://api.spotify.com/v1/me/shows/contains';
            isShowSaved = await axios.get(url, {
                headers: {
                    'Authorization': 'Bearer ' + this.accessToken
                },
                params: queryParam
            })


        } catch (error) {
            console.error('Error caught in checkIfShowSaved function', error);
        }
        console.log('Is show saved for user?', isShowSaved);
        return isShowSavedArray;
    }

    //
    // checkIfTrackSaved()
    // 
    // Check if one or more tracks is already saved in the current Spotify user’s ‘Your Music’ library.
    // Link: https://developer.spotify.com/documentation/web-api/reference/library/check-users-saved-tracks/
    //
    // @params: showIDs {string} (required): comma-separated list of the Spotify IDs for the tracks. Max: 50 IDs.
    // @example
    // .checkIfTrackSaved('0udZHhCi7p1YzMlvI4fXoK,3SF5puV5eb6bgRSxBeMOk9')
    //
    // @returns an array of true or false values in same order in which the ids were specified
    // e.g. [true]
    //

    checkIfTrackSaved = async (trackIDs) => {
        let isTrackSavedArray;
        
        let queryParam = {
            ids: trackIDs
        }
        
        try {
            let url = 'https://api.spotify.com/v1/me/tracks/contains';
            isTrackSavedArray = await axios.get(url, {
                headers: {
                    'Authorization': 'Bearer ' + this.accessToken
                },
                params: queryParam
            })


        } catch (error) {
            console.error('Error caught in checkIfTrackSaved function', error);
        }
        console.log('Tracks saved for user?', isTrackSavedArray);
        return isTrackSavedArray;
    }


    // 
    // getUserSavedAlbums()
    //
    // Gets a list of the albums saved in the current spotify user's 'Your Music' library
    // Link: https://developer.spotify.com/documentation/web-api/reference/library/get-users-saved-albums/
    //
    // @params: limit {integer} (optional): max number of objects to return. default: 20, min: 1, max: 50
    // @params: offset {integer} (optional): index of the first object to return. default:  0 (the first object)
    // @params: market {string} (optional): ISO 3611-1 alpha-2 country code or the string from_token.
    //
    // @example
    // .getUserSavedAlbums(20) --> Get 20 of the user's saved albums. (Unsure if they're ordered alphabetically, by date added, etc.)
    // .getUserSavedAlbums(50, undefined, 'FR') --> Get 50 of the user's saved albums from 'France' / 'FR' 
    // .getUserSavedAlbums(undefined, undefined, 'GB') --> Gets default amount of albums (undefined = no value passed = default value --> 20 albums) saved by user from 'GB' = Great Britain
    //
    // @returns object containing an array of album objects in JSON format. Each album object is accompanied by timestamp to 
    // show when it was added. More information at the link above.
    //

    getUserSavedAlbums = async (limit, offset, market) => {
        let savedAlbums;

        let queryParam = {
            limit: limit, 
            offset: offset,
            market: market
        }

        try {
            let url = 'https://api.spotify.com/v1/me/albums'
            savedAlbums = await axios.get(url, {
                headers: {
                    'Authorization': 'Bearer ' + this.accessToken
                },
                params: queryParam
            })
        } catch (error) {
            console.error('Error caught in the getUserSavedAlbums', error);
        }

        console.log('Albums saved by user ', savedAlbums);
        return savedAlbums;
    }


    // 
    // getUserSavedShows()
    //
    // Gets a list of the shows saved in the current spotify user's library
    // Link: https://developer.spotify.com/documentation/web-api/reference/library/get-users-saved-shows/
    //
    // @params: limit {integer} (optional): max number of objects to return. default: 20, min: 1, max: 50
    // @params: offset {integer} (optional): index of the first object to return. default:  0 (the first object)
    //
    // @example
    // .getUserSavedShows(20) --> Get 20 of the user's saved shows. (Unsure if they're ordered alphabetically, by date added, etc.)
    // .getUserSavedShows(50, undefined, 'FR') --> Get 50 of the user's saved shows from 'France' / 'FR' 
    // .getUserSavedShows(undefined, undefined, 'GB') --> Gets default amount of shows (undefined = no value passed = default value --> 20 shows) saved by user from 'GB' = Great Britain
    //
    // @returns object containing an array of saved show objects in JSON format. If user does not have any shows saved, response will
    // be an empty array. If show is unavailable ingiven market, it's filtered out. 
    //

    // IMPORTANT: Contact spotify for this one, there's a query parameter market missing?
    // 
    getUserSavedShows = async (limit, offset) => {
        let savedShows;

        let queryParam = {
            limit: limit, 
            offset: offset
        }

        try {
            let url = 'https://api.spotify.com/v1/me/shows'
            savedShows = await axios.get(url, {
                headers: {
                    'Authorization': 'Bearer ' + this.accessToken
                },
                params: queryParam
            })
        } catch (error) {
            console.error('Error caught in the getUserSavedShows', error);
        }

        console.log('Shows saved by user ', savedShows);
        return savedShows;
    }
    
    

    // 
    // getUserSavedTracks()
    //
    // Gets a list of the tracks saved in the current spotify user's 'Your Music' library
    // Link: https://developer.spotify.com/documentation/web-api/reference/library/get-users-saved-tracks/
    //
    // @params: limit {integer} (optional): max number of objects to return. default: 20, min: 1, max: 50
    // @params: offset {integer} (optional): index of the first object to return. default:  0 (the first object)
    // @params: market {string} (optional): ISO 3611-1 alpha-2 country code or the string from_token.
    //
    // @example
    // .getUserSavedTracks(20) --> Get 20 of the user's saved tracks. (Unsure if they're ordered alphabetically, by date added, etc.)
    // .getUserSavedTracks(50, undefined, 'FR') --> Get 50 of the user's saved tracks from 'France' / 'FR' 
    // .getUserSavedTracks(undefined, undefined, 'GB') --> Gets default amount of tracks (undefined = no value passed = default value --> 20 tracks) saved by user from 'GB' = Great Britain
    //
    // @returns object containing an array of saved track objects in JSON format.
    //

    getUserSavedTracks = async (limit, offset, market) => {
        let savedTracks;

        let queryParam = {
            limit: limit, 
            offset: offset,
            market: market
        }

        try {
            let url = 'https://api.spotify.com/v1/me/tracks'
            savedTracks = await axios.get(url, {
                headers: {
                    'Authorization': 'Bearer ' + this.accessToken
                },
                params: queryParam
            })
        } catch (error) {
            console.error('Error caught in the getUserSavedTracks', error);
        }

        console.log('Tracks saved by user ', savedTracks);
        return savedTracks;
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