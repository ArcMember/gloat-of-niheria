import { component$, useVisibleTask$,  } from '@builder.io/qwik';
import { locations } from "~/components/tools/map/locations2.js";

interface Map {
    extended?: boolean;
    political?: boolean;
    geographical?: boolean;
    
    locations?: boolean;
}

export default component$((props: Map) => {

    let mapUrl = "/menu/tools/maps"
    if (props.extended) 
        mapUrl += "/map-extended"
    else if (props.political) 
        mapUrl += "/map-political"
    else if (props.geographical) 
        mapUrl += "/map-geographical"
    else 
        mapUrl += "/map-geographical"  

    const scaleOptions = {
        imperial: false,
    }

    const rulerOptions = {
        circleMarker: {               // Leaflet circle marker options for points used in this plugin
            color: 'var(--fg-niheria)',
            radius: 3
          },
        lineStyle: {                  // Leaflet polyline options for lines used in this plugin
            color: 'var(--fg-niheria)',
            dashArray: '2.5'
          },
        lengthUnit: {                 // You can use custom length units. Default unit is kilometers.
            display: 'km',              // This is the display value will be shown on the screen. Example: 'meters'
            decimal: 2,                 // Distance result will be fixed to this value. 
            factor: 0.0179,               // This value will be used to convert from kilometers. Example: 1000 (from kilometers to meters)  
            label: 'Расстояние:'           
        },
        angleUnit: {
            display: '&deg;',           // This is the display value will be shown on the screen. Example: 'Gradian'
            decimal: 2,                 // Bearing result will be fixed to this value.
            factor: 1,                // This option is required to customize angle unit. Specify solid angle value for angle unit. Example: 400 (for gradian).
            label: 'Угол:'
        }
    }

    useVisibleTask$(() => {
        const regions = L.layerGroup()
        const marks = L.layerGroup()
        const bounds = [[-256, 256], [0, 0]];
        const niheriaCRS = L.CRS.Simple

        const map = L.map('map', {
            attributionControl: false,
            boxZoom: true,
            minZoom: 1,
            maxZoom: 4,
            zoom: 2,
            center: [-128, 128],
            trackResize: true,
            layers: [regions, marks],
            crs: L.CRS.Simple
        });
        L.tileLayer(mapUrl+'/{z}/{x}/{y}.jpg', {
            minNativeZoom: 1,
            maxNativeZoom: 4,
            tileSize: 128,
            bounds: bounds,
            noWrap: true,
            errorTileUrl: "/menu/loading/question.jpg",
        }).addTo(map);        

        L.control.scale(scaleOptions).addTo(map);
        L.control.ruler(rulerOptions).addTo(map);

        if (L.Browser.ielt9) {
            alert('Обновите браузер.');
        }

        if (props.locations != undefined) {
            const overlayMaps = {
                "Регионы": regions,            
            };
            const layerControl = L.control.layers(null, overlayMaps).addTo(map);
            layerControl.addOverlay(marks, "Локации");
            
            const multiplierY = 1;
            const multiplierX = 1;
            const addendumY = 0;
            const addendumX = 0;
            const radiusModifier = 1;
            for (const loc of locations) {
                if ('polygon' in loc) {                    
                    for (const pos of loc['polygon']) {
                        pos[0] *= multiplierY;
                        pos[1] *= multiplierX;
                        pos[0] += addendumY;
                        pos[1] += addendumX;
                    }
                }
                if ('blob' in loc) {
                    loc['blob'][0] *= multiplierY;
                    loc['blob'][1] *= multiplierX;
                    loc['blob'][0] += addendumY;
                    loc['blob'][1] += addendumX;
                }
                if ('coords' in loc) {
                    loc['coords'][0] *= multiplierY;
                    loc['coords'][1] *= multiplierX;
                    loc['coords'][0] += addendumY;
                    loc['coords'][1] += addendumX;
                }
            }

            for (const loc of locations) {
                if ('polygon' in loc) {
                    const polygon = L.polygon(loc['polygon'], {
                        color: loc['color'],
                        fillColor: loc['color'],
                        fillOpacity: 0.2,
                        opacity: 0.7,
                    }).addTo(map);
                    // polygon.bindPopup(`<div map-popup><b>${loc['name']}</b><br><i><a target=”_blank” href="${loc['url']}">Нажмите сюда, чтобы перейти.</a></i></div>`);
                    polygon.bindPopup(`<div map-popup><b>${loc['name']}</b></div>`);
                    regions.addLayer(polygon)                
                }
            }   
            for (const loc of locations) {
                if ('blob' in loc) {
                    const circle = L.circle(loc['blob'], {
                        color: loc['color'],
                        fillColor: loc['color'],
                        fillOpacity: 0.5,
                        radius: 3*radiusModifier
                    }).addTo(map);
                    // circle.bindPopup(`<div map-popup><b>${loc['name']}</b><br><i><a target=”_blank” href="${loc['url']}">Нажмите сюда, чтобы перейти.</a></i></div>`);
                    circle.bindPopup(`<div map-popup><b>${loc['name']}</b></div>`);
                    marks.addLayer(circle)
                }
            }
            for (const loc of locations) {
                if ('coords' in loc) {
                    const circle = L.circle(loc['coords'], {
                        color: loc['color'],
                        fillColor: loc['color'],
                        fillOpacity: 0.5,
                        radius: 1*radiusModifier
                    }).addTo(map);
                    // circle.bindPopup(`<div map-popup><b>${loc['name']}</b><br><i><a target=”_blank” href="${loc['url']}">Нажмите сюда, чтобы перейти.</a></i></div`);
                    circle.bindPopup(`<div map-popup><b>${loc['name']}</b></div`);
                    marks.addLayer(circle)
                }
            }     
            regions.setZIndex(-1)
            marks.setZIndex(1)
        }
    })

    return (
        <div class="map-container">
            <link rel="stylesheet" href="/menu/tools/maps/leaflet.css"/>
            <script src="/menu/tools/maps/leaflet-src.js"></script>
            <link rel="stylesheet" href="/menu/tools/maps/leaflet-ruler.css"/>  
            <script src="/menu/tools/maps/leaflet-ruler.js"></script>
            <div class="map" id="map"></div>
        </div>
    );
});
