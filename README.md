# btrz-map
Library to display a map and live track the position of the bus for a specific trip.

This lib runs in the browser and can be
included in any site.

![map sample](./docs/images/map-sample.png)

### Prerequisites
* An account with the premium feature enabled and configured.
* The scanner app installed on an Android phone (vx.x.x or higher) to capture the location of the bus.
* A Betterez public API key.

#### External Dependencies
This lib is built on top of [leaftlet](https://leafletjs.com/) so you will need  to install 
leaflet 1.7.1 or compatible.

### Installation
#### Directly from your page
* Include Leaflet CSS file in the head section of your document:

```
<link rel="stylesheet" href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css"
  integrity="sha512-xodZBNTC5n17Xt2atTPuE1HxjVMSvLVW9ocqUKLsCC5CXdbqCmblAshOMAS6/keqq/sMZMZ19scR4PsZChSR7A=="
  crossorigin=""/>
  ```

* Include Leaflet JavaScript file after Leaflet’s CSS:

```
<!-- Make sure you put this AFTER Leaflet's CSS -->
 <script src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js"
   integrity="sha512-XQoYMqMTK8LvdxXYG3nZ448hOEQiglfqkJs1NOQV44cWnUrBc8PkAOcXy20w0vlaXaVUearIOBhiXZ5V3ynxwA=="
   crossorigin=""></script>
```

* Include btrz-map:
```
<!-- Make sure you put this AFTER Leaflet's JS -->
 TODO
```
#### Or via npm
TODO: publish

``` npm i leaflet@1.7.1 btrz-map```

### Usage
