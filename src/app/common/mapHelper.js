import { dateInMoscow } from './dateHelper';
import randomColor from 'randomcolor';
import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch';
import 'leaflet-draw';
import _ from "lodash";
import img from '../../assets/img/diwo/marker-icon.png';


export class leaflet {
    constructor(page, tracks, events, mapTile) {
        this.page = page;
        this.tracks = tracks;
        this.events = events;
        this.mapTile = mapTile;
        this.myIcon = L.icon({
            iconUrl: img,
            iconAnchor: [11, 41]
        });
        this.googleLayer = L.tileLayer('https://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
            maxZoom: 19,
            subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
        })

        this.osmLayer = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
        })

        this.baseMaps = {
            "google": this.googleLayer,
            "osm": this.osmLayer
        };

        this.selectMarker = {};

        switch (this.page) {
            case 'helmet': {
                this.mapContainer =
                    L.map('helmet-map', { layers: [this.osmLayer, this.googleLayer] }).setView([...tracks], 16)
                break;
            }
            default: {
                this.mapContainer = L.map('helmet-map', { layers: [this.osmLayer, this.googleLayer] }).setView([tracks[0].geometry.coordinates[0][0], tracks[0].geometry.coordinates[0][1]], 16);
                break;
            }

        }

    }

    marker() {
        return this.selectMarker
    }

    clickEvent(obj) {
        this.mapContainer.eachLayer((marker) => {
            if (marker.dragging && obj.lat === marker.dragging._marker.options.title[0] && obj.lng === marker.dragging._marker.options.title[1]) {
                this.mapContainer.setView(marker.getLatLng(), 16);
                marker.openPopup();
                return false;
            }
        });
    }

    renderHelmet() {
        L.control.layers(this.baseMaps).addTo(this.mapContainer);

        L.marker([...this.tracks], { icon: this.myIcon }).addTo(this.mapContainer)

        // .bindPopup('нет сигнала, последний сигнал 7 минут назад')
    }


    renderHistory() {
        let polyline;
        let arrayPolyline = []

        L.control.layers(this.baseMaps).addTo(this.mapContainer);

        this.events.data.map((event, index) => {
            if (event.point !== null) {
                L.marker([event.point[0], event.point[1]], { icon: this.myIcon, title: [event.point[0], event.point[1]] }).addTo(this.mapContainer)
                    .bindPopup(`Координаты: ${event.point[0] + ' ' + event.point[1] + ' Событие: ' + event.type}`).on('click', (e) => {
                        this.selectMarker = e.latlng
                    });
            }
        })

        this.tracks.map((track, index) => {

            let array = [];

            track.geometry.coordinates.map((coordinate, bndex) => {
                array.push([coordinate[0], coordinate[1]]);
                arrayPolyline.push([coordinate[0], coordinate[1]]);
            })

            polyline = L.polyline(array, { color: 'red' }).addTo(this.mapContainer);
        })

        L.rectangle(arrayPolyline, { color: "#ffffff00", weight: 0 }).addTo(this.mapContainer);
        this.mapContainer.fitBounds(arrayPolyline);
    }

}


export class geoLeaflet {
    constructor(page, zones, events, mapTile) {

        this.page = page;
        this.zones = zones;
        this.events = events;
        this.drawLayers = [];
        this.mapTile = mapTile;
        this.polygons = {};

        this.myIcon = L.icon({
            iconUrl: img,
            iconAnchor: [11, 41]
        });
        this.googleLayer = L.tileLayer('https://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
            maxZoom: 19,
            subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
        })

        this.osmLayer = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
        })

        this.baseMaps = {
            "google": this.googleLayer,
            "osm": this.osmLayer
        };

        this.drawnItems = new L.FeatureGroup();

        this.selectMarker = {};


        var osmUrl = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
            osmAttrib = '&copy; <a href="http://openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            osm = L.tileLayer(osmUrl, { maxZoom: 18, attribution: osmAttrib }),
            map = new L.Map('zones-map', { center: new L.LatLng(61.52, 95.31), zoom: 3 }),
            drawnItems = L.featureGroup().addTo(map);

        this.mapContainer = map;
        //L.map('helmet-map', {layers: [this.osmLayer, this.googleLayer]}).setView([...tracks], 2) 

        osm.addTo(map);
        /*L.control.layers({
            
        }, { 'drawlayer': drawnItems }, { position: 'topleft', collapsed: false }).addTo(this.mapContainer);
*/

        const provider = new OpenStreetMapProvider();

        const searchControl = new GeoSearchControl({
            provider: provider,
            style: 'bar',
        });


        var leaf = this;

        map.addControl(searchControl);

        map.addLayer(leaf.drawnItems);
        this.drawControl = new L.Control.Draw({
            edit: {
                featureGroup: leaf.drawnItems,
                polygon: {
                    allowIntersection: false,
                }
            },
            draw: {
                polygon: {
                    allowIntersection: false,
                    showArea: true
                },
                marker: false,
                polyline: false,
                circle: false,
                rectangle: false,
                circlemarker: false,
            }
        });
       

        map.on(L.Draw.Event.CREATED, function (event) {
            var layer = event.layer;
            leaf.drawLayers.push(layer);
            leaf.drawnItems.addLayer(layer);
            leaf.drawChanged(leaf.drawnItems);
        });
        map.on(L.Draw.Event.EDITED, function (event) {
            leaf.drawChanged(leaf.drawnItems);
        });
        map.on(L.Draw.Event.DELETED, function (event) {
            leaf.drawChanged(leaf.drawnItems);
        });


    }

    setSelected(id) {
        _.forEach(_.values(this.polygons), (zone) => {
            _.forEach(zone, (p) => {
                p.setStyle({
                    color: 'green'
                });
            });

        });

        var map = this.mapContainer;
        if (id) {
            var allCoords = [];
            _.forEach(this.polygons[id], (p) => {
                p.setStyle({
                    color: 'red'
                });
                _.forEach(p, (coord) => {
                    allCoords.push(coord);
                });
            });
            if (!_.isEmpty(allCoords)) {
                map.fitBounds(allCoords);
            }
        } else {

        }
    }

    setEditable(editable) {
        var map = this.mapContainer;
        var featureGroup = this.drawnItems;
        console.log("drawnItems", this.drawnItems);
        _.forEach(this.drawnItems.getLayers(), (l) => {
            featureGroup.removeLayer(l);
            map.removeLayer(l);
        });
        editable ? this.mapContainer.addControl(this.drawControl) : this.mapContainer.removeControl(this.drawControl);
    }

    drawChanged(group) {
        var latlngs = _.map(group.getLayers(), function (l) {
            var ll = l.getLatLngs();
            return _.map(ll[0], function (latlng) {
                return [latlng.lat, latlng.lng];
            });
        });

        if (this.onDrawChanged !== undefined) {
            this.onDrawChanged(latlngs);
        }
    };


    setOnChangeCallback(callback) {
        this.onDrawChanged = callback;
    }

    setOnClickCallback(callback) {
        this.onClickCallback = callback;
    }

    marker() {
        return this.selectMarker
    }


    renderGeozones(geozones) {
        var map = this.mapContainer;
        var drawings = this.drawLayers;
        this.polygons = {};
        var obj = this;
        var allCoords = [];
        var polygons = this.polygons;
        _.forEach(this.drawLayers, (l) => {
            map.removeLayer(l);
        });
        _.forEach(geozones, function (zone) {
            _.forEach(zone.polygons, function (poly) {
                var polygon = L.polygon(poly[0], { color: 'green' });
                _.forEach(polygon, (coord) => { allCoords.push(coord); });
                polygon.addTo(map);
                polygon.on('click', () => {
                    obj.onClickCallback(zone);
                });
                if (polygons[zone.id] === undefined) {
                    polygons[zone.id] = [];
                }
                polygons[zone.id].push(polygon);
                drawings.push(polygon);
            })


        })

        if (!_.isEmpty(allCoords)) {
            map.fitBounds(allCoords);
        }

    }


}

