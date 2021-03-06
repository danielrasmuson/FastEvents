var Rx = require('rx');
var request = require('request');

function query({and_text, category, city, country, fields, lat, limited_events, lon, radius, state, status, text, text_format, topic, zip, time}){
  return Rx.Observable.create((observer)=>{
    request({
      url: "https://api.meetup.com/2/open_events",
      qs: {
        key: process.env.MEETUP_API_KEY,

        // Changes the interpretation of the "text" field from OR'd terms to AND'd terms
        and_text: and_text,

        // Return events in the specified category or categories specified by commas. This is the category id returned by the Categories method.
        // category: "34"
        category: category,

        // A valid city
        city: city,

        // A valid country code
        country: country,

        // Request that additional fields (separated by commas) be included in the output
        fields: fields,

        // A valid latitude, limits the returned group events to those within radius miles
        lat: lat,

        // Include limited event information for private groups that wish to expose only a small amount of information about their events. This includes just: id, name, utc_offset, time, duration, yes_rsvp_count, waitlist_count, group, visibility, timezone. Value must be true or false.
        limited_events: limited_events,

        // A valid longitude, limits the returned group events to those within radius miles
        lon: lon,

        // Radius, in miles for geographic requests, default 25.0 -- maximum 100. May also be specified as "smart", a dynamic radius based on the number of active groups in the area
        radius: radius,

        // If searching in a country with states, a valid 2 character state code
        state: state,

        // Status may be "upcoming", "past" or both separated by a comma. The default is "upcoming" only
        status: status,

        // Events that contain the given term or terms somewhere in their content. The terms are OR'd by default. Separate terms with " AND " for events that have combined terms. To have terms automatically AND'd, set the "and_text" to true
        text: text,

        // Format of the description text, "html" or "plain". Defaults to "html"
        text_format: text_format,

        // Return events scheduled within the given time range, defined by two times separated with a single comma. Each end of the range may be specified with relative dates, such as "1m" for one month from now, or by absolute time in milliseconds since the epoch. If an endpoint is omitted, the range is unbounded on that end. The default value is unbounded on both ends (though restricted to the search window described above). Note: to retrieve past events you must also update status value
        time: time,

        // Return events in the specified topic or topics specified by commas. This is the topic "urlkey" returned by the Topics method. If all supplied topics are unknown, a 400 error response is returned with the code "badtopic".
        topic: topic,

        // A valid US zip code, limits the returned groups to those within radius miles
        zip: zip,

        // order by
        // ordering is approximate and will not exactly match the values in the "distance" field.
        // distance: distance,
        // (default order) ascending
        // time: time,
        // you will likely want to specify "desc=true" to get the best trending results first.
        // trending: trending,

      }
    }, function(err, res, body){
        if (err){
          observer.onError(err);
        } else{
          observer.onNext(JSON.parse(body).results);
        }
      }
    )
  })
}

module.exports = {
  query:query
}
