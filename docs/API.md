## Classes

<dl>
<dt><a href="#Map">Map</a></dt>
<dd><p>Class representing a Betterez Map. It is a wrapper around the leaflet map</p>
</dd>
<dt><a href="#Trip">Trip</a></dt>
<dd><p>Class representing a Betterez Trip. It exposes the following props for convenience:</p>
<p>routeId,</p>
<p>scheduleId,</p>
<p>scheduleName,</p>
<p>departureTimestamp - The departure date and time in ISO 8601 date-time format,</p>
<p>stations - List of <a href="#Station">stations</a> for the trip</p>
</dd>
<dt><a href="#Station">Station</a></dt>
<dd><p>Class representing a Station in the Trip. It exposes the following props for convenience:</p>
<p>id - The station id.</p>
<p>name - The station name.</p>
<p>departureTimestamp - The departure date and time in ISO 8601 date-time format.</p>
<p>arrivalTimestamp - The arrival date and time in ISO 8601 date-time format.</p>
<p>positionInTrip - zero-indexed position of the station for this trip.</p>
<p>latitude - latitude of the station location.</p>
<p>longitude - longitude of the station location.</p>
</dd>
</dl>

## Functions

<dl>
<dt><a href="#init">init(initOptions)</a> ⇒ <code>Object</code></dt>
<dd><p>Initializes the lib. This is your entry point.</p>
</dd>
</dl>

<a name="Map"></a>

## Map
Class representing a Betterez Map. It is a wrapper around the leaflet map

**Kind**: global class  

* [Map](#Map)
    * [.addTrip(tripOptions)](#Map+addTrip) ⇒ [<code>Trip</code>](#Trip)
    * [.removeTrip()](#Map+removeTrip)

<a name="Map+addTrip"></a>

### map.addTrip(tripOptions) ⇒ [<code>Trip</code>](#Trip)
Shows the current bus position on the map for the specified trip. If trip is not started will show only the stations.

After you are done with this trip, please call [removeTrip](removeTrip) to free resources and stop listeners.

**Kind**: instance method of [<code>Map</code>](#Map)  
**Returns**: [<code>Trip</code>](#Trip) - A trip instance.  

| Param | Type | Description |
| --- | --- | --- |
| tripOptions | <code>Object</code> | The params needed to identify a trip. |
| tripOptions.routeId | <code>string</code> | Id of the route for the trip you want to show. |
| tripOptions.scheduleId | <code>string</code> | Id of the schedule for the trip you want to show. |
| tripOptions.date | <code>string</code> | Date of departure for the trip in format "YYYY-MM-DD". |
| tripOptions.productId | <code>string</code> | Product id enabled for that trip". |

<a name="Map+removeTrip"></a>

### map.removeTrip()
Removes the current trip from the map to free resources.

**Kind**: instance method of [<code>Map</code>](#Map)  
<a name="init"></a>

## init(initOptions) ⇒ <code>Object</code>
Initializes the lib. This is your entry point.

**Kind**: global function  
**Returns**: <code>Object</code> - Initialized instance of the btrz-map lib  

| Param | Type | Description |
| --- | --- | --- |
| initOptions | <code>Object</code> | Options to init the library. |
| initOptions.env | <code>string</code> | The environment to point to. Accepted values: "production", "sandbox". |
| initOptions.apiKey | <code>string</code> | The Betterez public key of your account. |

<a name="init..map"></a>

### init~map(btrzMapOptions) ⇒ [<code>Map</code>](#Map)
Builds and returns the map interface. This is a Betterez Map, not the leaflet map.

**Kind**: inner method of [<code>init</code>](#init)  
**Returns**: [<code>Map</code>](#Map) - A Betterez Map instance. It is a wrapper around the leaflet map  

| Param | Type | Description |
| --- | --- | --- |
| btrzMapOptions | <code>Object</code> | Options to build the map. |
| btrzMapOptions.containerId | <code>string</code> | Id of the HTML element that is going to contain the map. |
| btrzMapOptions.tilesProviderUrl | <code>string</code> | Url of the map tiles provider. |
| btrzMapOptions.attribution | <code>string</code> | Attribution to the map tiles provider to show on the map. Check your map tiles provider docs. |

